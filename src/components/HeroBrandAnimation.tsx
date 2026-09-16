import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const HeroBrandAnimation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-2xl mx-auto h-24 sm:h-32 md:h-44 lg:h-52 flex items-center justify-center overflow-visible">
      {/* Background radial energy field */}
      <div 
        className="absolute inset-0 bg-radial from-[#FF4500]/15 via-transparent to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <svg
        viewBox="0 0 600 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroGradientG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FF8C00" />
            <stop offset="85%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>

          <linearGradient id="heroTrailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#FF8C00" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF4500" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </linearGradient>

          <filter id="heroGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient grid coordinates subtle guidelines */}
        <line x1="40" y1="120" x2="560" y2="120" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="180" y1="30" x2="180" y2="210" stroke="#181818" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="380" y1="30" x2="380" y2="210" stroke="#181818" strokeWidth="1" strokeDasharray="4 8" />

        {/* Background signal ripples */}
        {!shouldReduceMotion ? (
          <>
            <motion.circle
              cx="180"
              cy="120"
              r="60"
              stroke="#FF4500"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0.1 }}
              animate={{ scale: [0.8, 1.4, 1.8], opacity: [0.35, 0.15, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeOut" }}
            />
            <motion.circle
              cx="180"
              cy="120"
              r="75"
              stroke="#FF8C00"
              strokeWidth="0.75"
              initial={{ scale: 0.9, opacity: 0.1 }}
              animate={{ scale: [0.9, 1.5, 2.1], opacity: [0.25, 0.1, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 1, ease: "easeOut" }}
            />
          </>
        ) : (
          <circle cx="180" cy="120" r="70" stroke="#FF4500" strokeWidth="1" opacity="0.2" />
        )}

        {/* G Stylized Contour */}
        <motion.path
          d="M 235 75 C 205 45, 145 45, 115 75 C 80 110, 80 160, 115 195 C 150 230, 215 230, 250 195 C 270 175, 275 145, 270 120 L 180 120"
          stroke="url(#heroGradientG)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#heroGlow)"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Energy Wave Trail (Estela de energía) expanding from G */}
        <motion.path
          d="M 180 120 C 230 80, 270 160, 330 120 C 390 80, 440 160, 500 120 C 535 95, 565 130, 595 120"
          stroke="url(#heroTrailGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#heroGlow)"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.4, 0.9, 0.7] }}
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : {
                  pathLength: { duration: 2, delay: 0.4, ease: "easeOut" },
                  opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                }
          }
        />

        {/* Secondary subtle resonant harmonic wave */}
        <motion.path
          d="M 180 120 C 230 160, 270 80, 330 120 C 390 160, 440 80, 500 120 C 530 145, 560 110, 580 120"
          stroke="#FF8C00"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="4 6"
          initial={shouldReduceMotion ? { opacity: 0.3 } : { opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* Glowing node at the inflection hub */}
        <circle cx="180" cy="120" r="7" fill="#FFFFFF" filter="url(#heroGlow)" />
        <circle cx="180" cy="120" r="14" stroke="#FF8C00" strokeWidth="2" opacity="0.8" />

        {/* Moving energy particle along the wave */}
        {!shouldReduceMotion && (
          <motion.circle
            r="4.5"
            fill="#FFFFFF"
            filter="url(#heroGlow)"
            animate={{
              cx: [180, 260, 330, 415, 500, 580],
              cy: [120, 140, 120, 100, 120, 120],
              opacity: [0, 1, 1, 1, 0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          />
        )}
      </svg>
    </div>
  );
};
