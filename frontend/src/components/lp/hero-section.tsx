'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="container relative pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          AIの力で、あなたの<span className="text-primary">クリエイティブ</span>
          を
          <br className="hidden sm:inline" />
          次のレベルへ
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          画像生成、背景除去、最適化まで。プロフェッショナルな画像編集ツールを、
          AIの力であなたのワークフローへ。
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2">
            無料で始める
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            デモを見る
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-16 relative"
      >
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
            alt="AI Image Generation Demo"
            width={1920}
            height={1080}
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
