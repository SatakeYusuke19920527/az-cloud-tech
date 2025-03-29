import { Article } from '@/types/types';

const QIITA_API_BASE = 'https://qiita.com/api/v2';

export async function getQiitaArticles(username: string): Promise<Article[]> {
  const response = await fetch(`${QIITA_API_BASE}/users/${username}/items`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Qiita articles for ${username}`);
  }

  const articles = await response.json();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    published_at: article.created_at,
    likes_count: article.likes_count,
    user: username,
    avatar_small_url: article.user.profile_image_url,
  }));
}
