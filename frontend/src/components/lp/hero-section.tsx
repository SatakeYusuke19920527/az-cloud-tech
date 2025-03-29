'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="mx-auto container relative pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          PoC部
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Proof of Concept Department
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard" className="cursor-pointer">
            <Button size="lg" className="gap-2">
              <div>Dashboardへ移動</div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
