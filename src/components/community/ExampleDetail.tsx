import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';
import { ShareButton } from './ShareButton';
import type { CommunityExample } from '../../types';

interface ExampleDetailProps {
  example: CommunityExample;
  onCopy?: (content: string) => void;
}

export function ExampleDetail({ example, onCopy }: ExampleDetailProps) {
  const [copied, setCopied] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const handleCopy = async () => {
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{example.title}</h1>
            {example.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
            )}
          </div>
          <p className="text-muted-foreground text-lg">{example.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton
            title={example.title}
            text={example.description}
            variant="outline"
          />
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-3">
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
        <span className="text-sm text-muted-foreground">
          By {example.author}
        </span>
        <span className="text-sm text-muted-foreground">
          •
        </span>
        <span className="text-sm text-muted-foreground">
          {formatDate(example.createdAt)}
        </span>
        <span className="text-sm text-muted-foreground">
          •
        </span>
        <span className="text-sm text-muted-foreground">
          {example.likes} likes
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {example.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Prompt Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt</CardTitle>
            <Button
              variant={copied ? "primary" : "outline"}
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {showFullPrompt ? example.prompt : (
                example.prompt.length > 300 
                  ? `${example.prompt.substring(0, 300)}...`
                  : example.prompt
              )}
            </pre>
            {example.prompt.length > 300 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="mt-2 p-0 h-auto"
              >
                {showFullPrompt ? 'Show less' : 'Show full prompt'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expected Output Section */}
      {example.expectedOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Expected Output</CardTitle>
            <CardDescription>Example of what this prompt might generate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {example.expectedOutput}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
