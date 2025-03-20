'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          Azureで実現する<span className="text-primary">次世代</span>の
          <br className="hidden sm:inline" />
          アプリケーション開発
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Azure専門家チームが、あなたのビジネスに最適なAIソリューションを提案。
          確実なPoCで、プロジェクトの成功をサポートします。
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2">
            <Link href="/dashboard">
              Dashboardへ移動
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-16 grid max-w-5xl gap-8 grid-cols-1 md:grid-cols-2"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg md:col-span-2">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Data Center Technology"
            width={1920}
            height={1080}
            className="object-cover h-full w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
