'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cases = [
  {
    title: '製造業',
    description: 'Azure IoT HubとAIを活用した予知保全システムの構築',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: '金融業',
    description: 'Azure OpenAIを活用した次世代チャットボットの開発',
    image:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: '小売業',
    description: 'Azure Cognitive Servicesによる商品レコメンドエンジンの実装',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
  },
];

export function UseCasesSection() {
  return (
    <section className="mx-auto container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[980px] text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          業界を問わず活用される
          <br className="hidden sm:inline" />
          Azure PoCの実績
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          多様な業界で、革新的なAzureソリューションを提供しています。
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
