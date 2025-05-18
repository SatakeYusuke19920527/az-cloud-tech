'use client';

import { AddNewsDialog } from '@/components/news/AddNewsDialog';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsFilters } from '@/components/news/NewsFilters';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNews } from '@/hooks/use-news';
import { NewsItem } from '@/types/types';
import { AnimatePresence } from 'framer-motion';
import { Clock, Newspaper, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NewsContainer() {
  const { news, addNews, deleteNews, isLoading, toggleFeatured } = useNews();

  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    category: null as string | null,
  });
  const [activeTab, setActiveTab] = useState('all');

  // Get unique categories from news items
  const categories = [...new Set(news.map((item) => item.category))].sort();

  // Apply filters and tabs to news items
  useEffect(() => {
    let result = [...news];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.content.toLowerCase().includes(searchLower) ||
          item.author.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    // Apply tab filter
    if (activeTab === 'featured') {
      result = result.filter((item) => item.isFeatured);
    } else if (activeTab === 'recent') {
      result = [...result]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    }

    setFilteredNews(result);
  }, [news, filters, activeTab]);

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    search: string;
    category: string | null;
  }) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading PoC部 News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">PoC部 News</h1>
        <AddNewsDialog onAddNews={addNews} />
      </div>

      <Separator />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Newspaper className="h-4 w-4" />
              <span>All News</span>
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>Featured</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Recent</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <NewsFilters
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        <TabsContent value="all" className="mt-0">
          {renderNewsGrid(filteredNews, deleteNews, toggleFeatured)}
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          {renderNewsGrid(filteredNews, deleteNews, toggleFeatured)}
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          {renderNewsGrid(filteredNews, deleteNews, toggleFeatured)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function renderNewsGrid(
  news: NewsItem[],
  onDelete: (id: string) => void,
  onFeatureToggle: (id: string) => void
) {
  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Newspaper className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No news articles found</h3>
        <p className="text-muted-foreground mt-1 mb-4 max-w-md">
          There are no articles matching your current filters or no articles
          have been added yet.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
            onDelete={onDelete}
            onFeatureToggle={onFeatureToggle}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
