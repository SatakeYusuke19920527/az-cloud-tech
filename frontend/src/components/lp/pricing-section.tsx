'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'スモール',
    price: '¥2,000,000',
    description: '小規模なPoCに最適',
    features: [
      '2週間のPoC期間',
      'Azure基本機能の検証',
      '基本的な実装サポート',
      '週次進捗報告',
      '結果報告書の提供',
    ],
  },
  {
    name: 'スタンダード',
    price: '¥5,000,000',
    description: '一般的なPoCプロジェクトに',
    features: [
      '1ヶ月のPoC期間',
      'Azure高度な機能の検証',
      '詳細な技術サポート',
      '週2回の進捗報告',
      'カスタマイズ可能な検証項目',
      '詳細な分析レポート',
    ],
  },
  {
    name: 'エンタープライズ',
    price: '応相談',
    description: '大規模プロジェクトに',
    features: [
      '期間はプロジェクトに応じて設定',
      'Azure全機能の検証対応',
      '24時間技術サポート',
      '日次進捗報告',
      'カスタム開発対応',
      '包括的な分析レポート',
      '本番環境への移行支援',
    ],
  },
];

export function PricingSection() {
  return (
    <section className="mx-auto container py-16 md:py-24" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[980px] text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          プロジェクトに合わせた
          <br className="hidden sm:inline" />
          柔軟なプラン
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          規模や要件に応じて、最適なPoCプランをご提案します。
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
                {plan.price !== '応相談' && (
                  <span className="text-muted-foreground">/プロジェクト</span>
                )}
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
            <Button className="mt-8">お問い合わせ</Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
