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

export type TimeRange = 'all' | 'month';

export interface PoCCard {
  title: string;
  description: string;
  image: string;
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
