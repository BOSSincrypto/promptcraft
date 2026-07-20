import { useState, useEffect } from 'react';
import { AppShell } from '../components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui';
import { ExampleFeed } from '../components/community/ExampleFeed';
import { SearchFilter } from '../components/community/SearchFilter';
import { getCommunityExamples, getCommunityCategories, getCommunityStats } from '../lib/content';
import type { CommunityExample, CommunityFilter } from '../types';

export function Community() {
  const [examples, setExamples] = useState<CommunityExample[]>([]);
  const [categories, setCategories] = useState<Record<string, { title: string; description: string; icon: string; color: string }>>({});
  const [stats, setStats] = useState<{ totalExamples: number; totalAuthors: number; totalLikes: number } | null>(null);
  const [filter, setFilter] = useState<CommunityFilter>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [examplesData, categoriesData, statsData] = await Promise.all([
          getCommunityExamples(filter),
          getCommunityCategories(),
          getCommunityStats(),
        ]);
        
        setExamples(examplesData);
        setCategories(categoriesData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load community data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [filter]);

  const handleFilterChange = (newFilter: CommunityFilter) => {
    setFilter(newFilter);
    setLoading(true);
  };

  const handleCopy = () => {
    // Could add analytics or toast notification here
    console.log('Copied prompt to clipboard');
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community Examples</h1>
            <p className="text-muted-foreground mt-2">
              Discover and share prompt engineering examples from the community
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalExamples}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAuthors}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Likes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLikes}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filter */}
        <section>
          <SearchFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            categories={categories}
          />
        </section>

        {/* Examples Feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {filter.category 
                ? `${categories[filter.category]?.title || filter.category} Examples`
                : 'All Examples'
              }
            </h2>
            <div className="text-sm text-muted-foreground">
              {examples.length} example{examples.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <ExampleFeed examples={examples} onCopy={handleCopy} />
          )}
        </section>
      </div>
    </AppShell>
  );
}
