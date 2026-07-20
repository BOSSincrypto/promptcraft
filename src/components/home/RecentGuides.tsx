import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Palette, Code2, Wrench } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { ModelType } from '../../types';
import { formatDate } from '../../lib/utils';

interface RecentGuide {
  slug: string;
  title: string;
  description: string;
  modelType: ModelType;
  lastUpdated: number;
}

const recentGuides: RecentGuide[] = [
  {
    slug: 'gpt-4',
    title: 'GPT-4 Guide',
    description: 'Master prompt engineering for OpenAI\'s most capable model.',
    modelType: 'llms',
    lastUpdated: Date.now() - 86400000 * 7,
  },
  {
    slug: 'midjourney',
    title: 'Midjourney Guide',
    description: 'Create stunning images with effective Midjourney prompts.',
    modelType: 'image-generators',
    lastUpdated: Date.now() - 86400000 * 14,
  },
  {
    slug: 'github-copilot',
    title: 'GitHub Copilot Guide',
    description: 'Write better code with AI-powered assistance.',
    modelType: 'code-models',
    lastUpdated: Date.now() - 86400000 * 3,
  },
];

const modelTypeIcons: Record<ModelType, React.ReactNode> = {
  llms: <Bot className="h-5 w-5" />,
  'image-generators': <Palette className="h-5 w-5" />,
  'code-models': <Code2 className="h-5 w-5" />,
  specialized: <Wrench className="h-5 w-5" />,
};

const modelTypeColors: Record<ModelType, 'primary' | 'secondary' | 'success' | 'warning'> = {
  llms: 'primary',
  'image-generators': 'secondary',
  'code-models': 'success',
  specialized: 'warning',
};

export function RecentGuides() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recent Guides</h2>
          <p className="text-muted-foreground">Model-specific best practices</p>
        </div>
        <Link to="/guides">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentGuides.map((guide) => (
          <Link key={guide.slug} to={`/guides/${guide.slug}`}>
            <Card hover className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {modelTypeIcons[guide.modelType]}
                  </div>
                  <Badge variant={modelTypeColors[guide.modelType]}>
                    {guide.modelType}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="mt-auto">
                <p className="text-xs text-muted-foreground">
                  Updated {formatDate(guide.lastUpdated)}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
