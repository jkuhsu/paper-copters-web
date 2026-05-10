import type { Metadata } from 'next';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
});

const notoSerif = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: '柳絮班級排行榜',
  description: '松山高中班級柳絮比賽積分排行榜',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${notoSans.className}`}>{children}</body>
    </html>
  );
}
