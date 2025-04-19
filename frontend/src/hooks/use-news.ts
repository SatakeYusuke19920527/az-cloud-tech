'use client';

import { NewsItem } from '@/types/types';
import { useEffect, useState } from 'react';

// Initial demo data
const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'The Future of Sustainable Design',
    content:
      'Exploring how sustainable design principles are reshaping modern architecture and product development.',
    imageUrl:
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
    date: '2025-03-15',
    author: 'Maya Johnson',
    isFeatured: true,
    category: 'Design',
  },
  {
    id: '2',
    title: 'Innovation in AI Assistants',
    content:
      'New breakthroughs in conversational AI are changing how we interact with digital assistants.',
    imageUrl:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    date: '2025-03-10',
    author: 'David Chen',
    isFeatured: false,
    category: 'Technology',
  },
  {
    id: '3',
    title: 'The Revival of Analog Photography',
    content:
      'Film photography sees a resurgence as digital natives discover the charm of analog processes.',
    imageUrl:
      'https://images.pexels.com/photos/821738/pexels-photo-821738.jpeg',
    date: '2025-03-05',
    author: 'Emma Rodriguez',
    isFeatured: false,
    category: 'Arts',
  },
  {
    id: '4',
    title: 'Remote Work Culture in 2025',
    content:
      'How companies are reimagining workplace culture in an increasingly distributed world.',
    imageUrl:
      'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg',
    date: '2025-02-28',
    author: 'James Wilson',
    isFeatured: false,
    category: 'Business',
  },
  {
    id: '5',
    title: 'Advances in Quantum Computing',
    content:
      'Recent developments in quantum computing that promise to revolutionize data processing.',
    imageUrl:
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
    date: '2025-02-20',
    author: 'Sophia Kim',
    isFeatured: false,
    category: 'Technology',
  },
];

export function useNews() {
  // Use localStorage for persistence if available
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load news from localStorage on initial render
  useEffect(() => {
    const storedNews = localStorage.getItem('newsItems');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    } else {
      setNews(initialNews);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever news changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('newsItems', JSON.stringify(news));
    }
  }, [news, isLoading]);

  // Add a new news item
  const addNews = (newItem: Omit<NewsItem, 'id'>) => {
    const id = Date.now().toString();
    setNews((prev) => [{ ...newItem, id }, ...prev]);
  };

  // Delete a news item
  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle featured status
  const toggleFeatured = (id: string) => {
    setNews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  return { news, addNews, deleteNews, toggleFeatured, isLoading };
}
