'use client';

import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ClassScore } from '@/lib/sheets';

// ── Animated number counter ────────────────────────────────────────────────

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

// ── SVG mascots (no emoji) ─────────────────────────────────────────────────

function MascotStar() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden>
      {/* Star body */}
      <polygon
        points="40,4 50,30 78,30 56,48 64,76 40,60 16,76 24,48 2,30 30,30"
        fill="#F9C846" stroke="#E8A800" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Cheek blush */}
      <ellipse cx="27" cy="47" rx="6" ry="4" fill="#FFB347" opacity="0.4" />
      <ellipse cx="53" cy="47" rx="6" ry="4" fill="#FFB347" opacity="0.4" />
      {/* Eyes */}
      <ellipse cx="31" cy="39" rx="4" ry="4.5" fill="#3D2B00" />
      <ellipse cx="49" cy="39" rx="4" ry="4.5" fill="#3D2B00" />
      <circle cx="32.5" cy="37.5" r="1.5" fill="#fff" />
      <circle cx="50.5" cy="37.5" r="1.5" fill="#fff" />
      {/* Smile */}
      <path d="M31 50 Q40 58 49 50" stroke="#3D2B00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MascotBunny() {
  return (
    <svg viewBox="0 0 80 90" width="72" height="78" aria-hidden>
      {/* Ears */}
      <ellipse cx="24" cy="22" rx="10" ry="18" fill="#6aada8" />
      <ellipse cx="56" cy="22" rx="10" ry="18" fill="#6aada8" />
      <ellipse cx="24" cy="23" rx="5.5" ry="12" fill="#9dd4cf" opacity="0.6" />
      <ellipse cx="56" cy="23" rx="5.5" ry="12" fill="#9dd4cf" opacity="0.6" />
      {/* Head */}
      <circle cx="40" cy="60" r="28" fill="#6aada8" />
      {/* Cheeks */}
      <ellipse cx="25" cy="65" rx="7" ry="5" fill="#5a9990" opacity="0.5" />
      <ellipse cx="55" cy="65" rx="7" ry="5" fill="#5a9990" opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="31" cy="56" rx="5" ry="5.5" fill="#fff" />
      <ellipse cx="49" cy="56" rx="5" ry="5.5" fill="#fff" />
      <circle cx="32" cy="57" r="3" fill="#1a3a3a" />
      <circle cx="50" cy="57" r="3" fill="#1a3a3a" />
      <circle cx="33" cy="56" r="1.2" fill="#fff" />
      <circle cx="51" cy="56" r="1.2" fill="#fff" />
      {/* Nose */}
      <ellipse cx="40" cy="66" rx="3" ry="2" fill="#4a8880" />
      {/* Smile */}
      <path d="M30 72 Q40 80 50 72" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MascotOnigiri() {
  return (
    <svg viewBox="0 0 80 88" width="68" height="74" aria-hidden>
      {/* Body */}
      <path d="M14 84 Q10 28 40 6 Q70 28 66 84 Z" fill="#F4F4F2" stroke="#D8D8D5" strokeWidth="1.5" />
      {/* Shadow on body */}
      <path d="M14 84 Q10 55 18 36 Q22 50 20 84 Z" fill="#E8E8E5" opacity="0.5" />
      {/* Seaweed strip */}
      <path d="M18 68 Q40 61 62 68 L62 83 Q40 77 18 83 Z" fill="#2C2C2A" />
      <path d="M20 69 Q40 64 60 69" stroke="#3a3a38" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Cheeks */}
      <ellipse cx="24" cy="52" rx="6" ry="4" fill="#FFCBA4" opacity="0.5" />
      <ellipse cx="56" cy="52" rx="6" ry="4" fill="#FFCBA4" opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="30" cy="46" rx="4.5" ry="5" fill="#2C2C2A" />
      <ellipse cx="50" cy="46" rx="4.5" ry="5" fill="#2C2C2A" />
      <circle cx="31.5" cy="44.5" r="1.5" fill="#fff" />
      <circle cx="51.5" cy="44.5" r="1.5" fill="#fff" />
      {/* Smile */}
      <path d="M30 58 Q40 65 50 58" stroke="#2C2C2A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Floating background decoration ────────────────────────────────────────

const BG_ITEMS = [
  { x: 4,  y: 8,  delay: 0,   scale: 1.0,  type: 'note',  char: '♪' },
  { x: 88, y: 12, delay: 1.3, scale: 0.8,  type: 'note',  char: '♫' },
  { x: 12, y: 40, delay: 0.7, scale: 0.7,  type: 'note',  char: '♩' },
  { x: 82, y: 50, delay: 2.1, scale: 1.1,  type: 'note',  char: '♬' },
  { x: 5,  y: 68, delay: 1.6, scale: 0.9,  type: 'note',  char: '♪' },
  { x: 90, y: 75, delay: 0.4, scale: 0.75, type: 'note',  char: '♩' },
  { x: 45, y: 3,  delay: 2.8, scale: 0.6,  type: 'note',  char: '♫' },
  { x: 70, y: 28, delay: 1.9, scale: 1.0,  type: 'plane' },
  { x: 8,  y: 22, delay: 3.1, scale: 0.8,  type: 'plane' },
  { x: 55, y: 85, delay: 2.4, scale: 0.65, type: 'dot' },
  { x: 25, y: 80, delay: 1.1, scale: 0.55, type: 'dot' },
  { x: 75, y: 60, delay: 3.5, scale: 0.45, type: 'dot' },
];

function PaperPlane({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="rgba(90,160,210,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {BG_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{
            duration: 3.5 + item.delay * 0.5,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.type === 'note' && (
            <span
              className="text-blue-300/70 font-light select-none"
              style={{ fontSize: `${20 * item.scale}px` }}
            >
              {item.char}
            </span>
          )}
          {item.type === 'plane' && <PaperPlane size={Math.round(28 * item.scale)} />}
          {item.type === 'dot' && (
            <div
              className="rounded-full bg-sky-200/50 border border-sky-300/40"
              style={{ width: `${14 * item.scale}px`, height: `${14 * item.scale}px` }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── Podium config ──────────────────────────────────────────────────────────

const PODIUM = [
  {
    place: 2,
    label: 'No. 2',
    from: '#7aac6e',
    to: '#5a8c50',
    height: 'h-44',
    offset: 'mt-8',
    mascot: <MascotBunny />,
    animDelay: 0.35,
  },
  {
    place: 1,
    label: 'No. 1',
    from: '#5a9d98',
    to: '#3d7a75',
    height: 'h-56',
    offset: 'mt-0',
    mascot: <MascotStar />,
    animDelay: 0.1,
  },
  {
    place: 3,
    label: 'No. 3',
    from: '#7895c8',
    to: '#5672a8',
    height: 'h-36',
    offset: 'mt-14',
    mascot: <MascotOnigiri />,
    animDelay: 0.6,
  },
];

// ── Main Leaderboard component ─────────────────────────────────────────────

export function Leaderboard({ rankings, error }: { rankings: ClassScore[]; error?: string }) {
  const top3 = PODIUM.map((cfg) => ({
    ...cfg,
    entry: rankings.find((r) => r.rank === cfg.place),
  }));
  const rest = rankings.filter((r) => r.rank > 3);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#cee8f5] via-[#e4f2f8] to-[#eef3f8] overflow-x-hidden">
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
            {/* Paper plane SVG icon */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="#2d6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1 className="text-[1.85rem] sm:text-4xl font-black text-[#2d6fa5] tracking-tight leading-none">
              柳絮班級排行榜
            </h1>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="#2d6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#7ab0cc] text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
            Class Ranking Board
          </p>
        </motion.header>

        {/* Error */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-8 text-sm text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            資料讀取失敗：{error}
          </motion.div>
        )}

        {/* Podium – order: 2nd / 1st / 3rd */}
        {rankings.length > 0 && (
          <div className="flex items-end justify-center gap-2 sm:gap-4 mb-10 sm:mb-14">
            {top3.map(({ place, label, from, to, height, offset, mascot, animDelay, entry }) => (
              <motion.div
                key={place}
                className={`flex flex-col items-center ${offset}`}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Floating mascot */}
                <motion.div
                  className="mb-2 drop-shadow-md"
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: animDelay + 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {mascot}
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`relative ${height} w-[88px] sm:w-[104px] rounded-2xl flex flex-col items-center justify-center shadow-xl overflow-hidden cursor-default`}
                  style={{
                    background: `linear-gradient(170deg, ${from}, ${to})`,
                  }}
                  whileHover={{ scale: 1.05, y: -6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
                  {/* Ruled lines texture */}
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(255,255,255,0.1) 15px,rgba(255,255,255,0.1) 16px)',
                    }}
                  />
                  {/* Scattered note dots */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[{ x: '15%', y: '15%' }, { x: '75%', y: '25%' }, { x: '20%', y: '70%' }, { x: '70%', y: '80%' }].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-5 rounded-sm bg-white/10"
                        style={{ left: pos.x, top: pos.y, transform: `rotate(${i % 2 ? 8 : -8}deg)` }}
                      />
                    ))}
                  </div>

                  <span className="absolute top-2.5 left-3 text-white/60 text-[10px] font-bold tracking-widest z-10">
                    {label}
                  </span>
                  <span className="relative z-10 text-white font-black text-xl sm:text-2xl text-center leading-tight px-2 drop-shadow-md">
                    {entry?.className ?? '—'}
                  </span>
                </motion.div>

                {/* Count */}
                <motion.p
                  className="mt-3 text-[#2d6fa5] font-bold text-sm tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: animDelay + 0.5 }}
                >
                  {entry ? (
                    <>
                      <Counter target={entry.bagCount} delay={animDelay + 0.6} />{' '}
                      <span className="font-normal text-slate-400">個</span>
                    </>
                  ) : '—'}
                </motion.p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Rank list */}
        {rest.length > 0 && (
          <motion.div
            className="bg-white/65 backdrop-blur-lg rounded-3xl shadow-md overflow-hidden border border-white/60"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {rest.map((item, idx) => (
              <motion.div
                key={item.className}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                  idx < rest.length - 1 ? 'border-b border-slate-100/80' : ''
                } hover:bg-sky-50/60`}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.9 + idx * 0.07, ease: 'easeOut' }}
              >
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#ecf4fa] text-[#7aaccc] font-bold text-sm">
                  {item.rank}
                </span>
                <span className="flex-1 text-slate-700 font-semibold">{item.className}</span>
                <span className="text-[#2d6fa5] font-bold tabular-nums text-sm">
                  <Counter target={item.bagCount} delay={1.0 + idx * 0.07} />{' '}
                  <span className="font-normal text-slate-400">個</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!error && rankings.length === 0 && (
          <p className="text-center text-slate-400 mt-20 text-sm">尚無資料</p>
        )}

        <motion.p
          className="text-center text-slate-300 text-xs mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          資料每 60 秒自動更新
        </motion.p>
      </div>
    </div>
  );
}
