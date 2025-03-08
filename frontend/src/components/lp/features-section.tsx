'use client';

import { motion } from 'framer-motion';
import {
  Compass,
  Image as ImageIcon,
  Layers,
  Palette,
  Wand2,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Wand2,
    title: 'AI画像生成',
    description:
      'テキストから高品質な画像を生成。アイデアを瞬時にビジュアル化します。',
  },
  {
    icon: ImageIcon,
    title: '背景除去',
    description: 'ワンクリックで完璧な背景除去。プロ品質の結果を数秒で実現。',
  },
  {
    icon: Compass,
    title: '画像最適化',
    description:
      '品質を保ちながら、ファイルサイズを最適化。ウェブに最適な画像を。',
  },
  {
    icon: Palette,
    title: 'スタイル変換',
    description: '様々なアートスタイルに画像を変換。独創的な表現を可能に。',
  },
  {
    icon: Layers,
    title: 'バッチ処理',
    description: '複数の画像を一括処理。作業時間を大幅に削減。',
  },
  {
    icon: Zap,
    title: 'リアルタイムプレビュー',
    description: '変更をリアルタイムで確認。スムーズなワークフローを実現。',
  },
];

export function FeaturesSection() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-[980px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          プロフェッショナルな画像編集を、
          <br className="hidden sm:inline" />
          より簡単に
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          最新のAI技術を活用し、プロフェッショナルな画像編集を
          <br className="hidden sm:inline" />
          誰でも簡単に実現できます。
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg border bg-background p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-5xl">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2074&auto=format&fit=crop"
            alt="AI Image Processing Demo"
            width={1920}
            height={1080}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
