'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Eye,
  Filter,
  Heart,
  Link as LinkIcon,
  Search,
  Star,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// ------------------------------
// Types & Sample Data
// ------------------------------

type Platform = 'Zenn' | 'Qiita';

type Article = {
  id: string;
  platform: Platform;
  title: string;
  url: string;
  tags: string[];
  likes: number; // Qiita: likes_count / Zenn: LGTM 相当
  reactions: number; // 総リアクション（仮）
  views: number;
  date: string; // YYYY-MM-DD
};

const SAMPLE: Article[] = [
  {
    id: 'z1',
    platform: 'Zenn',
    title: 'Next.js と Azure OpenAI で作るチャットUI',
    url: 'https://zenn.dev/',
    tags: ['Next.js', 'Azure', 'OpenAI'],
    likes: 42,
    reactions: 58,
    views: 2100,
    date: '2025-08-18',
  },
  {
    id: 'q1',
    platform: 'Qiita',
    title: 'LangChain で始めるエージェント実装 Tips',
    url: 'https://qiita.com/',
    tags: ['LangChain', 'LLM', 'Agent'],
    likes: 31,
    reactions: 46,
    views: 1500,
    date: '2025-08-17',
  },
  {
    id: 'z2',
    platform: 'Zenn',
    title: 'shadcn/ui で爆速ダッシュボード構築',
    url: 'https://zenn.dev/',
    tags: ['UI', 'shadcn', 'Tailwind'],
    likes: 28,
    reactions: 35,
    views: 980,
    date: '2025-08-12',
  },
  {
    id: 'q2',
    platform: 'Qiita',
    title: 'Azure Cosmos DB: RU 設計の実践',
    url: 'https://qiita.com/',
    tags: ['Azure', 'CosmosDB'],
    likes: 22,
    reactions: 30,
    views: 1100,
    date: '2025-08-10',
  },
  {
    id: 'z3',
    platform: 'Zenn',
    title: 'RAG 構成を Azure で回す',
    url: 'https://zenn.dev/',
    tags: ['Azure', 'RAG', 'AI'],
    likes: 35,
    reactions: 50,
    views: 1320,
    date: '2025-08-03',
  },
  {
    id: 'q3',
    platform: 'Qiita',
    title: 'Next.js App Router での型安全な API 設計',
    url: 'https://qiita.com/',
    tags: ['Next.js', 'TypeScript'],
    likes: 19,
    reactions: 27,
    views: 760,
    date: '2025-07-28',
  },
];

// ------------------------------
// Helpers
// ------------------------------

const DAYS = { '7d': 7, '30d': 30, '90d': 90 } as const;

type RangeKey = keyof typeof DAYS | 'all';

function dateToKey(d: Date) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

