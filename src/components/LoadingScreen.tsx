'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

// Hardcoded catkin positions — avoids SSR hydration mismatch
const CATKINS = [
  { x: 8,  delay: 0.0, dur: 8.5 }, { x: 20, delay: 1.4, dur: 10.0 },
  { x: 34, delay: 0.7, dur: 9.2 }, { x: 48, delay: 2.2, dur: 8.8 },
  { x: 62, delay: 1.0, dur: 9.6 }, { x: 75, delay: 1.8, dur: 8.3 },
  { x: 88, delay: 0.4, dur: 10.2 },{ x: 14, delay: 3.1, dur: 9.0 },
  { x: 55, delay: 4.5, dur: 8.7 }, { x: 93, delay: 2.7, dur: 9.4 },
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
        background: 'linear-gradient(150deg, #f4fbf4 0%, #e8f6eb 40%, #daf0e0 100%)',
      }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(60,140,80,1) 1px,transparent 1px),linear-gradient(90deg,rgba(60,140,80,1) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Falling catkins (white/pale-green) */}
      {CATKINS.map((c, i) => (
        <div
          key={i}
          className="absolute top-0 pointer-events-none"
          style={{
            left: `${c.x}%`,
            animationName: 'fall-leaf',
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          <Image
            src="/catkin-white.svg"
            alt=""
            width={i % 3 === 0 ? 36 : i % 3 === 1 ? 28 : 32}
            height={i % 3 === 0 ? 56 : i % 3 === 1 ? 44 : 50}
            style={{ opacity: 0.75 }}
            aria-hidden
          />
        </div>
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Catkin icon (replaces paper plane) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Image src="/catkin-green.svg" alt="柳絮" width={64} height={100} style={{ opacity: 0.85 }} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[#5a9a6a]/70 text-[11px] sm:text-xs tracking-[0.35em] font-semibold mb-4 uppercase">
            Songshan Senior High School
          </p>
          <h1
            className="text-[#1a4a2a] text-[2.5rem] sm:text-5xl font-black tracking-tight leading-none mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            松山高中
          </h1>
          <h2
            className="text-[#2d7a4a] text-xl sm:text-2xl font-bold tracking-wide"
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
          <div className="h-[5px] bg-green-200/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #4ade80, #22c55e)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: [0.4, 0, 0.15, 1], delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                animate={{ x: ['-100%', '500%'] }}
                transition={{ duration: 1.3, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-[#5a9a6a]/50 text-[10px] tracking-widest mt-2.5 text-center font-semibold"
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
