import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, soundEnabled, setSoundEnabled } = useGame();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // UI only - would connect to backend
    console.log('Sign up with:', email);
    setEmail('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-content"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-primary">
                {t('settings')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Language Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Globe className="w-4 h-4" />
                  {t('language')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all touch-target ${
                      language === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-muted'
                    }`}
                  >
                    {t('english')}
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`flex-1 py-3 rounded-xl font-medium font-arabic transition-all touch-target ${
                      language === 'ar'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-muted'
                    }`}
                  >
                    {t('arabic')}
                  </button>
                </div>
              </div>

              {/* Sound FX Toggle */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  {t('soundFx')}
                </label>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    soundEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: soundEnabled ? 26 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Email Registration */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground">
                  {t('registerEmail')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  dir="ltr"
                />
                <button
                  onClick={handleSignUp}
                  className="w-full btn-primary"
                >
                  {t('signUp')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
