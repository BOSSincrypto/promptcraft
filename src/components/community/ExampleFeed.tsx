import { ExampleCard } from './ExampleCard';
import type { CommunityExample } from '../../types';

interface ExampleFeedProps {
  examples: CommunityExample[];
  onCopy?: (content: string) => void;
}

export function ExampleFeed({ examples, onCopy }: ExampleFeedProps) {
  if (examples.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-muted-foreground">No examples found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {examples.map((example) => (
        <ExampleCard
          key={example.id}
          example={example}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}
