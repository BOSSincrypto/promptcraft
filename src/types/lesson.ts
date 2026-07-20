export type LessonCategory = 'fundamentals' | 'techniques' | 'advanced' | 'model-specific';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonMeta {
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedTime: number;
  order: number;
  tags: string[];
  prerequisites?: string[];
}

export interface Lesson extends LessonMeta {
  slug: string;
  content: string;
}

export interface LessonProgress {
  slug: string;
  category: LessonCategory;
  completed: boolean;
  completedAt?: number;
  quizScore?: number;
  lastVisited?: number;
}
