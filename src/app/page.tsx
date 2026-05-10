import { getClassRankings, ClassScore } from '@/lib/sheets';

export const revalidate = 60;

// ── Podium config for top-3 ───────────────────────────────────────────────

const PODIUM_CONFIG = [
  {
    place: 2,
    label: 'No.2',
    bg: 'bg-[#9dc484]',
    heightClass: 'h-44',
    character: '🎷',
    offsetY: 'mt-10',
  },
  {
    place: 1,
    label: 'No.1',
    bg: 'bg-[#6aada8]',
    heightClass: 'h-56',
    character: '🐰',
    offsetY: 'mt-0',
  },
  {
    place: 3,
    label: 'No.3',
    bg: 'bg-[#97afd4]',
    heightClass: 'h-36',
    character: '🍙',
    offsetY: 'mt-16',
  },
];

function PodiumCard({
  config,
  entry,
}: {
  config: (typeof PODIUM_CONFIG)[number];
  entry?: ClassScore;
}) {
  return (
    <div className={`flex flex-col items-center ${config.offsetY}`}>
      <div className="mb-1 text-4xl select-none">{config.character}</div>
      <div
        className={`relative ${config.heightClass} w-28 sm:w-32 ${config.bg} rounded-2xl flex flex-col items-center justify-center shadow-md`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,0.15) 18px,rgba(255,255,255,0.15) 19px)',
        }}
      >
        <span className="absolute top-2 left-3 text-white/80 text-xs font-bold tracking-wide">
          {config.label}
        </span>
        <span className="text-white font-bold text-lg sm:text-xl text-center leading-tight px-2 drop-shadow">
          {entry ? entry.className : '—'}
        </span>
      </div>
      <p className="mt-3 text-[#4a7a9b] font-semibold text-sm">
        {entry ? `${entry.bagCount} 袋` : '—'}
      </p>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <span className="absolute top-8 left-6 text-blue-200/60 text-3xl rotate-[-15deg]">♪</span>
      <span className="absolute top-20 right-10 text-blue-200/50 text-2xl rotate-[10deg]">♫</span>
      <span className="absolute top-4 right-[33%] text-sky-200/50 text-xl rotate-[5deg]">♩</span>
      <span className="absolute bottom-[33%] left-4 text-blue-200/40 text-4xl rotate-[-20deg]">♬</span>
      <span className="absolute bottom-[25%] right-6 text-sky-200/50 text-2xl rotate-[15deg]">♪</span>
      <span className="absolute top-14 left-[25%] text-slate-300/50 text-2xl rotate-[20deg]">✈</span>
      {['top-10 left-[50%] rotate-12', 'top-28 left-8 -rotate-6', 'top-36 right-8 rotate-3'].map(
        (pos, i) => (
          <div key={i} className={`absolute ${pos} w-5 h-6 bg-white/40 rounded-sm shadow-sm`} />
        )
      )}
    </div>
  );
}

export default async function Home() {
  let rankings: ClassScore[] = [];
  let error = '';

  try {
    rankings = await getClassRankings();
  } catch (e) {
    error = e instanceof Error ? e.message : '無法讀取資料';
  }

  const top3 = PODIUM_CONFIG.map((cfg) => ({
    config: cfg,
    entry: rankings.find((r) => r.rank === cfg.place),
  }));

  const rest = rankings.filter((r) => r.rank > 3);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-slate-100 overflow-x-hidden">
      <BackgroundDecor />
      <div className="relative z-10 max-w-md mx-auto px-4 py-8">
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-[#2d6fa5] mb-8 flex items-center justify-center gap-2">
          <span>✈️</span>
          <span>柳絮班級排行榜</span>
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm text-center">
            資料讀取失敗：{error}
          </div>
        )}

        {rankings.length > 0 && (
          <div className="flex items-end justify-center gap-3 mb-10">
            {top3.map(({ config, entry }) => (
              <PodiumCard key={config.place} config={config} entry={entry} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm overflow-hidden">
            {rest.map((item, idx) => (
              <div
                key={item.className}
                className={`flex items-center px-5 py-4 ${
                  idx < rest.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="w-10 text-gray-400 font-medium text-sm">{item.rank}.</span>
                <span className="flex-1 text-gray-700 font-medium">{item.className}</span>
                <span className="text-[#2d6fa5] font-bold text-sm">
                  {item.bagCount}{' '}
                  <span className="font-normal text-gray-400">袋</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {!error && rankings.length === 0 && (
          <p className="text-center text-gray-400 mt-16">尚無資料</p>
        )}

        <p className="text-center text-gray-300 text-xs mt-8">資料每 60 秒自動更新</p>
      </div>
    </main>
  );
}
