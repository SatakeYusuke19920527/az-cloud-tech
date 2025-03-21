export interface Article {
  title: string;
  url: string;
  published_at: string;
  likes_count: number;
  user: string;
  avatar_small_url?: string;
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
