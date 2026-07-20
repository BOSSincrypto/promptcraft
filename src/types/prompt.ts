export type PromptCategory = 'role-play' | 'code' | 'creative' | 'analysis' | 'general';

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  model: string;
  content: string;
  variables: PromptVariable[];
  examples: string[];
  tags: string[];
  author?: string;
  createdAt: number;
}

export interface PromptVariable {
  name: string;
  description: string;
  defaultValue?: string;
  required: boolean;
}

export interface CustomPrompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  isFavorite: boolean;
}

export interface PromptOptimization {
  original: string;
  optimized: string;
  improvements: {
    category: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
  }[];
}
