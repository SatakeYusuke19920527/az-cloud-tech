'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface PoCCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

const pocCards: PoCCard[] = [
  {
    title: 'Azure AI SearchへDeepDive',
    description:
      '最新のAzure AI Search機能を詳しく解説し、実践的な使用方法を紹介します。',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/azure-ai-search',
  },
  {
    title: 'AIコールセンターの作り方',
    description:
      'Azure AI ServicesとOpenAIを活用した次世代コールセンターの構築方法。',
    image:
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/ai-call-center',
  },
  {
    title: 'AI AgentへDeepDive',
    description: '自律型AIエージェントの開発と実装について詳しく解説します。',
    image:
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/ai-agent',
  },
  {
    title: 'Azure OpenAI Service実践ガイド',
    description: 'Azure OpenAI Serviceを使った実践的なアプリケーション開発。',
    image:
      'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/azure-openai',
  },
  {
    title: 'MLOpsパイプラインの構築',
    description: 'Azure Machine LearningでのMLOpsパイプライン自動化。',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/mlops',
  },
  {
    title: 'リアルタイムAI推論システム',
    description: 'エッジデバイスでのリアルタイムAI推論システムの実装。',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/realtime-ai',
  },
  {
    title: '自然言語処理アプリケーション',
    description: '最新のNLPモデルを活用したアプリケーション開発事例。',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/nlp-apps',
  },
  {
    title: 'Computer Vision実践ガイド',
    description: 'Azure Computer Visionを使った画像認識システムの構築。',
    image:
      'https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/computer-vision',
  },
  {
    title: 'AIチャットボット開発',
    description: 'Azure Bot ServiceとOpenAIを組み合わせたチャットボット開発。',
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&h=800&q=80',
    link: '/dashboard/poc-showcase/chatbot',
  },
];

export default function PoCPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Proof of Concept Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pocCards.map((card, index) => (
            <Link href={card.link} key={index} className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-[360px] overflow-hidden bg-black rounded-xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-75"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {card.title}
                      </h2>
                      <p className="text-sm text-gray-300 line-clamp-2 opacity-90">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
