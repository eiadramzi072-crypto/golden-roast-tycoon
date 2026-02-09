import { useCallback, useRef, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

// Audio URLs - using free sound effects
const CLICK_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAQQj9nQpXYABWq41NmpfgAAT6XR3rGFAABJotLbsYYAAE2l1NyxhQAATKTT3LGGAABMpNPcsYUAAEyk09yxhQAATKPT27GFAABMo9PbsYUAAEyi09qxhQAATKLT2rGFAABMotPasYUAAEyi09qxhQAATKLT2rGFAABMotPasYUAAEyi09qxhQAA';
const PURCHASE_SOUND = 'data:audio/wav;base64,UklGRl9vAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhO28AAHd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3';

export const useAudio = () => {
  const { soundEnabled, ambienceEnabled, bps } = useGame();
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const purchaseAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambienceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickAudioRef.current = new Audio(CLICK_SOUND);
    clickAudioRef.current.volume = 0.3;
    
    purchaseAudioRef.current = new Audio(PURCHASE_SOUND);
    purchaseAudioRef.current.volume = 0.4;
    
    // Create ambient audio with Web Audio API for a coffee shop atmosphere
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      audioContext.close();
    };
  }, []);

  // Adjust ambience volume based on BPS
  useEffect(() => {
    if (ambienceAudioRef.current) {
      const volume = ambienceEnabled ? Math.min(0.3 + (bps / 100) * 0.2, 0.5) : 0;
      ambienceAudioRef.current.volume = volume;
    }
  }, [bps, ambienceEnabled]);

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
