'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NewsItem } from '@/types/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface NewsCardProps {
  news: NewsItem;
  onDelete: (id: string) => void;
  onFeatureToggle: (id: string) => void;
}

export function NewsCard({ news, onDelete, onFeatureToggle }: NewsCardProps) {
  const formattedDate = format(new Date(news.date), 'MMMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className={cn(
          'h-full transition-all duration-300 hover:shadow-md overflow-hidden',
          news.isFeatured ? 'border-chart-1 ring-1 ring-chart-1/30' : ''
        )}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {news.isFeatured && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="default"
                className="bg-chart-1 hover:bg-chart-1/90"
              >
                Featured
              </Badge>
            </div>
          )}
          <Badge variant="secondary" className="absolute bottom-2 left-2">
            {news.category}
          </Badge>
        </div>

        <CardHeader className="space-y-1 pt-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">
              {news.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 rounded-full',
                news.isFeatured ? 'text-yellow-500' : 'text-muted-foreground'
              )}
              onClick={() => onFeatureToggle(news.id)}
            >
              <Star
                className={cn(
                  'h-4 w-4 transition-all',
                  news.isFeatured ? 'fill-yellow-500' : ''
                )}
              />
              <span className="sr-only">Toggle featured</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {formattedDate} • by {news.author}
          </p>
        </CardHeader>

        <CardContent>
          <p className="text-sm line-clamp-3">{news.content}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Read More
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete news item?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  news article {news.title}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(news.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
