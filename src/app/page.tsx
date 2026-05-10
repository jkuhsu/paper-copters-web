import { getClassRankings } from '@/lib/sheets';
import { Leaderboard } from '@/components/Leaderboard';

export const revalidate = 60;

export default async function Home() {
  let rankings = [];
  let error = '';

  try {
    rankings = await getClassRankings();
  } catch (e) {
    error = e instanceof Error ? e.message : '無法讀取資料';
  }

  return <Leaderboard rankings={rankings} error={error || undefined} />;
}
