import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { PromptCategory } from '../../types';

interface QuickPrompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  content: string;
}

const quickPrompts: QuickPrompt[] = [
  {
    id: '1',
    title: 'Role-Play Expert',
    description: 'Create a character with specific expertise for interactive scenarios.',
    category: 'role-play',
    content: 'You are an expert in [field]. Act as a [role] who [specific behavior]. Respond to user queries with [characteristics].',
  },
  {
    id: '2',
    title: 'Code Review Assistant',
    description: 'Get detailed code review feedback and suggestions.',
    category: 'code',
    content: 'Review the following code for best practices, potential bugs, and performance improvements. Provide specific suggestions with code examples.',
  },
  {
    id: '3',
    title: 'Creative Writer',
    description: 'Generate creative content with specific style and tone.',
    category: 'creative',
    content: 'Write a [type of content] in the style of [author/style]. The tone should be [adjectives]. Include [specific elements].',
  },
];

const categoryColors: Record<PromptCategory, 'primary' | 'secondary' | 'success' | 'warning'> = {
  'role-play': 'primary',
  'code': 'secondary',
  'creative': 'success',
  'analysis': 'warning',
  'general': 'primary',
};

export function QuickStartPrompts() {
  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Quick Start Prompts</h2>
          <p className="text-muted-foreground">Ready-to-use prompt templates</p>
        </div>
        <Link to="/prompts">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickPrompts.map((prompt) => (
          <Card key={prompt.id} hover className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={categoryColors[prompt.category]}>
                  {prompt.category}
                </Badge>
              </div>
              <CardTitle className="text-lg">{prompt.title}</CardTitle>
              <CardDescription>{prompt.description}</CardDescription>
            </CardHeader>
            
            <div className="mt-auto p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
                {prompt.content}
              </p>
            </div>
            
            <div className="p-4 pt-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleCopyPrompt(prompt.content)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button size="sm" className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                Try It
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
