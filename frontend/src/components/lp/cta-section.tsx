'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[980px] rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12 lg:p-16"
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          PoC部
          <br className="hidden sm:inline" />
          次のステージへ
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Azure専門家との無料相談で、最適なソリューションをご提案します。
        </p>
        <Button size="lg" variant="secondary" className="mt-10 gap-2">
          無料相談を予約
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
