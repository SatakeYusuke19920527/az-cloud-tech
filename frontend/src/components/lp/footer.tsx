'use client';

import { cn } from '@/lib/utils';
import { Wand2 } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: '機能', href: '#features' },
    { name: '料金プラン', href: '#pricing' },
    { name: '活用事例', href: '#cases' },
    { name: 'アップデート情報', href: '#' },
  ],
  support: [
    { name: 'ヘルプセンター', href: '#' },
    { name: 'API ドキュメント', href: '#' },
    { name: 'ステータス', href: '#' },
    { name: 'お問い合わせ', href: '#' },
  ],
  company: [
    { name: '運営会社', href: '#' },
    { name: 'プライバシーポリシー', href: '#' },
    { name: '利用規約', href: '#' },
    { name: '特定商取引法に基づく表記', href: '#' },
  ],
};

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Wand2 className="h-6 w-6" />
              <span className="font-bold">AImagine</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AIの力で、あなたのクリエイティブワークを次のレベルへ。
            </p>
          </div>
          <div>
            <h3 className="font-semibold">製品</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">サポート</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">会社情報</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AImagine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
