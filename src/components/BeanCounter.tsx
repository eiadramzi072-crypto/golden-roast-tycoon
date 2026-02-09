import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';
import { formatNumber, formatBps } from '@/lib/gameData';

const BeanCounter: React.FC = () => {
  const { beans, bps } = useGame();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-3xl">🫘</span>
        <motion.span
          key={Math.floor(beans)}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-3xl sm:text-4xl font-display font-bold text-gradient"
        >
          {formatNumber(beans)}
        </motion.span>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="text-primary font-semibold">{formatBps(bps)}</span>{' '}
        {t('beans')} {t('beansPerSecond')}
      </p>
    </motion.div>
  );
};

export default BeanCounter;
