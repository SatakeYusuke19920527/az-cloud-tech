import type { PoCCard } from '@/types/types';

export const ZENN_USERS = [
  { username: 'yusu29', color: 'hsl(var(--chart-1))' },
  { username: 'nomhiro', color: 'hsl(var(--chart-2))' },
  { username: 'yuma_prog', color: 'hsl(var(--chart-3))' },
  { username: 'chips0711', color: 'hsl(var(--chart-4))' },
  { username: 'ryuuuu', color: 'hsl(var(--chart-5))' },
  { username: 'skmkzyk', color: 'hsl(var(--chart-1))' },
  { username: 'ymd65536', color: 'hsl(var(--chart-2))' },
  { username: '07jp27', color: 'hsl(var(--chart-3))' },
  { username: 'mrt', color: 'hsl(var(--chart-4))' },
];

export const QIITA_USERS = [
  { username: 'aktsmm', color: 'hsl(var(--chart-1))' },
  { username: 'yuyanz', color: 'hsl(var(--chart-2))' },
  { username: 'dessin', color: 'hsl(var(--chart-3))' },
];

export const KENTSU_BLOG = {
  url: 'https://www.kentsu.website/ja/posts/',
  color: 'hsl(var(--chart-4))',
};

export const ALLOW_MONEY = ['sataaaaak@gmail.com'];

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
