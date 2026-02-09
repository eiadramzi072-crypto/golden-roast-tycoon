import { useCallback } from 'react';
import { useGame } from '@/contexts/GameContext';

// Audio URLs - using free sound effects
const CLICK_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAQQj9nQpXYABWq41NmpfgAAT6XR3rGFAABJotLbsYYAAE2l1NyxhQAATKTT3LGGAABMpNPcsYUAAEyk09yxhQAATKPT27GFAABMo9PbsYUAAEyi09qxhQAATKLT2rGFAABMotPasYUAAEyi09qxhQAATKLT2rGFAABMotPasYUAAEyi09qxhQAA';
const PURCHASE_SOUND = 'data:audio/wav;base64,UklGRl9vAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhO28AAHd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3';

export const useAudio = () => {
  const { soundEnabled } = useGame();

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a new audio instance for rapid clicking support
    const audio = new Audio();
    audio.src = CLICK_SOUND;
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, [soundEnabled]);

  const playPurchase = useCallback(() => {
    if (!soundEnabled) return;
    
    const audio = new Audio();
    audio.src = PURCHASE_SOUND;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, [soundEnabled]);

  return { playClick, playPurchase };
};
