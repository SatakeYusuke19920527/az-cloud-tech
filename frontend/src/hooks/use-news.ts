// hooks/use-news.ts
'use client';

import type { NewsItem } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /* ---------- 一覧取得 ---------- */
  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Failed to fetch news');
      const data: NewsItem[] = await res.json();
      setNews(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  /* ---------- 追加 ---------- */
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create news');
    const created: NewsItem = await res.json();
    setNews((prev) => [created, ...prev]);
  };

  /* ---------- 更新 ---------- */
  const updateNews = async (id: string, fields: Partial<NewsItem>) => {
    const res = await fetch(`/api/news/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error('Failed to update news');
    const updated: NewsItem = await res.json();
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  /* ---------- 削除 ---------- */
  const deleteNews = async (id: string) => {
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete news');
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  /* ---------- Featured 切替 ---------- */
  const toggleFeatured = async (id: string) => {
    const target = news.find((n) => n.id === id);
    if (!target) return;

    // isFeatured を反転して PATCH
    await updateNews(id, { isFeatured: !target.isFeatured });
  };

  return {
    news,
    isLoading,
    error,
    fetchNews,
    addNews,
    updateNews,
    deleteNews,
    toggleFeatured,
  };
}
