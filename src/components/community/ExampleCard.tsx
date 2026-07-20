import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';
import { formatDate } from '../../lib/utils';
import type { CommunityExample } from '../../types';

interface ExampleCardProps {
  example: CommunityExample;
  onCopy?: (content: string) => void;
}

export function ExampleCard({ example, onCopy }: ExampleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(example.prompt);
      setCopied(true);
      onCopy?.(example.prompt);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'role-play': return 'bg-purple-100 text-purple-800';
      case 'code': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-pink-100 text-pink-800';
      case 'analysis': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-orange-100 text-orange-800';
      case 'technique': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/community/${example.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{example.title}</CardTitle>
                {example.isFeatured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>
              <CardDescription className="mt-1">{example.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge className={getCategoryColor(example.category)}>
              {example.category}
            </Badge>
            {example.difficulty && (
              <Badge className={getDifficultyColor(example.difficulty)}>
                {example.difficulty}
              </Badge>
            )}
            {example.model && (
              <Badge variant="outline">{example.model}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {example.prompt.substring(0, 150)}...
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {example.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>By {example.author}</span>
            <span>•</span>
            <span>{formatDate(example.createdAt)}</span>
            <span>•</span>
            <span>{example.likes} likes</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
