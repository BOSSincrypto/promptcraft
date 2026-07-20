import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CustomPrompt, PromptCategory } from '../types';

interface PromptState {
  prompts: CustomPrompt[];
  addPrompt: (prompt: Omit<CustomPrompt, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePrompt: (id: string, updates: Partial<CustomPrompt>) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getPromptsByCategory: (category: PromptCategory) => CustomPrompt[];
  exportPrompts: () => string;
  importPrompts: (json: string) => void;
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      prompts: [],
      
      addPrompt: (promptData) => {
        const id = crypto.randomUUID();
        const now = Date.now();
        set((state) => ({
          prompts: [
            ...state.prompts,
            {
              ...promptData,
              id,
              createdAt: now,
              updatedAt: now,
            },
          ],
        }));
        return id;
      },
      
      updatePrompt: (id, updates) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
          ),
        })),
      
      deletePrompt: (id) =>
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
        })),
      
      toggleFavorite: (id) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        })),
      
      getPromptsByCategory: (category) =>
        get().prompts.filter((p) => p.category === category),
      
      exportPrompts: () => JSON.stringify(get().prompts, null, 2),
      
      importPrompts: (json) => {
        try {
          const imported = JSON.parse(json) as CustomPrompt[];
          set((state) => ({
            prompts: [...state.prompts, ...imported],
          }));
        } catch (e) {
          console.error('Failed to import prompts:', e);
        }
      },
    }),
    {
      name: 'promptcraft-prompts',
      version: 1,
    }
  )
);
