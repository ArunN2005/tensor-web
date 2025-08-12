'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TensorPreloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--background))]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern animate-pulse"></div>
        </div>

        {/* Main loader container */}
        <div className="relative flex flex-col items-center">
          {/* Neural network animation */}
          <div className="relative w-32 h-32 mb-8">
            {/* Central node */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-[hsl(var(--electric-cyan))] rounded-full shadow-glow"
              style={{ transform: 'translate(-50%, -50%)' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Orbiting nodes */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-[hsl(var(--digital-purple))] rounded-full shadow-glow"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '50% -60px',
                }}
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }
                }}
              />
            ))}

            {/* Connection lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-t from-[hsl(var(--electric-cyan))] to-transparent"
                style={{
                  transformOrigin: '50% 0%',
                  transform: `translate(-50%, 0) rotate(${i * 60}deg)`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Logo and branding */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-10 h-10 bg-[hsl(var(--electric-cyan))] rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-[hsl(var(--background))] font-bold text-lg">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: 'var(--font-unbounded)' }}>
                Tensor Club
              </span>
              <span className="text-[hsl(var(--electric-cyan))] text-xs font-light" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                Build the future
              </span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-[hsla(var(--border),0.3)] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--digital-purple))] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <motion.div
            className="text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-[hsl(var(--muted-foreground))] text-sm mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Initializing AI Neural Network
            </p>
            <p className="text-[hsl(var(--electric-cyan))] text-xs" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {Math.round(progress)}% Complete
            </p>
          </motion.div>

          {/* Floating particles */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[hsl(var(--electric-cyan))] rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Loading status indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[hsl(var(--electric-cyan))] rounded-full animate-pulse"></div>
              <span>Loading Resources</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[hsl(var(--digital-purple))] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span>Initializing Components</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[hsl(var(--magenta))] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span>Connecting Neural Network</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TensorPreloader;
