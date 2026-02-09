import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider } from '@/contexts/GameContext';
import StartMenu from '@/components/StartMenu';
import GameDashboard from '@/components/GameDashboard';
import SettingsModal from '@/components/SettingsModal';
import DeveloperInfoModal from '@/components/DeveloperInfoModal';

type Screen = 'menu' | 'game';

const GameContent: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [devInfoOpen, setDevInfoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === 'menu' ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <StartMenu
              onStart={() => setScreen('game')}
              onSettings={() => setSettingsOpen(true)}
              onDeveloperInfo={() => setDevInfoOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <GameDashboard
              onBack={() => setScreen('menu')}
              onSettings={() => setSettingsOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <DeveloperInfoModal isOpen={devInfoOpen} onClose={() => setDevInfoOpen(false)} />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
