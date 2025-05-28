'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KENTSU_BLOG, QIITA_USERS, ZENN_USERS } from '@/lib/config';
import { ChartData, TimeRange } from '@/types/types';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface UserChartProps {
  data: ChartData;
  type: 'likes' | 'posts';
  timeRange: TimeRange;
}

export function UserChart({ data, type, timeRange }: UserChartProps) {
  const title =
    type === 'likes'
      ? `いいね数 (${timeRange === 'month' ? '過去1ヶ月' : '全期間'})`
      : `記事数 (${timeRange === 'month' ? '過去1ヶ月' : '全期間'})`;

  // Create a mapping of usernames to colors for predefined users
  const colorMap: Record<string, string> = {
    ...Object.fromEntries(ZENN_USERS.map(({ username, color }) => [username, color])),
    ...Object.fromEntries(QIITA_USERS.map(({ username, color }) => [username, color])),
    'kentsu': KENTSU_BLOG.color,
  };

  // Get default colors for chart
  const defaultColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];
  
  // Get all users from the data object
  const allUsers = Object.keys(data);
  let colorIndex = 0;
  
  const chartData = allUsers.map(username => ({
    name: username,
    value: data[username]?.[type] || 0,
    // Use predefined color if available, otherwise use a default color
    color: colorMap[username] || defaultColors[colorIndex++ % defaultColors.length],
  }));
  
  // Sort chart data by value in descending order
  chartData.sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        {' '}
        {/* Increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60, // Increased bottom margin for labels
            }}
          >
            <XAxis
              dataKey="name"
              interval={0} // Force display all labels
              angle={-45} // Rotate labels
              textAnchor="end" // Align rotated text
              height={60} // Increase height for rotated labels
              tick={{ fontSize: 12 }} // Adjust font size if needed
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="var(--chart-color)"
              name={type === 'likes' ? 'いいね数' : '記事数'}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
