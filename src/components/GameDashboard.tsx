import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';
import CoffeeCup from './CoffeeCup';
import BeanCounter from './BeanCounter';
import UpgradeShop from './UpgradeShop';
import WealthChart from './WealthChart';

interface GameDashboardProps {
  onBack: () => void;
  onSettings: () => void;
}

const GameDashboard: React.FC<GameDashboardProps> = ({ onBack, onSettings }) => {
  const { t, isRtl } = useTranslation();
  const { soundEnabled, setSoundEnabled } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col p-4 safe-bottom"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ArrowLeft className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
        
        <BeanCounter />
        
        <div className="flex gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onSettings}
            className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Left: Coffee Cup */}
        <div className="flex-1 flex items-center justify-center py-4 lg:py-0">
          <CoffeeCup />
        </div>

        {/* Right: Shop & Chart */}
        <div className="w-full lg:w-80 flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-[200px] lg:min-h-0">
            <UpgradeShop />
          </div>
          <div className="h-40 lg:h-48">
            <WealthChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDashboard;
