import { PromptCard } from './PromptCard';
import type { PromptTemplate } from '../../types';

interface PromptLibraryProps {
  templates: PromptTemplate[];
  onCopy?: (content: string) => void;
}

export function PromptLibrary({ templates, onCopy }: PromptLibraryProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-12 h-12 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium">No templates found</h3>
        <p className="mt-2 text-muted-foreground">Try selecting a different category or create your own prompt.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <PromptCard
          key={template.id}
          template={template}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}
