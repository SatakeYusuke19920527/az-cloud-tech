'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { pocCards } from '@/lib/config';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PoCDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const poc = pocCards.find(
    (card) => card.link === `/dashboard/poc-showcase/${slug}`
  );

  if (!poc || !poc.content) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard/poc-showcase"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to PoC Showcase
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">PoC not found</h1>
            <p className="text-muted-foreground">
              The requested PoC could not be found or is still under
              development.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard/poc-showcase"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to PoC Showcase
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={poc.image}
              alt={poc.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {poc.title}
              </h1>
              <p className="text-lg text-gray-200">{poc.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">概要</h2>
              <p className="text-muted-foreground">{poc.content.overview}</p>
            </Card>

            {poc.content.architecture && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">アーキテクチャ</h2>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={poc.content.architecture}
                    alt="Architecture diagram"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">実装ステップ</h2>
              <ol className="list-decimal list-inside space-y-2">
                {poc.content.implementation.map((step, index) => (
                  <li key={index} className="text-muted-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">使用技術</h2>
                <ul className="space-y-2">
                  {poc.content.technologies.map((tech, index) => (
                    <li key={index} className="text-muted-foreground">
                      • {tech}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">メリット</h2>
                <ul className="space-y-2">
                  {poc.content.benefits.map((benefit, index) => (
                    <li key={index} className="text-muted-foreground">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">考慮事項</h2>
              <ul className="space-y-2">
                {poc.content.considerations.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </motion.div>
        {/* <form action={formAction}>
          <input name="priceId" value={poc.priceId} type="hidden" />
          
        </form> */}
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <Button
              className="w-full mt-8"
              variant={'default'}
              size={'lg'}
              type="submit"
              role="link"
            >
              {poc.title}を購入する
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}
