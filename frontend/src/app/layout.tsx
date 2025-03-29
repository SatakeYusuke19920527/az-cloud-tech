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
  title: 'AzPoC - Azureの技術検証とAIアプリケーション開発支援',
  description:
    'Azure専門家チームによる、確実なPoC実現とAIアプリケーション開発支援サービス。',
  openGraph: {
    title: 'AzPoC - Azureの技術検証とAIアプリケーション開発支援',
    description:
      'Azure専門家チームによる、確実なPoC実現とAIアプリケーション開発支援サービス。',
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
    <ClerkProvider afterSignOutUrl={'/'} afterSignInUrl={'/dashboard'}>
      <html lang="ja">
        <body className={`${notoSansJP.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
