import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: '柳絮班級排行榜',
  description: '柳絮紙飛機回收活動班級積分排行榜',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${notoSansTC.className}`}>{children}</body>
    </html>
  );
}
