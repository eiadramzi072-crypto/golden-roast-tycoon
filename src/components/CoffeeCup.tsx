import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';

interface Particle {
  id: number;
  x: number;
  y: number;
}

const CoffeeCup: React.FC = () => {
  const { addBeans } = useGame();
  const { playClick } = useAudio();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setParticles(prev => [...prev, newParticle]);
    addBeans(1);
    playClick();

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  }, [addBeans, playClick]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow Effect */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-radial from-primary/20 to-transparent blur-xl" />
      
      {/* Steam Effect */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-8 bg-gradient-to-t from-transparent via-coffee-cream/20 to-transparent rounded-full coffee-steam"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      {/* Coffee Cup Button */}
      <motion.button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 touch-target select-none cursor-pointer pulse-glow"
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isPressed ? 0.95 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* Cup SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          {/* Saucer */}
          <ellipse
            cx="50"
            cy="85"
            rx="40"
            ry="8"
            fill="url(#saucerGradient)"
          />
          
          {/* Cup Body */}
          <path
            d="M20 35 Q20 75 50 80 Q80 75 80 35 L80 30 L20 30 Z"
            fill="url(#cupGradient)"
          />
          
          {/* Coffee */}
          <ellipse
            cx="50"
            cy="32"
            rx="28"
            ry="6"
            fill="#3E2723"
          />
          <ellipse
            cx="50"
            cy="32"
            rx="26"
            ry="5"
            fill="url(#coffeeGradient)"
          />
          
          {/* Cup Handle */}
          <path
            d="M80 40 Q95 40 95 55 Q95 70 80 70"
            stroke="url(#cupGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Highlight */}
          <path
            d="M30 35 Q30 55 35 65"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          <defs>
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6CA" />
              <stop offset="50%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#BC8F5D" />
            </linearGradient>
            <linearGradient id="saucerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BC8F5D" />
              <stop offset="50%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#BC8F5D" />
            </linearGradient>
            <radialGradient id="coffeeGradient">
              <stop offset="0%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#3E2723" />
            </radialGradient>
          </defs>
        </svg>
      </motion.button>

      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -80, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="floating-particle text-xl font-bold"
            style={{
              left: particle.x,
              top: particle.y,
              position: 'absolute',
            }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CoffeeCup;
