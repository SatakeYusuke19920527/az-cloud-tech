'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface NewsFiltersProps {
  categories: string[];
  onFilterChange: (filters: {
    search: string;
    category: string | null;
  }) => void;
}

export function NewsFilters({ categories, onFilterChange }: NewsFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, category });
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      setCategory(null);
      onFilterChange({ search, category: null });
    } else {
      setCategory(value);
      onFilterChange({ search, category: value });
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategory(null);
    onFilterChange({ search: '', category: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Select value={category || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(search || category) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {search}
                <button
                  onClick={() => {
                    setSearch('');
                    onFilterChange({ search: '', category });
                  }}
                  className="ml-1 hover:text-foreground/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {category}
                <button
                  onClick={() => {
                    setCategory(null);
                    onFilterChange({ search, category: null });
                  }}
                  className="ml-1 hover:text-foreground/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
