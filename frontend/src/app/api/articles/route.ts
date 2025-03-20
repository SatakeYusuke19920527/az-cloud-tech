import { ZENN_USERS } from '@/lib/config';
import { NextResponse } from 'next/server';

const ZENN_API_BASE = 'https://zenn.dev/api';

export async function GET() {
  try {
    const articles = await Promise.all(
      ZENN_USERS.map(async ({ username }) => {
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
        return articlesData.articles.map((article: any) => ({
          title: article.title,
          url: `https://zenn.dev${article.path}`,
          published_at: article.published_at,
          likes_count: article.liked_count,
          user: username,
          avatar_small_url: userData.user.avatar_small_url, // Fix: access avatar_small_url from user object
        }));
      })
    );

    return NextResponse.json(articles.flat());
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