function getRangeCutoff(range: RangeKey) {
  if (range === 'all') return null;
  const days = DAYS[range as keyof typeof DAYS];
  const d = new Date();
  d.setDate(d.getDate() - days + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function withinRange(a: Article, cutoff: Date | null) {
  if (!cutoff) return true;
  return new Date(a.date) >= cutoff;
}

function sum<T>(arr: T[], map: (t: T) => number) {
  return arr.reduce((acc, t) => acc + map(t), 0);
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

// ------------------------------
// Page
// ------------------------------

export default function PocsPage() {
  // state
  const [platform, setPlatform] = useState<Platform | 'All'>('All');
  const [range, setRange] = useState<RangeKey>('30d');
  const [q, setQ] = useState('');
  const [articles] = useState<Article[]>(SAMPLE);

  const cutoff = useMemo(() => getRangeCutoff(range), [range]);

  const filtered = useMemo(() => {
    return articles
      .filter((a) => withinRange(a, cutoff))
      .filter((a) => (platform === 'All' ? true : a.platform === platform))
      .filter((a) => {
        if (!q) return true;
        const hay = (a.title + ' ' + a.tags.join(' ')).toLowerCase();
        return hay.includes(q.toLowerCase());
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [articles, cutoff, platform, q]);

  // KPI
  const totalArticles = filtered.length;
  const totalLikes = sum(filtered, (a) => a.likes);
  const totalViews = sum(filtered, (a) => a.views);
  const avgReactions = filtered.length
    ? Math.round(sum(filtered, (a) => a.reactions) / filtered.length)
    : 0;

  // Time-series (views per day)
  const daysBack = range === 'all' ? 60 : DAYS[range as keyof typeof DAYS];
  const seed = new Map<string, number>();
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    seed.set(dateToKey(d), 0);
  }
  for (const a of filtered) {
    const key = a.date;
    if (seed.has(key)) seed.set(key, (seed.get(key) || 0) + a.views);
  }
  const series = Array.from(seed.entries()).map(([date, views]) => ({
    date,
    views,
  }));

  // Tags distribution
  const allTags = filtered.flatMap((a) => a.tags);
  const tags = uniq(allTags);
  const tagDist = tags
    .map((t) => ({ tag: t, count: allTags.filter((x) => x === t).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Platform split
  const byPlatform = [
    {
      name: 'Zenn',
      value: filtered.filter((a) => a.platform === 'Zenn').length,
    },
    {
      name: 'Qiita',
      value: filtered.filter((a) => a.platform === 'Qiita').length,
    },
  ];

  // Featured pick (this month)
  const thisMonthStart = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }, []);
  const score = (a: Article) => a.views * 0.5 + a.likes * 3 + a.reactions;
  const monthly = useMemo(
    () =>
      articles
        .filter((a) => new Date(a.date) >= thisMonthStart)
        .filter((a) => (platform === 'All' ? true : a.platform === platform))
        .filter((a) => {
          if (!q) return true;
          const hay = (a.title + ' ' + a.tags.join(' ')).toLowerCase();
          return hay.includes(q.toLowerCase());
        }),
    [articles, thisMonthStart, platform, q]
  );
  const featured = useMemo(
    () =>
      monthly.length
        ? monthly.slice().sort((a, b) => score(b) - score(a))[0]
        : undefined,
    [monthly]
  );
  const featuredScore = featured ? Math.round(score(featured)) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Content Analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              Zenn / Qiita の記事パフォーマンスをひと目で。
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    ガイド
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  実データ連携のヒントはコード内コメント参照
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-dashed">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="タイトル / タグで検索"
                    className="pl-8"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden md:block h-8"
                />
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={platform}
                  onValueChange={(v) => setPlatform(v as Platform | 'All')}
                >
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Zenn">Zenn</SelectItem>
                    <SelectItem value="Qiita">Qiita</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={range}
                  onValueChange={(v) => setRange(v as RangeKey)}
                >
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">過去7日</SelectItem>
                    <SelectItem value="30d">過去30日</SelectItem>
                    <SelectItem value="90d">過去90日</SelectItem>
                    <SelectItem value="all">すべて</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="secondary"
                  className="gap-2"
                  onClick={() => {
                    /* TODO: 再取得処理 */
                  }}
                >
                  更新
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              記事数
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{totalArticles}</div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              合計いいね
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{totalLikes}</div>
            <Heart className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              平均リアクション
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{avgReactions}</div>
            <ThumbsUp className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              合計ビュー
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">
              {totalViews.toLocaleString()}
            </div>
            <Eye className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Pick */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        {featured ? (
          <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-primary/40">
            <CardHeader className="pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="rounded-full" variant="secondary">
                    <Star className="h-3.5 w-3.5 mr-1" />
                    今月のPICK
                  </Badge>
                  <Badge
                    variant={
                      featured.platform === 'Zenn' ? 'default' : 'secondary'
                    }
                  >
                    {featured.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {featured.date}
                  </span>
                </div>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl md:text-2xl font-semibold hover:underline truncate max-w-[60ch]"
                >
                  {featured.title}
                </a>
                <div className="flex flex-wrap gap-1">
                  {featured.tags.slice(0, 5).map((t) => (
                    <Badge key={t} variant="outline">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* メトリクスをカード内のグリッドに移動し、オーバーフローを防止 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-background/60 p-3 text-center">
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Star className="h-3.5 w-3.5" /> Score
                  </div>
                  <div className="text-xl font-bold">{featuredScore}</div>
                </div>
                <div className="rounded-lg border bg-background/60 p-3 text-center">
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Heart className="h-3.5 w-3.5" /> Likes
                  </div>
                  <div className="text-xl font-bold">{featured.likes}</div>
                </div>
                <div className="rounded-lg border bg-background/60 p-3 text-center">
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" /> Reacts
                  </div>
                  <div className="text-xl font-bold">{featured.reactions}</div>
                </div>
                <div className="rounded-lg border bg-background/60 p-3 text-center">
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> Views
                  </div>
                  <div className="text-xl font-bold">
                    {featured.views.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button asChild>
                  <a href={featured.url} target="_blank" rel="noreferrer">
                    <LinkIcon className="h-4 w-4 mr-1" /> 記事を開く
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              今月の対象記事がありません。
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-4"
      >
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Views 推移</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={series}
                margin={{ left: 10, right: 10, top: 5, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(217.2 91.2% 59.8%)"
                  fill="hsl(217.2 91.2% 59.8%)"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform 構成比</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={byPlatform}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                >
                  {byPlatform.map((item, i) => (
                    <Cell
                      key={i}
                      fill={
                        item.name === 'Zenn'
                          ? 'hsl(217.2 91.2% 59.8%)'
                          : 'hsl(199.4 95.5% 36.5%)'
                      }
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {byPlatform.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{
                      background:
                        p.name === 'Zenn'
                          ? 'hsl(217.2 91.2% 59.8%)'
                          : 'hsl(199.4 95.5% 36.5%)',
                    }}
                  />
                  {p.name}: {p.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-4"
      >
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">人気タグ Top 10</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tagDist}
                margin={{ left: 10, right: 10, top: 5, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tag" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Bar dataKey="count" fill="hsl(217.2 91.2% 59.8%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">メモ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc pl-5 space-y-2 text-muted-foreground">
              <li>フィルタ右の「更新」ボタンに API 再取得処理を実装</li>
              <li>Zenn は RSS、Qiita は API v2 で取得</li>
              <li>記事のスコア: views × 0.5 + likes × 3 などに調整可</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Latest */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">最新記事</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日付</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead className="w-[220px] hidden md:table-cell">
                      タグ
                    </TableHead>
                    <TableHead className="text-right">Likes</TableHead>
                    <TableHead className="text-right hidden lg:table-cell">
                      Reacts
                    </TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">
                      Open
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-nowrap">
                        {a.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            a.platform === 'Zenn' ? 'default' : 'secondary'
                          }
                        >
                          {a.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[420px] truncate">
                        {a.title}
                      </TableCell>
                      <TableCell className="space-x-1 hidden md:table-cell">
                        {a.tags.map((t) => (
                          <Badge key={t} variant="outline">
                            #{t}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell className="text-right">{a.likes}</TableCell>
                      <TableCell className="text-right hidden lg:table-cell">
                        {a.reactions}
                      </TableCell>
                      <TableCell className="text-right">
                        {a.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right hidden sm:table-cell">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                        >
                          <a href={a.url} target="_blank" rel="noreferrer">
                            <LinkIcon className="h-4 w-4" />
                            開く
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden grid gap-3">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border p-3 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">
                      {a.date} •{' '}
                      <span className="font-medium">{a.platform}</span>
                    </div>
                    <div className="font-medium truncate">{a.title}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {a.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="outline">
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                    <div className="text-xs text-muted-foreground">Likes</div>
                    <div className="text-base font-semibold">{a.likes}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                    <div className="text-base font-semibold">
                      {a.views.toLocaleString()}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="mt-2 px-2"
                    >
                      <a href={a.url} target="_blank" rel="noreferrer">
                        <LinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <footer className="py-6 text-xs text-muted-foreground">
        <p>
          ※ ダミーデータ表示中。Zenn / Qiita
          の取得処理を追加して置き換えてください。
        </p>
      </footer>
    </div>
  );
}
