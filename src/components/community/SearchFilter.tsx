import { useState, useEffect } from 'react';
import { Input, Button, Badge } from '../ui';
import type { CommunityCategory, CommunityFilter } from '../../types';

interface SearchFilterProps {
  filter: CommunityFilter;
  onFilterChange: (filter: CommunityFilter) => void;
  categories: Record<string, { title: string; description: string; icon: string; color: string }>;
}

export function SearchFilter({ filter, onFilterChange, categories }: SearchFilterProps) {
  const [searchInput, setSearchInput] = useState(filter.search || '');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filter, search: searchInput || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, filter, onFilterChange]);

  const handleCategoryChange = (category: CommunityCategory | undefined) => {
    onFilterChange({ ...filter, category });
  };

  const handleSortChange = (sortBy: CommunityFilter['sortBy']) => {
    onFilterChange({ ...filter, sortBy });
  };

  const handleDifficultyChange = (difficulty: CommunityFilter['difficulty']) => {
    onFilterChange({ ...filter, difficulty });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFilterChange({});
  };

  const hasActiveFilters = filter.category || filter.search || filter.sortBy || filter.difficulty;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search examples..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!filter.category ? "primary" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(undefined)}
        >
          All
        </Button>
        {Object.entries(categories).map(([key, category]) => (
          <Button
            key={key}
            variant={filter.category === key ? "primary" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(key as CommunityCategory)}
          >
            {category.title}
          </Button>
        ))}
      </div>

      {/* Sort and Difficulty Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-1">
            {[
              { value: 'newest' as const, label: 'Newest' },
              { value: 'popular' as const, label: 'Popular' },
              { value: 'featured' as const, label: 'Featured' },
            ].map((option) => (
              <Button
                key={option.value}
                variant={filter.sortBy === option.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleSortChange(option.value)}
                className="h-7 px-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          <div className="flex gap-1">
            {[
              { value: undefined, label: 'All' },
              { value: 'beginner' as const, label: 'Beginner' },
              { value: 'intermediate' as const, label: 'Intermediate' },
              { value: 'advanced' as const, label: 'Advanced' },
            ].map((option) => (
              <Button
                key={option.label}
                variant={filter.difficulty === option.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleDifficultyChange(option.value)}
                className="h-7 px-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filter.category && (
            <Badge variant="secondary" className="gap-1">
              {categories[filter.category]?.title || filter.category}
              <button
                onClick={() => handleCategoryChange(undefined)}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filter.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filter.search}
              <button
                onClick={() => {
                  setSearchInput('');
                  onFilterChange({ ...filter, search: undefined });
                }}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filter.sortBy && (
            <Badge variant="secondary" className="gap-1">
              Sort: {filter.sortBy}
              <button
                onClick={() => handleSortChange(undefined)}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filter.difficulty && (
            <Badge variant="secondary" className="gap-1">
              Difficulty: {filter.difficulty}
              <button
                onClick={() => handleDifficultyChange(undefined)}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
