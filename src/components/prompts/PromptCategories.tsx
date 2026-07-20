import type { PromptCategory } from '../../types';

interface PromptCategoriesProps {
  categories: Record<string, { title: string; description: string; icon: string; color: string }>;
  selectedCategory: PromptCategory | null;
  onSelectCategory: (category: PromptCategory | null) => void;
}

export function PromptCategories({ categories, selectedCategory, onSelectCategory }: PromptCategoriesProps) {
  const categoryEntries = Object.entries(categories) as [PromptCategory, { title: string; description: string; icon: string; color: string }][];
  
  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "transition-all duration-200";
    if (isSelected) {
      switch (color) {
        case 'purple': return `${baseClasses} bg-purple-100 border-purple-500 text-purple-700`;
        case 'blue': return `${baseClasses} bg-blue-100 border-blue-500 text-blue-700`;
        case 'pink': return `${baseClasses} bg-pink-100 border-pink-500 text-pink-700`;
        case 'green': return `${baseClasses} bg-green-100 border-green-500 text-green-700`;
        case 'orange': return `${baseClasses} bg-orange-100 border-orange-500 text-orange-700`;
        default: return `${baseClasses} bg-gray-100 border-gray-500 text-gray-700`;
      }
    }
    return `${baseClasses} bg-card border-border hover:border-muted-foreground/50`;
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-500';
      case 'blue': return 'text-blue-500';
      case 'pink': return 'text-pink-500';
      case 'green': return 'text-green-500';
      case 'orange': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* All categories button */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`p-4 rounded-lg border text-left ${getColorClasses('gray', selectedCategory === null)}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <svg className={`w-5 h-5 ${selectedCategory === null ? 'text-gray-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="font-medium">All</span>
        </div>
        <p className="text-sm text-muted-foreground">Browse all templates</p>
      </button>

      {/* Category buttons */}
      {categoryEntries.map(([category, data]) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`p-4 rounded-lg border text-left ${getColorClasses(data.color, selectedCategory === category)}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className={`w-5 h-5 ${getIconColor(data.color)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {data.icon === 'User' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              )}
              {data.icon === 'Code' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              )}
              {data.icon === 'Sparkles' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              )}
              {data.icon === 'BarChart3' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              )}
              {data.icon === 'Lightbulb' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              )}
            </svg>
            <span className="font-medium">{data.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </button>
      ))}
    </div>
  );
}
