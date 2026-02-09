import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Coffee, Heart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface DeveloperInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperInfoModal: React.FC<DeveloperInfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const handleContact = () => {
    window.location.href = 'mailto:p8489028@gmail.com?subject=Coffee%20Tycoon%20Support';
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
                {t('developerInfo')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Developer Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-coffee-amber flex items-center justify-center mb-4 shadow-lg">
                  <Coffee className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {t('developer')}
                </h3>
              </div>

              {/* Bio */}
              <div className="game-card">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  {t('bio')}
                </p>
              </div>

              {/* Contact Button */}
              <button
                onClick={handleContact}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {t('contactDeveloper')}
              </button>

              {/* Made With */}
              <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                {t('madeWith')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeveloperInfoModal;
