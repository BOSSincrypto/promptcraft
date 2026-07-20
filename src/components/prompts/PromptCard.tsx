import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';
import type { PromptTemplate } from '../../types';

interface PromptCardProps {
  template: PromptTemplate;
  onCopy?: (content: string) => void;
}

export function PromptCard({ template, onCopy }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      onCopy?.(template.content);
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <CardDescription className="mt-1">{template.description}</CardDescription>
          </div>
          <Badge className={getCategoryColor(template.category)}>
            {template.category}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{template.model}</Badge>
          {template.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          <div className={`text-sm text-muted-foreground ${expanded ? '' : 'line-clamp-3'}`}>
            <pre className="whitespace-pre-wrap font-mono text-xs bg-muted p-3 rounded-md">
              {template.content}
            </pre>
          </div>
          {template.content.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary hover:underline mt-2"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {template.variables.length} variable{template.variables.length !== 1 ? 's' : ''}
          </div>
          <Button
            variant={copied ? 'primary' : 'outline'}
            size="sm"
            onClick={handleCopy}
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
      </CardContent>
    </Card>
  );
}
