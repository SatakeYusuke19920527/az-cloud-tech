import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Azure PoC - エンタープライズAI開発支援サービス',
  description:
    'Azure専門家チームによる、確実なPoC実現とAIアプリケーション開発支援サービス。製造、金融、小売など、様々な業界で実績があります。',
  openGraph: {
    title: 'Azure PoC - エンタープライズAI開発支援サービス',
    description:
      'Azure専門家チームによる、確実なPoC実現とAIアプリケーション開発支援サービス。製造、金融、小売など、様々な業界で実績があります。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/dashboard'}>
      <html lang="ja">
        <body className={`${notoSansJP.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
