import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Info, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';

interface StartMenuProps {
  onStart: () => void;
  onSettings: () => void;
  onDeveloperInfo: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStart, onSettings, onDeveloperInfo }) => {
  const { t } = useTranslation();
  const { soundEnabled, setSoundEnabled } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-espresso/50 to-background" />
      
      {/* Decorative Coffee Beans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [null, Math.random() * -100],
              rotate: [null, Math.random() * 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            🫘
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          {/* Coffee Cup Icon */}
          <motion.div
            className="text-7xl sm:text-8xl mb-4"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ☕
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('coffeeEmpire')}
          </motion.h1>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t('tycoon')}
          </motion.h2>
          <motion.p
            className="text-sm text-primary font-medium tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('proEdition')}
          </motion.p>
        </motion.div>

        {/* Menu Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="w-full btn-primary text-lg flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-6 h-6" />
            {t('startGame')}
          </motion.button>

          <motion.button
            onClick={onSettings}
            className="w-full btn-secondary flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings className="w-5 h-5" />
            {t('settings')}
          </motion.button>

          <motion.button
            onClick={onDeveloperInfo}
            className="w-full btn-secondary flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Info className="w-5 h-5" />
            {t('developerInfo')}
          </motion.button>
        </motion.div>

        {/* Sound Toggle */}
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-4 right-4 p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors touch-target"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default StartMenu;
