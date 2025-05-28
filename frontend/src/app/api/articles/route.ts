import { QIITA_USERS, ZENN_USERS } from '@/lib/config';
import { getKentsuArticles } from '@/lib/kentsu';
import { getQiitaArticles } from '@/lib/qiita';
import { NextResponse } from 'next/server';

const ZENN_API_BASE = 'https://zenn.dev/api';
// Maximum number of articles to fetch per page
const ZENN_PER_PAGE = 100;

/**
 * Fetches all articles from Zenn for a specific user
 * with pagination support to ensure all articles are retrieved
 */
async function getAllZennArticlesForUser(username: string) {
  // First fetch user profile
  const userResponse = await fetch(`${ZENN_API_BASE}/users/${username}`);
  if (!userResponse.ok) {
    throw new Error(`Failed to fetch user data for ${username}`);
  }
  const userData = await userResponse.json();

  // Start with page 1
  let page = 1;
  let allArticles: any[] = [];
  let hasMoreArticles = true;

  // Fetch articles with pagination until no more articles are returned
  while (hasMoreArticles) {
    const articlesResponse = await fetch(
      `${ZENN_API_BASE}/articles?username=${username}&order=latest&page=${page}&per_page=${ZENN_PER_PAGE}`
    );

    if (!articlesResponse.ok) {
      throw new Error(`Failed to fetch articles for ${username} on page ${page}`);
    }

    const articlesData = await articlesResponse.json();
    const currentPageArticles = articlesData.articles || [];

    if (currentPageArticles.length === 0) {
      hasMoreArticles = false;
    } else {
      allArticles = [...allArticles, ...currentPageArticles];
      page++;
    }
  }

  // Map articles with user data
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return allArticles.map((article: any) => ({
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    published_at: article.published_at,
    likes_count: article.liked_count,
    user: username,
    avatar_small_url: userData.user.avatar_small_url,
    platform: 'zenn',
  }));
}

export async function GET() {
  try {
    const allArticles = await Promise.all([
      // Fetch Zenn articles with pagination
      ...ZENN_USERS.map(async ({ username }) => {
        return await getAllZennArticlesForUser(username);
      }),

      // Fetch Qiita articles
      ...QIITA_USERS.map(async ({ username }) => {
        const articles = await getQiitaArticles(username);
        return articles.map((article) => ({
          ...article,
          platform: 'qiita',
        }));
      }),

      // Fetch Kentsu blog articles
      getKentsuArticles().then((articles) => articles),
    ]);

    return NextResponse.json(allArticles.flat());
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
