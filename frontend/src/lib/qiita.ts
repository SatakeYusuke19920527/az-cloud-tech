import { Article } from '@/types/types';

const QIITA_API_BASE = 'https://qiita.com/api/v2';
// Maximum number of articles to fetch per page
const QIITA_PER_PAGE = 100;

export async function getQiitaArticles(username: string): Promise<Article[]> {
  let page = 1;
  let allArticles: any[] = [];
  let hasMoreArticles = true;

  // Fetch articles with pagination until no more articles are returned
  while (hasMoreArticles) {
    const response = await fetch(
      `${QIITA_API_BASE}/users/${username}/items?page=${page}&per_page=${QIITA_PER_PAGE}`, 
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Qiita articles for ${username} on page ${page}`);
    }

    const articles = await response.json();
    
    if (articles.length === 0) {
      hasMoreArticles = false;
    } else {
      allArticles = [...allArticles, ...articles];
      page++;
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return allArticles.map((article: any) => ({
    title: article.title,
    url: article.url,
    published_at: article.created_at,
    likes_count: article.likes_count,
    user: username,
    avatar_small_url: article.user.profile_image_url,
  }));
}
