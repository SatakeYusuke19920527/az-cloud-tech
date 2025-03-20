import { Article } from '@/types/types';

export async function getAllArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles');
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
}
