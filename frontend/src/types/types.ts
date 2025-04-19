export interface Article {
  title: string;
  url: string;
  published_at: string;
  likes_count: number;
  user: string;
  avatar_small_url?: string;
  platform: 'zenn' | 'qiita' | 'kentsu';
}

export interface ChartData {
  [key: string]: {
    likes: number;
    posts: number;
  };
}

export interface UserStats {
  totalPosts: number;
  totalLikes: number;
}

export type TimeRange = 'all' | 'month' | 'custom';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface PoCCard {
  title: string;
  description: string;
  image: string;
  priceId: string;
  link: string;
  content?: {
    overview: string;
    architecture?: string;
    implementation: string[];
    technologies: string[];
    benefits: string[];
    considerations: string[];
  };
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  isFeatured: boolean;
  category: string;
}
