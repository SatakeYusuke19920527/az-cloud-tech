'use client';

import { ArticleList } from '@/components/dashboard/ArticleList';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimeRangeSelector } from '@/components/dashboard/TimeRangeSelector';
import { UserChart } from '@/components/dashboard/UserChart';
import { ZENN_USERS } from '@/lib/config';
import { getAllArticles } from '@/lib/zenn';
import { Article, ChartData, TimeRange } from '@/types/types';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getAllArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (timeRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(article.published_at) >= oneMonthAgo;
    }
    return true;
  });

  const getChartData = (): ChartData => {
    const data: ChartData = {};
    // Initialize Kentsu blog data
    data['kentsu'] = { likes: 0, posts: 0 };

    // Initialize data structure for each user
    ZENN_USERS.forEach(({ username }) => {
      data[username] = { likes: 0, posts: 0 };
    });

    // Aggregate data
    filteredArticles.forEach((article) => {
      if (!data[article.user]) {
        data[article.user] = { likes: 0, posts: 0 };
      }
      data[article.user].likes += article.likes_count;
      data[article.user].posts += 1;
    });

    return data;
  };

  const chartData = getChartData();
  const totalLikes = filteredArticles.reduce(
    (sum, article) => sum + article.likes_count,
    0
  );
  const totalPosts = filteredArticles.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">今月のPoC集</h1>
          <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
        </div>

        <StatsCards totalPosts={totalPosts} totalLikes={totalLikes} />

        <div className="grid grid-cols-1 gap-4">
          <UserChart data={chartData} type="likes" timeRange={timeRange} />
          <UserChart data={chartData} type="posts" timeRange={timeRange} />
        </div>

        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}
