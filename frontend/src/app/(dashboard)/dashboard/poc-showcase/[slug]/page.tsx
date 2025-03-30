'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PoCCard } from '@/types/types';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const pocCards: PoCCard[] = [
  {
    title: 'Azure AI SearchへDeepDive',
    description:
      '最新のAzure AI Search機能を詳しく解説し、実践的な使用方法を紹介します。',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/azure-ai-search',
    priceId: 'price_1R89iLEGC7ceON3zFXsGXevl',
    content: {
      overview:
        'Azure AI Searchは、高度な検索機能を提供するマネージドサービスです。フルテキスト検索、ファセット検索、フィルタリング、ソートなどの機能を簡単に実装できます。',
      architecture:
        'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1600&h=900&q=80',
      implementation: [
        'Azure AI Searchインスタンスの作成と設定',
        'インデックススキーマの定義とデータのインデックス化',
        '検索APIの実装とクエリの最適化',
        'セマンティック検索機能の統合',
      ],
      technologies: [
        'Azure AI Search',
        'Azure Cognitive Services',
        'Azure OpenAI Service',
        'Azure Functions',
      ],
      benefits: [
        '高度な検索機能の迅速な実装',
        'スケーラブルな検索ソリューション',
        'AIによる検索精度の向上',
        'マネージドサービスによる運用負荷の軽減',
      ],
      considerations: [
        'コストの最適化',
        'インデックス更新戦略',
        'パフォーマンスチューニング',
        'セキュリティ設定',
      ],
    },
  },
  // ... other cards remain the same but without content
];

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
