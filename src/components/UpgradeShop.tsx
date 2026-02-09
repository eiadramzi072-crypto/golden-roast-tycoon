import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useAudio } from '@/hooks/useAudio';
import { UPGRADES } from '@/lib/gameData';
import { formatNumber } from '@/lib/gameData';

const UpgradeShop: React.FC = () => {
  const { upgradeLevels, canAfford, buyUpgrade, getUpgradePrice } = useGame();
  const { t } = useTranslation();
  const { playPurchase } = useAudio();

  const handleBuy = (upgradeId: string) => {
    if (buyUpgrade(upgradeId)) {
      playPurchase();
    }
  };

  return (
    <div className="game-card h-full overflow-hidden flex flex-col">
      <h2 className="text-lg font-display font-semibold text-primary mb-4">
        {t('shop')}
      </h2>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-primary/20">
        {UPGRADES.map((upgrade, index) => {
          const level = upgradeLevels[upgrade.id] || 0;
          const price = getUpgradePrice(upgrade.id);
          const affordable = canAfford(upgrade.id);

          return (
            <motion.button
              key={upgrade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleBuy(upgrade.id)}
              disabled={!affordable}
              className={`upgrade-card w-full text-start touch-target ${
                !affordable ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{upgrade.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {t(upgrade.nameKey as any)}
                    </h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      x{level}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {t(upgrade.descKey as any)}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      +{upgrade.baseBps} {t('perSecond')}
                    </span>
                    <span className={`text-sm font-semibold ${
                      affordable ? 'text-primary' : 'text-destructive'
                    }`}>
                      🫘 {formatNumber(price)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;
