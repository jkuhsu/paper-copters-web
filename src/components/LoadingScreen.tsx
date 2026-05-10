'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Hardcoded to avoid SSR hydration mismatch
const PARTICLES = [
  { x: 8,  size: 8,  delay: 0.0, dur: 4.2 },
  { x: 22, size: 5,  delay: 0.9, dur: 3.8 },
  { x: 37, size: 10, delay: 0.3, dur: 4.6 },
  { x: 51, size: 6,  delay: 1.4, dur: 3.5 },
  { x: 65, size: 9,  delay: 0.6, dur: 4.1 },
  { x: 79, size: 7,  delay: 1.8, dur: 3.9 },
  { x: 14, size: 6,  delay: 2.1, dur: 4.4 },
  { x: 44, size: 8,  delay: 0.4, dur: 3.7 },
  { x: 58, size: 5,  delay: 2.6, dur: 4.0 },
  { x: 88, size: 9,  delay: 1.1, dur: 3.6 },
  { x: 30, size: 7,  delay: 2.9, dur: 4.3 },
  { x: 74, size: 6,  delay: 0.7, dur: 4.5 },
  { x: 93, size: 8,  delay: 1.6, dur: 3.8 },
  { x: 3,  size: 5,  delay: 3.2, dur: 4.2 },
  { x: 68, size: 10, delay: 2.3, dur: 3.5 },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background: 'linear-gradient(155deg, #061e36 0%, #0e3a63 40%, #0a2d52 70%, #071c34 100%)',
      }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Falling pollen / catkin particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-0 rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(180,225,255,0.6) 0%, rgba(100,180,240,0.2) 100%)',
          }}
          animate={{ y: ['0vh', '108vh'], opacity: [0, 0.8, 0.5, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Subtle grid lines in background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Paper plane icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="#7dd3fc"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* School & competition name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-sky-400/60 text-[11px] sm:text-xs tracking-[0.35em] font-semibold mb-4 uppercase">
            Songshan Senior High School
          </p>
          <h1 className="text-white text-[2.6rem] sm:text-5xl font-black tracking-tight leading-none mb-2 drop-shadow-lg">
            松山高中
          </h1>
          <h2 className="text-sky-200/90 text-xl sm:text-2xl font-bold tracking-wide">
            班級柳絮比賽
          </h2>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-52 sm:w-72"
        >
          <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: [0.4, 0, 0.15, 1], delay: 0.4 }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 1.4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-sky-400/40 text-[10px] tracking-widest mt-2.5 text-center font-medium"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            LOADING
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
