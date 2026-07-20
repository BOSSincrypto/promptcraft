import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { PromptExample } from '../../types';

interface ExampleGalleryProps {
  examples: PromptExample[];
}

export function ExampleGallery({ examples }: ExampleGalleryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  if (examples.length === 0) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Example Prompts</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {examples.map((example, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{example.title}</CardTitle>
                <Badge variant="outline">{example.model}</Badge>
              </div>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                  <code>{example.prompt}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(example.prompt, index)}
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {example.expectedOutput && (
                <div>
                  <p className="text-sm font-medium mb-1">Expected Output:</p>
                  <pre className="bg-muted/50 p-3 rounded-lg text-sm overflow-x-auto">
                    <code>{example.expectedOutput}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
