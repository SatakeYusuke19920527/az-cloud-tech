'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'フリー',
    price: '¥0',
    description: '個人での利用に最適',
    features: [
      '月100枚までの画像生成',
      '基本的な背景除去',
      '標準画質での出力',
      '基本的なサポート',
    ],
  },
  {
    name: 'プロ',
    price: '¥2,980',
    description: 'プロフェッショナルな制作に',
    features: [
      '月1000枚までの画像生成',
      '高度な背景除去',
      'HD画質での出力',
      '優先サポート',
      'バッチ処理機能',
      'カスタムプリセット',
    ],
  },
  {
    name: 'ビジネス',
    price: '¥9,800',
    description: 'チームでの利用に最適',
    features: [
      '無制限の画像生成',
      'プロ仕様の背景除去',
      '4K画質での出力',
      '24時間サポート',
      'API利用可能',
      'カスタマイズ可能なワークフロー',
      'チーム管理機能',
    ],
  },
];

export function PricingSection() {
  return (
    <section className="container py-16 md:py-24" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[980px] text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          シンプルな料金プラン
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          必要な機能に応じて、最適なプランをお選びいただけます。
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex flex-col overflow-hidden rounded-lg border bg-background p-8"
          >
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/月</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <ul className="mt-8 flex-1 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="ml-3 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8">
              {plan.name === 'フリー' ? '無料で始める' : '申し込む'}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
