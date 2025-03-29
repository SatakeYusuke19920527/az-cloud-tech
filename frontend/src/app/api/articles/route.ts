import { QIITA_USERS, ZENN_USERS } from '@/lib/config';
import { getKentsuArticles } from '@/lib/kentsu';
import { getQiitaArticles } from '@/lib/qiita';
import { NextResponse } from 'next/server';

const ZENN_API_BASE = 'https://zenn.dev/api';

export async function GET() {
  try {
    const allArticles = await Promise.all([
      // Fetch Zenn articles
      ...ZENN_USERS.map(async ({ username }) => {
        // Fetch user profile
        const userResponse = await fetch(`${ZENN_API_BASE}/users/${username}`);
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data for ${username}`);
        }
        const userData = await userResponse.json();

        // Fetch articles
        const articlesResponse = await fetch(
          `${ZENN_API_BASE}/articles?username=${username}&order=latest`
        );
        if (!articlesResponse.ok) {
          throw new Error(`Failed to fetch articles for ${username}`);
        }
        const articlesData = await articlesResponse.json();

        // Map articles with user data
        /* eslint-disable @typescript-eslint/no-explicit-any */
        return articlesData.articles.map((article: any) => ({
          title: article.title,
          url: `https://zenn.dev${article.path}`,
          published_at: article.published_at,
          likes_count: article.liked_count,
          user: username,
          avatar_small_url: userData.user.avatar_small_url,
          platform: 'zenn',
        }));
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
