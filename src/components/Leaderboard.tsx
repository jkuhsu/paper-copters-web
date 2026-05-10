'use client';

import { AnimatePresence, motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
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

// ── SVG mascots ────────────────────────────────────────────────────────────

function MascotStar() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden>
      <polygon points="40,4 50,30 78,30 56,48 64,76 40,60 16,76 24,48 2,30 30,30"
        fill="#F9C846" stroke="#E8A800" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="27" cy="47" rx="6" ry="4" fill="#FFB347" opacity="0.4" />
      <ellipse cx="53" cy="47" rx="6" ry="4" fill="#FFB347" opacity="0.4" />
      <ellipse cx="31" cy="39" rx="4" ry="4.5" fill="#3D2B00" />
      <ellipse cx="49" cy="39" rx="4" ry="4.5" fill="#3D2B00" />
      <circle cx="32.5" cy="37.5" r="1.5" fill="#fff" />
      <circle cx="50.5" cy="37.5" r="1.5" fill="#fff" />
      <path d="M31 50 Q40 58 49 50" stroke="#3D2B00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MascotBunny() {
  return (
    <svg viewBox="0 0 80 90" width="72" height="78" aria-hidden>
      <ellipse cx="24" cy="22" rx="10" ry="18" fill="#6aada8" />
      <ellipse cx="56" cy="22" rx="10" ry="18" fill="#6aada8" />
      <ellipse cx="24" cy="23" rx="5.5" ry="12" fill="#9dd4cf" opacity="0.6" />
      <ellipse cx="56" cy="23" rx="5.5" ry="12" fill="#9dd4cf" opacity="0.6" />
      <circle cx="40" cy="60" r="28" fill="#6aada8" />
      <ellipse cx="25" cy="65" rx="7" ry="5" fill="#5a9990" opacity="0.5" />
      <ellipse cx="55" cy="65" rx="7" ry="5" fill="#5a9990" opacity="0.5" />
      <ellipse cx="31" cy="56" rx="5" ry="5.5" fill="#fff" />
      <ellipse cx="49" cy="56" rx="5" ry="5.5" fill="#fff" />
      <circle cx="32" cy="57" r="3" fill="#1a3a3a" />
      <circle cx="50" cy="57" r="3" fill="#1a3a3a" />
      <circle cx="33" cy="56" r="1.2" fill="#fff" />
      <circle cx="51" cy="56" r="1.2" fill="#fff" />
      <ellipse cx="40" cy="66" rx="3" ry="2" fill="#4a8880" />
      <path d="M30 72 Q40 80 50 72" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MascotOnigiri() {
  return (
    <svg viewBox="0 0 80 88" width="68" height="74" aria-hidden>
      <path d="M14 84 Q10 28 40 6 Q70 28 66 84 Z" fill="#F4F4F2" stroke="#D8D8D5" strokeWidth="1.5" />
      <path d="M14 84 Q10 55 18 36 Q22 50 20 84 Z" fill="#E8E8E5" opacity="0.5" />
      <path d="M18 68 Q40 61 62 68 L62 83 Q40 77 18 83 Z" fill="#2C2C2A" />
      <ellipse cx="24" cy="52" rx="6" ry="4" fill="#FFCBA4" opacity="0.5" />
      <ellipse cx="56" cy="52" rx="6" ry="4" fill="#FFCBA4" opacity="0.5" />
      <ellipse cx="30" cy="46" rx="4.5" ry="5" fill="#2C2C2A" />
      <ellipse cx="50" cy="46" rx="4.5" ry="5" fill="#2C2C2A" />
      <circle cx="31.5" cy="44.5" r="1.5" fill="#fff" />
      <circle cx="51.5" cy="44.5" r="1.5" fill="#fff" />
      <path d="M30 58 Q40 65 50 58" stroke="#2C2C2A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Rich background: catkins, wind, leaves, sparkles, notes, planes ────────

function CatkinBg({ size }: { size: number }) {
  return (
    <svg width={15 * size} height={24 * size} viewBox="0 0 15 24" fill="none" aria-hidden>
      <ellipse cx="7.5" cy="8" rx="6.5" ry="8" fill="rgba(200,235,255,0.65)" />
      <ellipse cx="7.5" cy="8" rx="3.5" ry="4.5" fill="rgba(230,248,255,0.45)" />
      <line x1="7.5" y1="16" x2="7.5" y2="24" stroke="rgba(150,200,230,0.45)" strokeWidth="1.1" />
      <line x1="7.5" y1="19" x2="4.5" y2="23" stroke="rgba(150,200,230,0.3)" strokeWidth="0.8" />
      <line x1="7.5" y1="22" x2="10.5" y2="24" stroke="rgba(150,200,230,0.3)" strokeWidth="0.8" />
    </svg>
  );
}

function WindLine({ width, opacity }: { width: number; opacity: number }) {
  return (
    <svg width={width} height={16} viewBox={`0 0 ${width} 16`} fill="none" aria-hidden>
      <path
        d={`M4 8 Q${width * 0.3} 2 ${width * 0.55} 8 Q${width * 0.8} 14 ${width - 4} 8`}
        stroke={`rgba(140,195,225,${opacity})`}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WillowLeaf({ size, rotate }: { size: number; rotate: number }) {
  return (
    <svg width={7 * size} height={22 * size} viewBox="0 0 7 22" fill="none"
      style={{ transform: `rotate(${rotate}deg)` }} aria-hidden>
      <ellipse cx="3.5" cy="11" rx="3" ry="10.5" fill="rgba(130,185,140,0.45)" />
      <line x1="3.5" y1="1" x2="3.5" y2="21" stroke="rgba(100,160,110,0.3)" strokeWidth="0.8" />
    </svg>
  );
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={16 * size} height={16 * size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1 L9.2 6.8 L15 8 L9.2 9.2 L8 15 L6.8 9.2 L1 8 L6.8 6.8 Z"
        fill="rgba(180,225,250,0.8)" />
    </svg>
  );
}

// Hardcoded layout to avoid SSR mismatch
const BG_CATKINS = [
  { x: 6,  y: 6,  delay: 0.0, s: 1.0 }, { x: 24, y: 3,  delay: 1.5, s: 0.75 },
  { x: 58, y: 7,  delay: 0.8, s: 1.1 }, { x: 80, y: 5,  delay: 2.3, s: 0.85 },
  { x: 14, y: 38, delay: 2.0, s: 0.9 }, { x: 89, y: 33, delay: 0.5, s: 0.8 },
  { x: 44, y: 62, delay: 2.9, s: 1.05 },{ x: 70, y: 58, delay: 1.7, s: 0.7 },
  { x: 3,  y: 55, delay: 3.4, s: 0.95 },{ x: 95, y: 70, delay: 1.2, s: 0.75 },
];
const BG_WINDS = [
  { x: 2,  y: 18, delay: 0.6, w: 68, op: 0.35 },
  { x: 62, y: 44, delay: 2.0, w: 54, op: 0.28 },
  { x: 72, y: 14, delay: 3.2, w: 60, op: 0.32 },
  { x: 1,  y: 72, delay: 1.4, w: 72, op: 0.25 },
  { x: 50, y: 28, delay: 2.7, w: 50, op: 0.3  },
];
const BG_LEAVES = [
  { x: 91, y: 22, delay: 1.1, s: 1.0, r: -20 },
  { x: 2,  y: 48, delay: 2.6, s: 0.9, r: 15  },
  { x: 52, y: 80, delay: 0.7, s: 0.85,r: -8  },
  { x: 72, y: 82, delay: 3.6, s: 1.0, r: 25  },
  { x: 18, y: 16, delay: 1.9, s: 0.8, r: -15 },
  { x: 38, y: 90, delay: 3.0, s: 0.9, r: 10  },
];
const BG_SPARKLES = [
  { x: 36, y: 14, delay: 0.9, s: 1.0 }, { x: 83, y: 67, delay: 2.1, s: 0.8 },
  { x: 11, y: 56, delay: 1.5, s: 0.9 }, { x: 64, y: 26, delay: 3.3, s: 0.75 },
  { x: 48, y: 46, delay: 2.5, s: 0.7 },
];
const BG_NOTES = [
  { x: 4,  y: 8,  delay: 0,   s: 1.0,  char: '♪' },
  { x: 88, y: 12, delay: 1.3, s: 0.8,  char: '♫' },
  { x: 12, y: 40, delay: 0.7, s: 0.7,  char: '♩' },
  { x: 82, y: 50, delay: 2.1, s: 1.1,  char: '♬' },
  { x: 90, y: 78, delay: 0.4, s: 0.75, char: '♩' },
  { x: 45, y: 3,  delay: 2.8, s: 0.6,  char: '♫' },
];

function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Catkins — gentle side drift */}
      {BG_CATKINS.map((c, i) => (
        <motion.div key={`ck${i}`} className="absolute"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          animate={{ y: [0, -12, 0], x: [0, i % 2 ? 8 : -8, 0], rotate: [0, i % 2 ? 10 : -10, 0] }}
          transition={{ duration: 5 + i * 0.3, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <CatkinBg size={c.s} />
        </motion.div>
      ))}

      {/* Wind lines — sweep across then fade */}
      {BG_WINDS.map((w, i) => (
        <motion.div key={`wl${i}`} className="absolute"
          style={{ left: `${w.x}%`, top: `${w.y}%` }}
          animate={{ x: [0, 18, 0], opacity: [0, w.op, 0] }}
          transition={{ duration: 3.5 + i * 0.4, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <WindLine width={w.w} opacity={w.op} />
        </motion.div>
      ))}

      {/* Willow leaves — sway */}
      {BG_LEAVES.map((l, i) => (
        <motion.div key={`lf${i}`} className="absolute"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
          animate={{ rotate: [l.r - 8, l.r + 8, l.r - 8], y: [0, -6, 0] }}
          transition={{ duration: 4 + i * 0.35, delay: l.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <WillowLeaf size={l.s} rotate={l.r} />
        </motion.div>
      ))}

      {/* Sparkles — pulse */}
      {BG_SPARKLES.map((sp, i) => (
        <motion.div key={`sp${i}`} className="absolute"
          style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
          animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.2, 0.8, 0.2], rotate: [0, 45, 0] }}
          transition={{ duration: 2.8 + i * 0.4, delay: sp.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <Sparkle size={sp.s} />
        </motion.div>
      ))}

      {/* Music notes — float */}
      {BG_NOTES.map((n, i) => (
        <motion.div key={`nt${i}`} className="absolute"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3.5 + i * 0.5, delay: n.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="text-blue-300/70 font-light select-none" style={{ fontSize: `${20 * n.s}px` }}>
            {n.char}
          </span>
        </motion.div>
      ))}

      {/* Paper planes */}
      {[{ x: 70, y: 27, delay: 1.9 }, { x: 8, y: 22, delay: 3.1 }].map((p, i) => (
        <motion.div key={`pp${i}`} className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -12, 0], x: [0, i % 2 ? 6 : -6, 0] }}
          transition={{ duration: 4.5 + i * 0.5, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="rgba(90,160,210,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ── Podium water-fill animation ────────────────────────────────────────────
// Order in render: [2nd, 1st, 3rd]  |  Rise order: No.1 → No.2 → No.3

const PODIUM = [
  { place: 2, label: 'No. 2', from: '#7aac6e', to: '#4e8844', height: 176, offset: 'mt-8',  mascot: <MascotBunny />,   riseDelay: 0.45 },
  { place: 1, label: 'No. 1', from: '#5a9d98', to: '#356e6a', height: 224, offset: 'mt-0',  mascot: <MascotStar />,    riseDelay: 0.0  },
  { place: 3, label: 'No. 3', from: '#7895c8', to: '#4d68a4', height: 144, offset: 'mt-14', mascot: <MascotOnigiri />, riseDelay: 0.9  },
];

function PodiumCard({
  place, label, from, to, height, offset, mascot, riseDelay, entry,
}: (typeof PODIUM)[number] & { entry?: ClassScore }) {
  const name = entry ? displayName(entry.className) : '—';

  return (
    <div className={`flex flex-col items-center ${offset}`}>
      {/* Floating mascot */}
      <motion.div
        className="mb-2 drop-shadow-md"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.4, delay: riseDelay + 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {mascot}
      </motion.div>

      {/* Card */}
      <div
        className="relative w-[88px] sm:w-[104px] rounded-2xl overflow-hidden shadow-lg"
        style={{ height }}
      >
        {/* Ghost container (visible before fill) */}
        <div className="absolute inset-0 rounded-2xl bg-slate-200/25" />

        {/* Water fill — rises from bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-2xl overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.05, delay: riseDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Base color */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(175deg, ${from}, ${to})` }} />
          {/* Water-surface shimmer at the top edge */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-4 blur-[3px]"
            style={{ background: 'rgba(255,255,255,0.28)' }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/22 to-transparent" />
          {/* Ruled-line texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(255,255,255,0.08) 15px,rgba(255,255,255,0.09) 16px)',
          }} />
          {/* Paper-note decorations */}
          {[{ l: '14%', t: '14%', r: -8 }, { l: '70%', t: '22%', r: 7 }, { l: '18%', t: '68%', r: 5 }, { l: '66%', t: '74%', r: -6 }].map((d, i) => (
            <div key={i} className="absolute w-4 h-5 rounded-sm bg-white/10"
              style={{ left: d.l, top: d.t, transform: `rotate(${d.r}deg)` }} />
          ))}

          {/* Place label — appears once fill reaches the top area */}
          <span className="absolute top-2.5 left-3 text-white/65 text-[10px] font-bold tracking-widest z-10">
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
      className="relative min-h-screen bg-gradient-to-b from-[#cee8f5] via-[#e4f2f8] to-[#eef3f8] overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

        {/* Podium — No.1 fills first, then No.2, then No.3 */}
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
            className="bg-white/65 backdrop-blur-lg rounded-3xl shadow-md overflow-hidden border border-white/60"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {rest.map((item, idx) => (
              <motion.div
                key={item.className}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                  idx < rest.length - 1 ? 'border-b border-slate-100/80' : ''
                } hover:bg-sky-50/60`}
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
          className="text-center text-slate-300 text-xs mb-4"
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
