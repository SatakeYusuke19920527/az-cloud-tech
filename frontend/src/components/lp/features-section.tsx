'use client';

import { motion } from 'framer-motion';
import { Brain, Code, Database, Gauge, Shield, Users } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Brain,
    title: 'AI開発',
    description:
      'Azure Cognitive ServicesやOpenAIを活用した、最新のAIソリューション開発',
  },
  {
    icon: Code,
    title: 'アプリケーション開発',
    description:
      'Azure PaaSを活用した、スケーラブルで高性能なアプリケーション開発',
  },
  {
    icon: Gauge,
    title: 'パフォーマンス最適化',
    description:
      'Azure Monitor & Insightsによる、パフォーマンスの可視化と最適化',
  },
  {
    icon: Database,
    title: 'データ基盤構築',
    description: 'Azure Synapse Analyticsを用いた、次世代のデータ基盤構築',
  },
  {
    icon: Shield,
    title: 'セキュリティ対策',
    description: 'Azure Security Centerによる、包括的なセキュリティ管理の実現',
  },
  {
    icon: Users,
    title: '専門家チーム',
    description: 'Azure認定資格保有者による、確実なプロジェクト推進',
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
          Azure専門家による、
          <br className="hidden sm:inline" />
          確実なPoC実現
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          最新のAzureテクノロジーと豊富な実績を持つ専門家チームが、
          <br className="hidden sm:inline" />
          あなたのプロジェクトを成功へと導きます。
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
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            alt="Azure Development Team"
            width={1920}
            height={1080}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
