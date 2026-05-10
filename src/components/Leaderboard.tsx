'use client';

import { AnimatePresence, motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ClassScore } from '@/lib/sheets';
import { LoadingScreen } from './LoadingScreen';

// ── Class name override ────────────────────────────────────────────────────

function displayName(raw: string): string {
  if (raw === 'test2') return 'The God';
  return raw;
}

// ── Animated counter ───────────────────────────────────────────────────────

function Counter({ target, delay = 0 }: { target: number; delay?: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const ctrl = animate(0, target, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return ctrl.stop;
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [target, delay]);
  return <>{value.toLocaleString()}</>;
}

// ── Mascot placeholder circle (PNG goes here later) ────────────────────────

function MascotCircle() {
  return (
    <div
      className="rounded-full border-[2.5px] border-dashed border-white/50 bg-white/15 flex items-center justify-center mb-2 drop-shadow"
      style={{ width: 72, height: 72 }}
    >
      <div className="w-9 h-9 rounded-full bg-white/20" />
    </div>
  );
}

// ── Background: falling catkins + sparkles + floating planes ──────────────

// Catkin fall items — hardcoded to avoid SSR hydration mismatch
const CATKINS_BG = [
  { x: 5,  dur: 9.5,  delay: 0.0,  src: '/catkin-green.svg', w: 34, h: 54 },
  { x: 16, dur: 11.0, delay: 2.8,  src: '/catkin-pale.svg',  w: 28, h: 44 },
  { x: 28, dur: 10.2, delay: 1.3,  src: '/catkin-green.svg', w: 38, h: 60 },
  { x: 40, dur: 12.0, delay: 4.2,  src: '/catkin-pale.svg',  w: 26, h: 42 },
  { x: 52, dur: 9.0,  delay: 0.9,  src: '/catkin-green.svg', w: 32, h: 50 },
  { x: 63, dur: 11.5, delay: 3.5,  src: '/catkin-pale.svg',  w: 30, h: 48 },
  { x: 75, dur: 10.5, delay: 1.7,  src: '/catkin-green.svg', w: 36, h: 56 },
  { x: 86, dur: 12.5, delay: 5.2,  src: '/catkin-pale.svg',  w: 24, h: 38 },
  { x: 10, dur: 10.8, delay: 6.8,  src: '/catkin-pale.svg',  w: 30, h: 48 },
  { x: 47, dur: 11.2, delay: 7.3,  src: '/catkin-green.svg', w: 28, h: 44 },
  { x: 70, dur: 9.8,  delay: 4.0,  src: '/catkin-pale.svg',  w: 34, h: 54 },
  { x: 33, dur: 12.2, delay: 5.8,  src: '/catkin-green.svg', w: 26, h: 42 },
  { x: 91, dur: 10.0, delay: 2.2,  src: '/catkin-pale.svg',  w: 32, h: 50 },
  { x: 22, dur: 11.8, delay: 8.5,  src: '/catkin-green.svg', w: 28, h: 44 },
];

// Sparkle items
const SPARKLES_BG = [
  { x: 36, y: 14, delay: 0.9 }, { x: 83, y: 67, delay: 2.1 },
  { x: 11, y: 56, delay: 1.5 }, { x: 64, y: 26, delay: 3.3 },
  { x: 48, y: 46, delay: 2.5 }, { x: 7,  y: 80, delay: 4.0 },
];

// Paper plane trajectories — hardcoded for SSR safety
const PLANES = [
  { top: '22%', keyframe: 'fly-plane-ltr', dur: 26, delay: 0  },
  { top: '58%', keyframe: 'fly-plane-rtl', dur: 30, delay: 9  },
  { top: '40%', keyframe: 'fly-plane-ltr', dur: 23, delay: 18 },
];

function PaperPlanes() {
  return (
    <>
      {PLANES.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: 0,
            animationName: `${p.keyframe}, fly-plane-op`,
            animationDuration: `${p.dur}s, ${p.dur}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
            animationTimingFunction: 'linear, linear',
            animationIterationCount: 'infinite, infinite',
            animationFillMode: 'both, both',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="rgba(45,111,165,0.75)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </>
  );
}

function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

      {/* Falling catkins — CSS animation */}
      {CATKINS_BG.map((c, i) => (
        <div
          key={i}
          className="absolute top-0"
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
          <Image src={c.src} alt="" width={c.w} height={c.h} style={{ opacity: 0.88 }} aria-hidden />
        </div>
      ))}

      {/* Sparkles */}
      {SPARKLES_BG.map((sp, i) => (
        <motion.div
          key={`sp${i}`}
          className="absolute"
          style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.1, 0.6, 0.1], rotate: [0, 45, 0] }}
          transition={{ duration: 2.8 + i * 0.4, delay: sp.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 1 L9.2 6.8 L15 8 L9.2 9.2 L8 15 L6.8 9.2 L1 8 L6.8 6.8 Z"
              fill="rgba(160,220,170,0.9)" />
          </svg>
        </motion.div>
      ))}

      {/* Floating paper planes — slow→fast→slow easing, 1-3 visible at a time */}
      <PaperPlanes />

    </div>
  );
}

// ── Podium config ──────────────────────────────────────────────────────────

const PODIUM = [
  { place: 2, label: 'No. 2', from: '#7aac6e', to: '#4e8844', height: 176, offset: 'mt-8',  riseDelay: 0.45 },
  { place: 1, label: 'No. 1', from: '#5a9d98', to: '#356e6a', height: 224, offset: 'mt-0',  riseDelay: 0.0  },
  { place: 3, label: 'No. 3', from: '#7895c8', to: '#4d68a4', height: 144, offset: 'mt-14', riseDelay: 0.9  },
];

function PodiumCard({
  place, label, from, to, height, offset, riseDelay, entry,
}: (typeof PODIUM)[number] & { entry?: ClassScore }) {
  const name = entry ? displayName(entry.className) : '—';

  return (
    <div className={`flex flex-col items-center ${offset}`}>
      {/* Mascot placeholder — replace with PNG later */}
      <MascotCircle />

      {/* Card — iOS Liquid Glass */}
      <div
        className="relative w-[88px] sm:w-[104px] rounded-2xl overflow-hidden"
        style={{
          height,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          border: '1.5px solid rgba(255,255,255,0.55)',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 30px rgba(0,0,0,0.22)',
        }}
      >
        {/* Water fill — rises from bottom, semi-transparent tint */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-2xl overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.05, delay: riseDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tinted glass fill */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(175deg, ${from}CC, ${to}99)` }} />
          {/* Water surface shimmer */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-4 blur-[3px]"
            style={{ background: 'rgba(255,255,255,0.35)' }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Inner top highlight */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent" />

          {/* Place label */}
          <span className="absolute top-2.5 left-3 text-white/60 text-[10px] font-bold tracking-widest z-10">
            {label}
          </span>
        </motion.div>

        {/* Class name fades in after fill */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: riseDelay + 0.95, duration: 0.45 }}
        >
          <span className="text-white font-black text-xl sm:text-2xl text-center leading-tight px-2 drop-shadow-md">
            {name}
          </span>
        </motion.div>
      </div>

      {/* Count */}
      <motion.p
        className="mt-3 text-[#2d6fa5] font-bold text-base sm:text-lg tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: riseDelay + 1.1 }}
      >
        {entry ? (
          <>
            <Counter target={entry.bagCount} delay={riseDelay + 1.1} />{' '}
            <span className="font-normal text-slate-400 text-sm">個</span>
          </>
        ) : '—'}
      </motion.p>
    </div>
  );
}

// ── Instagram footer ───────────────────────────────────────────────────────

function InstagramFooter() {
  return (
    <motion.div
      className="mt-10 mb-8 px-1"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href="https://www.instagram.com/sssh35_click"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="rounded-2xl p-[2px] shadow-lg"
          style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
          <div className="bg-white/90 backdrop-blur-md rounded-[14px] px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md"
              style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Instagram">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
                <circle cx="17.8" cy="6.2" r="1.3" fill="white" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-bold text-sm leading-tight">追蹤我們的 Instagram</p>
              <p className="text-gray-400 text-xs mt-0.5">加入柳絮比賽的最新動態！</p>
              <p className="text-pink-500 text-xs mt-0.5 font-semibold">@sssh35_click</p>
            </div>
            <div className="flex-shrink-0 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-sm"
              style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d)' }}>
              追蹤
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

// ── Leaderboard content ────────────────────────────────────────────────────

function LeaderboardContent({ rankings, error }: { rankings: ClassScore[]; error?: string }) {
  const top3 = PODIUM.map((cfg) => ({
    ...cfg,
    entry: rankings.find((r) => r.rank === cfg.place),
  }));
  const rest = rankings.filter((r) => r.rank > 3);

  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Soft overlay so text stays readable over the vintage texture */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />

      <FloatingBackground />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-10 sm:py-14">

        {/* Title */}
        <motion.header
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="#2d6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1
              className="text-[1.75rem] sm:text-[2.25rem] font-black text-[#2d6fa5] tracking-wide leading-none"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              柳絮班級排行榜
            </h1>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="#2d6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#7ab0cc] text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
            Class Ranking Board
          </p>
        </motion.header>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-8 text-sm text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            資料讀取失敗：{error}
          </motion.div>
        )}

        {/* Podium */}
        {rankings.length > 0 && (
          <div className="flex items-end justify-center gap-2 sm:gap-4 mb-10 sm:mb-14">
            {top3.map((cfg) => (
              <PodiumCard key={cfg.place} {...cfg} />
            ))}
          </div>
        )}

        {/* Rank list — scroll-triggered */}
        {rest.length > 0 && (
          <motion.div
            className="rounded-3xl overflow-hidden border border-white/40"
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.72), 0 8px 32px rgba(0,0,0,0.13)',
            }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {rest.map((item, idx) => (
              <motion.div
                key={item.className}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                  idx < rest.length - 1 ? 'border-b border-white/20' : ''
                } hover:bg-white/20`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: 'easeOut' }}
              >
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#ecf4fa] text-[#7aaccc] font-bold text-sm">
                  {item.rank}
                </span>
                <span className="flex-1 text-slate-700 font-semibold">{displayName(item.className)}</span>
                <span className="text-[#2d6fa5] font-bold tabular-nums text-base">
                  <Counter target={item.bagCount} delay={0.3 + idx * 0.07} />{' '}
                  <span className="font-normal text-slate-400 text-sm">個</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!error && rankings.length === 0 && (
          <p className="text-center text-slate-400 mt-20 text-sm">尚無資料</p>
        )}

        <InstagramFooter />

        <motion.p
          className="text-center text-slate-400 text-xs mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          資料每 60 秒自動更新
        </motion.p>
      </div>
    </motion.div>
  );
}

// ── Root export ────────────────────────────────────────────────────────────

export function Leaderboard({ rankings, error }: { rankings: ClassScore[]; error?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loading" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {loaded && <LeaderboardContent key="content" rankings={rankings} error={error} />}
      </AnimatePresence>
    </>
  );
}
