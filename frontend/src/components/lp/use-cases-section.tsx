'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cases = [
  {
    title: 'デザイナー',
    description:
      'アイデアを素早くビジュアル化し、クライアントへのプレゼンテーションを強化',
    image:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1780&auto=format&fit=crop',
  },
  {
    title: 'マーケター',
    description: 'SNS投稿やWeb広告用の画像を効率的に作成・最適化',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'EC事業者',
    description: '商品画像の背景除去や一括編集で、統一感のある商品展示を実現',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  },
];

export function UseCasesSection() {
  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[980px] text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          様々な業界で活用される
          <br className="hidden sm:inline" />
          AImagineの活用事例
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          業界や規模を問わず、多くの企業様にご利用いただいています。
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
