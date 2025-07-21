import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

type ZennArticle = {
  title: string;
  path: string;
  user: {
    name: string;
    avatar_small_url: string;
  };
};

async function getLatestArticles(): Promise<ZennArticle[]> {
  const res = await fetch('https://zenn.dev/api/articles?order=latest', {
    next: { revalidate: 60 }, // 1 分キャッシュ
  });
  if (!res.ok) throw new Error('Failed to fetch Zenn articles');
  const { articles } = await res.json();
  return (articles as ZennArticle[]).slice(0, 9);
}

export default async function AnalysisPage() {
  const articles = await getLatestArticles();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-4xl font-bold">Latest Zenn Articles</h1>
        <Separator />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.path}
              href={`https://zenn.dev${article.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="hover:shadow-lg transition-shadow group">
                <div className="relative h-40 w-full overflow-hidden rounded-t-md bg-muted">
                  <Image
                    src={article.user.avatar_small_url}
                    alt={article.user.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-base">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    by {article.user.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
