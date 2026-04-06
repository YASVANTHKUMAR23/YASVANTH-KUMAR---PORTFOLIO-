'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const [phase, setPhase] = useState<'intro' | 'navbar'>('intro');

  useEffect(() => {
    // Trigger the transition to navbar after 4.5 seconds
    const timer = setTimeout(() => {
      setPhase('navbar');
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Background container variants
  const backgroundVariants = {
    intro: {
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
      borderRadius: "0px",
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
    },
    navbar: {
      top: "16px",
      left: "24px",
      width: "80px",
      height: "80px",
      borderRadius: "20px",
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  // Content wrapper variants
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    intro: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] as const,
      }
    },
    navbar: {
      opacity: 1,
      scale: 0.2,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({ 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.2, ease: "easeInOut" as const, delay: custom * 0.4 + 0.5 },
        opacity: { duration: 0.2, delay: custom * 0.4 + 0.5 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 2, rotate: -15, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: -5,
      y: 0,
      transition: { 
        type: "spring" as const, 
        damping: 12, 
        stiffness: 100,
        delay: 2.8
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: 3.5
      }
    }
  };

  return (
    <motion.div 
      className="fixed z-50 flex items-center justify-center overflow-hidden bg-[#120822] origin-top-left"
      variants={backgroundVariants}
      initial="intro"
      animate={phase}
    >
      {/* Subtle background glow inside the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b1a6b] to-transparent opacity-30 mix-blend-overlay" />

      <motion.div 
        className="relative w-[400px] h-[400px] flex items-center justify-center shrink-0"
        variants={contentVariants}
        initial="hidden"
        animate={phase}
      >
        <motion.div variants={floatVariants} animate="animate" className="absolute inset-0 flex items-center justify-center">
          {/* SVG Container */}
          <div className="absolute inset-0 flex items-center justify-center pb-16">
            <svg viewBox="0 0 200 200" className="w-72 h-72 overflow-visible drop-shadow-lg">
              <defs>
                <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9a8d4" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {/* Circle */}
              <motion.circle 
                cx="100" cy="90" r="75" 
                fill="none" 
                stroke="url(#ai-grad)" 
                strokeWidth="5" 
                custom={0}
                variants={drawVariants}
                initial="hidden"
                animate="visible"
                style={{ rotate: -90, originX: "100px", originY: "90px" }}
              />

              {/* A left leg */}
              <motion.path 
                d="M 65 150 L 95 25" 
                fill="none" 
                stroke="url(#ai-grad)" 
                strokeWidth="14" 
                strokeLinecap="round" 
                custom={1}
                variants={drawVariants}
                initial="hidden"
                animate="visible"
              />

              {/* A right leg */}
              <motion.path 
                d="M 95 25 L 135 145" 
                fill="none" 
                stroke="url(#ai-grad)" 
                strokeWidth="14" 
                strokeLinecap="round" 
                custom={2}
                variants={drawVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Crossbar & i stem */}
              <motion.path 
                d="M 20 115 Q 90 90 145 70 L 140 135" 
                fill="none" 
                stroke="url(#ai-grad)" 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                custom={3}
                variants={drawVariants}
                initial="hidden"
                animate="visible"
              />

              {/* i dot */}
              <motion.circle 
                cx="150" cy="40" r="8" 
                fill="url(#ai-grad)" 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", damping: 10 }}
              />
            </svg>
          </div>

          {/* DEVELOPER Text */}
          <motion.div 
            className="absolute bottom-20 w-full text-center z-10"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <span 
              className="font-display text-[2.75rem] tracking-wider text-white block whitespace-nowrap"
              style={{
                textShadow: '3px 3px 0px rgba(0,0,0,0.8), -1px -1px 0px rgba(255,255,255,0.2)',
                transform: 'rotate(-5deg)',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
              }}
            >
              DEVELOPER
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
