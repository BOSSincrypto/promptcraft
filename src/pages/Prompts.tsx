import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../components/layout';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui';
import { PromptCategories } from '../components/prompts/PromptCategories';
import { PromptLibrary } from '../components/prompts/PromptLibrary';
import { getPromptCategories, getPromptTemplates } from '../lib/content';
import type { PromptTemplate, PromptCategory } from '../types';

export function Prompts() {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | null>(null);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Record<string, { title: string; description: string; icon: string; color: string }>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const categoriesData = getPromptCategories();
        setCategories(categoriesData);
        
        const templatesData = await getPromptTemplates(selectedCategory ?? undefined);
        setTemplates(templatesData);
      } catch (error) {
        console.error('Failed to load prompt data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [selectedCategory]);

  const handleCategorySelect = (category: PromptCategory | null) => {
    setSelectedCategory(category);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Prompt Templates</h1>
            <p className="text-muted-foreground mt-2">
              Discover and use professionally crafted prompts for various tasks
            </p>
          </div>
          <Link to="/prompts/generator">
            <Button size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Custom Prompt
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <PromptCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </section>

        {/* Templates Library */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {selectedCategory 
                ? `${categories[selectedCategory]?.title ?? selectedCategory} Templates`
                : 'All Templates'
              }
            </h2>
            <div className="text-sm text-muted-foreground">
              {templates.length} template{templates.length !== 1 ? 's' : ''}
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
          ) : templates.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No templates found in this category.</p>
              </CardContent>
            </Card>
          ) : (
            <PromptLibrary templates={templates} />
          )}
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Prompt Generator
              </CardTitle>
              <CardDescription>
                Create custom prompts with variable inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/prompts/generator">
                <Button variant="outline" className="w-full">
                  Open Generator
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Prompt Optimizer
              </CardTitle>
              <CardDescription>
                Improve your prompts with AI suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/prompts/generator?tab=optimize">
                <Button variant="outline" className="w-full">
                  Open Optimizer
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                My Prompts
              </CardTitle>
              <CardDescription>
                Manage your saved custom prompts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/prompts/generator?tab=my">
                <Button variant="outline" className="w-full">
                  View Saved Prompts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
