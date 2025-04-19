'use client';

import { Article } from '@/types/types';
import {
  ChartData as BarData,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface MonthlyPostsChartProps {
  articles: Article[];
}

export function MonthlyPostsChart({ articles }: MonthlyPostsChartProps) {
  // YYYY-MM ごとに集計
  const counts: Record<string, number> = {};
  articles.forEach((a) => {
    const d = new Date(a.published_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}`;
    counts[key] = (counts[key] ?? 0) + 1;
  });

  const labels = Object.keys(counts).sort();
  const data: BarData<'bar'> = {
    labels,
    datasets: [
      {
        label: '月間投稿数',
        data: labels.map((l) => counts[l]),
        backgroundColor: '#60a5fa',
      },
    ],
  };

  return <Bar data={data} />;
}
