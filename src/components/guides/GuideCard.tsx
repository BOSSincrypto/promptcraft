import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Palette, Code2, Wrench } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { ModelType } from '../../types';
import { formatDate } from '../../lib/utils';

interface GuideCardProps {
  slug: string;
  title: string;
  description: string;
  modelType: ModelType;
  lastUpdated: number;
  icon?: string;
  color?: string;
}

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

export function GuideCard({
  slug,
  title,
  description,
  modelType,
  lastUpdated,
}: GuideCardProps) {
  return (
    <Link to={`/guides/${slug}`}>
      <Card hover className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {modelTypeIcons[modelType]}
            </div>
            <Badge variant={modelTypeColors[modelType]}>
              {modelType}
            </Badge>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="mt-auto">
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(lastUpdated)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
