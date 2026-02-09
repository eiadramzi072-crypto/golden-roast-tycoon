import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '@/lib/translations';
import { calculateUpgradePrice, calculateTotalBps, UPGRADES } from '@/lib/gameData';

interface GameState {
  beans: number;
  totalBeans: number;
  upgradeLevels: Record<string, number>;
  language: Language;
  soundEnabled: boolean;
  beanHistory: { time: number; beans: number }[];
}

interface GameContextType extends GameState {
  bps: number;
  addBeans: (amount: number) => void;
  buyUpgrade: (upgradeId: string) => boolean;
  setLanguage: (lang: Language) => void;
  setSoundEnabled: (enabled: boolean) => void;
  canAfford: (upgradeId: string) => boolean;
  getUpgradePrice: (upgradeId: string) => number;
}

const defaultState: GameState = {
  beans: 0,
  totalBeans: 0,
  upgradeLevels: {},
  language: 'en',
  soundEnabled: true,
  beanHistory: [],
};

const SAVE_KEY = 'coffee-empire-save';
const SAVE_INTERVAL = 5000;
const TICK_INTERVAL = 100;
const HISTORY_MAX_LENGTH = 60;

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed, beanHistory: [] };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const bps = calculateTotalBps(state.upgradeLevels);

  // Auto-save every 5 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const { beanHistory, ...saveState } = stateRef.current;
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveState));
    }, SAVE_INTERVAL);

    return () => clearInterval(saveInterval);
  }, []);

  // Game tick - update beans every 100ms
  useEffect(() => {
    const tickInterval = setInterval(() => {
      const currentBps = calculateTotalBps(stateRef.current.upgradeLevels);
      if (currentBps > 0) {
        const beansToAdd = currentBps * (TICK_INTERVAL / 1000);
        setState(prev => ({
          ...prev,
          beans: prev.beans + beansToAdd,
          totalBeans: prev.totalBeans + beansToAdd,
        }));
      }
    }, TICK_INTERVAL);

    return () => clearInterval(tickInterval);
  }, []);

  // Update bean history every second
  useEffect(() => {
    const historyInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        beanHistory: [
          ...prev.beanHistory.slice(-HISTORY_MAX_LENGTH + 1),
          { time: Date.now(), beans: prev.totalBeans },
        ],
      }));
    }, 1000);

    return () => clearInterval(historyInterval);
  }, []);

  const addBeans = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      beans: prev.beans + amount,
      totalBeans: prev.totalBeans + amount,
    }));
  }, []);

  const getUpgradePrice = useCallback((upgradeId: string): number => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) return Infinity;
    const level = state.upgradeLevels[upgradeId] || 0;
    return calculateUpgradePrice(upgrade.basePrice, level);
  }, [state.upgradeLevels]);

  const canAfford = useCallback((upgradeId: string): boolean => {
    return state.beans >= getUpgradePrice(upgradeId);
  }, [state.beans, getUpgradePrice]);

  const buyUpgrade = useCallback((upgradeId: string): boolean => {
    const price = getUpgradePrice(upgradeId);
    if (stateRef.current.beans < price) return false;

    setState(prev => ({
      ...prev,
      beans: prev.beans - price,
      upgradeLevels: {
        ...prev.upgradeLevels,
        [upgradeId]: (prev.upgradeLevels[upgradeId] || 0) + 1,
      },
    }));
    return true;
  }, [getUpgradePrice]);

  const setLanguage = useCallback((lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, soundEnabled: enabled }));
  }, []);


  // Set initial direction
  useEffect(() => {
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
  }, [state.language]);

  const value: GameContextType = {
    ...state,
    bps,
    addBeans,
    buyUpgrade,
    setLanguage,
    setSoundEnabled,
    canAfford,
    getUpgradePrice,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
