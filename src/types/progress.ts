import type { LessonCategory, LessonProgress } from './lesson';

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  completedCategories: LessonCategory[];
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  averageQuizScore: number;
  streakDays: number;
  lastActiveDate: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress: number;
  target: number;
}

export interface UserStats {
  lessonsCompleted: number;
  quizzesCompleted: number;
  averageScore: number;
  timeSpent: number;
  promptsCreated: number;
  streakDays: number;
}
