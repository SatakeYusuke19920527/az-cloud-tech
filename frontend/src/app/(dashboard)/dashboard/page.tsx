'use client';

import { ArticleList } from '@/components/dashboard/ArticleList';
import { MonthlyPostsChart } from '@/components/dashboard/MonthlyPostsChart';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimeRangeSelector } from '@/components/dashboard/TimeRangeSelector';
import { UserChart } from '@/components/dashboard/UserChart';
import { ZENN_USERS } from '@/lib/config';
import { getAllArticles } from '@/lib/zenn';
import { Article, ChartData, TimeRange } from '@/types/types';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [customStartDate, setCustomStartDate] = useState<string>('');
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

  /* ------------------------- フィルタリング ------------------------- */
  const filteredArticles = articles.filter((article) => {
    if (timeRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(article.published_at) >= oneMonthAgo;
    }
    if (timeRange === 'custom' && customStartDate) {
      return new Date(article.published_at) >= new Date(customStartDate);
    }
    return true; // all
  });

  /* --------------------------- 集計 --------------------------- */
  const getChartData = (): ChartData => {
    const data: ChartData = {};

    // Kentsu blog
    data['kentsu'] = { likes: 0, posts: 0 };

    // 各ユーザーを初期化
    ZENN_USERS.forEach(({ username }) => {
      data[username] = { likes: 0, posts: 0 };
    });

    // QIITAユーザーを初期化
    QIITA_USERS.forEach(({ username }) => {
      data[username] = { likes: 0, posts: 0 };
    });

    // Get unique users from articles in case there are any not in the predefined lists
    const uniqueUsers = Array.from(new Set(filteredArticles.map(article => article.user)));
    uniqueUsers.forEach(user => {
      if (!data[user]) {
        data[user] = { likes: 0, posts: 0 };
      }
    });

    // 集計
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

  /* ------------------------- ローディング ------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-xl">
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------- 画面 --------------------------- */
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            {timeRange === 'custom' && customStartDate
              ? `${customStartDate} 以降のPoC集`
              : timeRange === 'month'
              ? '今月のPoC集'
              : 'すべてのPoC集'}
          </h1>

          <TimeRangeSelector
            value={timeRange}
            onValueChange={setTimeRange}
            customStartDate={customStartDate}
            onCustomDateChange={setCustomStartDate}
          />
        </div>

        <StatsCards totalPosts={totalPosts} totalLikes={totalLikes} />

        <div className="grid grid-cols-1 gap-4">
          <UserChart data={chartData} type="likes" timeRange={timeRange} />
          <UserChart data={chartData} type="posts" timeRange={timeRange} />
          <MonthlyPostsChart articles={filteredArticles} />
        </div>
        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}
