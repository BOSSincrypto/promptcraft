import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonProgress, Achievement } from '../types';

interface ProgressState {
  lessons: Record<string, LessonProgress>;
  achievements: Achievement[];
  
  markLessonComplete: (slug: string, category: string, quizScore?: number) => void;
  updateLessonProgress: (slug: string, updates: Partial<LessonProgress>) => void;
  getLessonProgress: (slug: string) => LessonProgress | undefined;
  getCompletionPercentage: (category: string, totalLessons: number) => number;
  resetProgress: () => void;
  
  getTotalCompleted: () => number;
  getStreakDays: () => number;
  getAverageQuizScore: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},
      achievements: [],
      
      markLessonComplete: (slug, category, quizScore) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [slug]: {
              slug,
              category: category as LessonProgress['category'],
              completed: true,
              completedAt: Date.now(),
              quizScore,
              lastVisited: Date.now(),
            },
          },
        })),
      
      updateLessonProgress: (slug, updates) =>
        set((state) => {
          const existing = state.lessons[slug];
          if (!existing) return state;
          return {
            lessons: {
              ...state.lessons,
              [slug]: {
                ...existing,
                ...updates,
                lastVisited: Date.now(),
              },
            },
          };
        }),
      
      getLessonProgress: (slug) => get().lessons[slug],
      
      getCompletionPercentage: (category, totalLessons) => {
        const lessons = get().lessons;
        const completed = Object.values(lessons).filter(
          (l) => l.category === category && l.completed
        ).length;
        return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
      },
      
      resetProgress: () => set({ lessons: {}, achievements: [] }),
      
      getTotalCompleted: () =>
        Object.values(get().lessons).filter((l) => l.completed).length,
      
      getStreakDays: () => {
        const lessons = Object.values(get().lessons);
        if (lessons.length === 0) return 0;
        
        const dates = lessons
          .filter((l) => l.lastVisited)
          .map((l) => new Date(l.lastVisited!).toDateString())
          .filter((d, i, a) => a.indexOf(d) === i)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        
        let streak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
          const current = new Date(dates[i]!);
          const prev = new Date(dates[i + 1]!);
          const diffDays = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
        return streak;
      },

      getAverageQuizScore: () => {
        const lessons = Object.values(get().lessons);
        const withScore = lessons.filter((l) => l.quizScore !== undefined);
        if (withScore.length === 0) return 0;
        const total = withScore.reduce((sum, l) => sum + (l.quizScore ?? 0), 0);
        return Math.round(total / withScore.length);
      },
    }),
    {
      name: 'promptcraft-progress',
      version: 1,
    }
  )
);
