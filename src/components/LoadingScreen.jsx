import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket } from 'lucide-react';

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 500);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-b from-[#05060A] via-[#0B0B0F] to-[#0B0F1A]"
        >
          {/* Space Background effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Floating Rocket Container */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center mb-8"
            >
              <div className="relative">
                <Rocket size={64} className="text-dark-primary -rotate-45" />
                
                {/* Flickering Flame */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      height: [20, 35, 20],
                      scaleX: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 0.15, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-2.5 bg-gradient-to-t from-transparent via-orange-500 to-dark-primary rounded-full blur-[1px]"
                  />
                  <div className="w-6 h-6 -mt-4 bg-dark-primary/20 blur-xl rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-80 flex flex-col items-center">
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/10">
                <motion.div 
                  className="h-full bg-dark-primary shadow-[0_0_15px_rgba(212,255,0,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.2em] font-bold text-dark-text-secondary">
                <span>Engines Warming</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
