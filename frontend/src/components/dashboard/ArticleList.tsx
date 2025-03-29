'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/types/types';

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  // 記事を日付でソート（最新順）
  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sortedArticles.map((article, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  {article.avatar_small_url ? (
                    <AvatarImage
                      src={article.avatar_small_url}
                      alt={article.user}
                    />
                  ) : (
                    <AvatarFallback>
                      {article.user.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:underline"
                    >
                      {article.title}
                    </a>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{article.user}</span>
                      <span className="px-2 py-1 rounded bg-muted text-xs">
                        {article.platform}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>
                      {new Date(article.published_at).toLocaleDateString(
                        'ja-JP'
                      )}
                    </span>
                    <span>❤️ {article.likes_count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
