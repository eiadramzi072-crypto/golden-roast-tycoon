export interface Upgrade {
  id: string;
  nameKey: string;
  descKey: string;
  basePrice: number;
  baseBps: number; // Beans per second
  icon: string;
}

export const UPGRADES: Upgrade[] = [
  {
    id: 'barista',
    nameKey: 'barista',
    descKey: 'baristaDesc',
    basePrice: 15,
    baseBps: 0.1,
    icon: '👨‍🍳',
  },
  {
    id: 'coffeeMachine',
    nameKey: 'coffeeMachine',
    descKey: 'coffeeMachineDesc',
    basePrice: 100,
    baseBps: 1,
    icon: '☕',
  },
  {
    id: 'roaster',
    nameKey: 'roaster',
    descKey: 'roasterDesc',
    basePrice: 1100,
    baseBps: 8,
    icon: '🔥',
  },
  {
    id: 'cafe',
    nameKey: 'cafe',
    descKey: 'cafeDesc',
    basePrice: 12000,
    baseBps: 47,
    icon: '🏪',
  },
  {
    id: 'factory',
    nameKey: 'factory',
    descKey: 'factoryDesc',
    basePrice: 130000,
    baseBps: 260,
    icon: '🏭',
  },
];

export const PRICE_MULTIPLIER = 1.15;

export const calculateUpgradePrice = (basePrice: number, level: number): number => {
  return Math.floor(basePrice * Math.pow(PRICE_MULTIPLIER, level));
};

export const calculateTotalBps = (upgradeLevels: Record<string, number>): number => {
  return UPGRADES.reduce((total, upgrade) => {
    const level = upgradeLevels[upgrade.id] || 0;
    return total + upgrade.baseBps * level;
  }, 0);
};

export const formatNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return Math.floor(num).toString();
};

export const formatBps = (bps: number): string => {
  if (bps >= 1e12) return (bps / 1e12).toFixed(2) + 'T';
  if (bps >= 1e9) return (bps / 1e9).toFixed(2) + 'B';
  if (bps >= 1e6) return (bps / 1e6).toFixed(2) + 'M';
  if (bps >= 1e3) return (bps / 1e3).toFixed(2) + 'K';
  return bps.toFixed(1);
};
