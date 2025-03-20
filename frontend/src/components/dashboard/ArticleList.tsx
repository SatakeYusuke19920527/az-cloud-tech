'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/types/types';
import Image from 'next/image';

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  {article.avatar_small_url ? (
                    <Image
                      src={article.avatar_small_url}
                      alt={article.user}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarFallback>
                      {article.user[0].toUpperCase()}
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
                    <span className="text-sm text-muted-foreground">
                      {article.user}
                    </span>
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
