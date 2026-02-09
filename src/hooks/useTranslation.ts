import { useGame } from '@/contexts/GameContext';
import { translations, TranslationKey } from '@/lib/translations';

export const useTranslation = () => {
  const { language } = useGame();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const isRtl = language === 'ar';

  return { t, language, isRtl };
};
