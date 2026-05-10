'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Catkin particles — hardcoded positions to avoid SSR hydration mismatch
const CATKINS = [
  { x: 8,  delay: 0.0, dur: 5.5, size: 1.1 },
  { x: 20, delay: 1.3, dur: 6.0, size: 0.75 },
  { x: 33, delay: 0.6, dur: 5.2, size: 1.0 },
  { x: 47, delay: 2.0, dur: 6.3, size: 0.85 },
  { x: 61, delay: 0.9, dur: 5.7, size: 1.2 },
  { x: 74, delay: 1.7, dur: 5.4, size: 0.9 },
  { x: 86, delay: 0.3, dur: 6.1, size: 0.8 },
  { x: 14, delay: 2.8, dur: 5.8, size: 0.95 },
  { x: 54, delay: 1.1, dur: 6.4, size: 0.7 },
  { x: 92, delay: 2.4, dur: 5.6, size: 1.05 },
];

function CatkinSVG({ size }: { size: number }) {
  const s = size;
  return (
    <svg width={16 * s} height={26 * s} viewBox="0 0 16 26" fill="none" aria-hidden>
      <ellipse cx="8" cy="9" rx="7" ry="8.5" fill="rgba(180,220,245,0.75)" />
      <ellipse cx="8" cy="9" rx="4" ry="5" fill="rgba(220,240,255,0.5)" />
      <line x1="8" y1="17" x2="8" y2="26" stroke="rgba(140,190,220,0.5)" strokeWidth="1.2" />
      <line x1="8" y1="20" x2="4.5" y2="24" stroke="rgba(140,190,220,0.35)" strokeWidth="0.9" />
      <line x1="8" y1="23" x2="11.5" y2="26" stroke="rgba(140,190,220,0.35)" strokeWidth="0.9" />
    </svg>
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background: 'linear-gradient(150deg, #f7fcff 0%, #e8f6fb 45%, #daeef8 100%)',
      }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,100,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,100,180,1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Floating catkin seeds drifting upward */}
      {CATKINS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${c.x}%` }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, i % 2 === 0 ? 18 : -18, 0],
            opacity: [0, 0.85, 0.6, 0],
            rotate: [0, i % 2 === 0 ? 15 : -12, 0],
          }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CatkinSVG size={c.size} />
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Paper plane */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20, y: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <svg width="58" height="58" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="#2d6fa5"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[#7ab0cc] text-[11px] sm:text-xs tracking-[0.35em] font-semibold mb-4 uppercase">
            Songshan Senior High School
          </p>
          <h1
            className="text-[#1a3a5c] text-[2.5rem] sm:text-5xl font-black tracking-tight leading-none mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            松山高中
          </h1>
          <h2
            className="text-[#2d6fa5] text-xl sm:text-2xl font-bold tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
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
          <div className="h-[5px] bg-[#b0d8ef]/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: [0.4, 0, 0.15, 1], delay: 0.4 }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                animate={{ x: ['-100%', '500%'] }}
                transition={{ duration: 1.3, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-[#7ab0cc]/60 text-[10px] tracking-widest mt-2.5 text-center font-semibold"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LOADING
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
