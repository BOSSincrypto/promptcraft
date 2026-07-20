# PromptCraft - Application Architecture

> Comprehensive architecture for a Prompt Engineering Education PWA
> Last updated: 2026-07-19

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Application Structure](#2-application-structure)
3. [Component Hierarchy](#3-component-hierarchy)
4. [Routing Architecture](#4-routing-architecture)
5. [Content Architecture](#5-content-architecture)
6. [Data Models](#6-data-models)
7. [PWA Implementation](#7-pwa-implementation)
8. [Performance Optimization](#8-performance-optimization)
9. [GitHub Actions Workflow](#9-github-actions-workflow)
10. [Performance Budget](#10-performance-budget)

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 19.x | UI components |
| Language | TypeScript | 5.x | Type safety |
| Bundler | Vite | 6.x | Build tooling |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| State | Zustand | 5.x | Client state management |
| Routing | React Router | 7.x | SPA navigation |
| PWA | vite-plugin-pwa | 0.21.x | Service worker, manifest |
| Testing | Vitest | 3.x | Unit/integration tests |
| UI Components | Radix UI + Custom | - | Accessible primitives |
| Icons | Lucide React | - | Icon library |
| Animation | Framer Motion | 12.x | Transitions |
| Package Manager | pnpm | 9.x | Fast, disk-efficient |

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "zustand": "^5.0.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "lucide-react": "^0.460.0",
    "framer-motion": "^12.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "~5.7.0",
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vite-plugin-pwa": "^0.21.0",
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "jsdom": "^25.0.0"
  }
}
```

---

## 2. Application Structure

### Directory Layout

```
promptcraft/
├── public/
│   ├── favicon.svg                    # App icon (SVG)
│   ├── icon-192.png                   # PWA icon 192x192
│   ├── icon-512.png                   # PWA icon 512x512
│   ├── maskable-icon-512.png          # Maskable PWA icon
│   ├── CNAME                          # Custom domain
│   ├── robots.txt                     # SEO
│   └── og-image.png                   # Social sharing
├── src/
│   ├── main.tsx                       # Entry point
│   ├── App.tsx                        # Root component with router
│   ├── index.css                      # Global styles + Tailwind
│   ├── vite-env.d.ts                  # Vite type declarations
│   │
│   ├── components/
│   │   ├── ui/                        # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── AppShell.tsx           # Main app wrapper
│   │   │   ├── Header.tsx             # Top navigation
│   │   │   ├── Sidebar.tsx            # Side navigation
│   │   │   ├── Footer.tsx             # Footer
│   │   │   ├── MobileNav.tsx          # Mobile bottom nav
│   │   │   └── OfflineIndicator.tsx   # Online/offline status
│   │   │
│   │   ├── lessons/                   # Lesson-related components
│   │   │   ├── LessonCard.tsx         # Lesson preview card
│   │   │   ├── LessonContent.tsx      # Lesson renderer
│   │   │   ├── LessonNavigation.tsx   # Prev/next navigation
│   │   │   ├── QuizWidget.tsx         # Interactive quiz
│   │   │   ├── CodeBlock.tsx          # Code example display
│   │   │   ├── PromptEditor.tsx       # Interactive prompt editor
│   │   │   └── ProgressTracker.tsx    # Course progress display
│   │   │
│   │   ├── prompts/                   # Prompt-related components
│   │   │   ├── PromptCard.tsx         # Community prompt card
│   │   │   ├── PromptGenerator.tsx    # Prompt creation tool
│   │   │   ├── PromptPreview.tsx      # Prompt preview
│   │   │   ├── PromptCategories.tsx   # Category filter
│   │   │   └── CopyButton.tsx         # Copy to clipboard
│   │   │
│   │   ├── guides/                    # Model guide components
│   │   │   ├── GuideCard.tsx          # Guide preview
│   │   │   ├── GuideContent.tsx       # Guide renderer
│   │   │   ├── ModelComparison.tsx    # Compare models
│   │   │   ├── TipSection.tsx         # Best practices
│   │   │   └── ExampleGallery.tsx     # Example prompts
│   │   │
│   │   └── community/                 # Community features
│   │       ├── ExampleFeed.tsx        # Community examples feed
│   │       ├── ExampleDetail.tsx      # Example detail view
│   │       └── ShareButton.tsx        # Share functionality
│   │
│   ├── pages/                         # Route pages
│   │   ├── Home.tsx                   # Landing/dashboard
│   │   ├── Lessons.tsx                # Lessons list
│   │   ├── LessonDetail.tsx           # Single lesson view
│   │   ├── Prompts.tsx                # Prompt templates hub
│   │   ├── PromptGenerator.tsx        # Prompt generator tool
│   │   ├── Guides.tsx                 # Model guides hub
│   │   ├── GuideDetail.tsx            # Single guide view
│   │   ├── Community.tsx              # Community examples
│   │   ├── Settings.tsx               # User settings
│   │   ├── About.tsx                  # About page
│   │   └── NotFound.tsx               # 404 page
│   │
│   ├── content/                       # Static content (Markdown)
│   │   ├── lessons/                   # Lesson content
│   │   │   ├── fundamentals/          # Beginner lessons
│   │   │   │   ├── 01-what-is-prompting.md
│   │   │   │   ├── 02-basic-structure.md
│   │   │   │   ├── 03-role-and-task.md
│   │   │   │   └── _meta.json        # Lesson metadata
│   │   │   ├── techniques/            # Intermediate lessons
│   │   │   │   ├── 01-few-shot.md
│   │   │   │   ├── 02-chain-of-thought.md
│   │   │   │   ├── 03-tree-of-thought.md
│   │   │   │   └── _meta.json
│   │   │   ├── advanced/              # Advanced lessons
│   │   │   │   ├── 01-prompt-chaining.md
│   │   │   │   ├── 02-optimization.md
│   │   │   │   └── _meta.json
│   │   │   └── model-specific/        # Per-model lessons
│   │   │       ├── gpt-4.md
│   │   │       ├── claude.md
│   │   │       ├── gemini.md
│   │   │       └── _meta.json
│   │   │
│   │   ├── guides/                    # Model-specific guides
│   │   │   ├── llms/
│   │   │   │   ├── gpt-4.md
│   │   │   │   ├── claude-3.5.md
│   │   │   │   ├── gemini-pro.md
│   │   │   │   ├── llama-3.md
│   │   │   │   └── _meta.json
│   │   │   ├── image-generators/
│   │   │   │   ├── midjourney.md
│   │   │   │   ├── dall-e-3.md
│   │   │   │   ├── stable-diffusion.md
│   │   │   │   ├── flux.md
│   │   │   │   └── _meta.json
│   │   │   ├── code-models/
│   │   │   │   ├── github-copilot.md
│   │   │   │   ├── cursor.md
│   │   │   │   ├── codestral.md
│   │   │   │   └── _meta.json
│   │   │   └── specialized/
│   │   │       ├── embedding-models.md
│   │   │       ├── audio-models.md
│   │   │       └── _meta.json
│   │   │
│   │   └── examples/                  # Community-style examples
│   │       ├── templates/             # Prompt templates
│   │       │   ├── role-play.json
│   │       │   ├── code-generation.json
│   │       │   ├── creative-writing.json
│   │       │   └── data-analysis.json
│   │       └── patterns/              # Prompting patterns
│   │           ├── chain-of-thought.json
│   │           ├── few-shot.json
│   │           └── system-prompts.json
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── useProgressStore.ts        # Learning progress
│   │   ├── useSettingsStore.ts        # User settings
│   │   ├── usePromptStore.ts          # Custom prompts
│   │   ├── useUIStore.ts             # UI state (sidebar, theme)
│   │   └── index.ts                   # Barrel export
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useLessonProgress.ts       # Track lesson completion
│   │   ├── useLocalStorage.ts         # Persistent state
│   │   ├── useOnlineStatus.ts         # Network status
│   │   ├── usePromptOptimizer.ts      # Prompt improvement logic
│   │   ├── useShare.ts               # Web Share API
│   │   └── useMediaQuery.ts          # Responsive hooks
│   │
│   ├── lib/                           # Utility functions
│   │   ├── utils.ts                   # General utilities (cn, etc.)
│   │   ├── content.ts                 # Content loading helpers
│   │   ├── prompt-optimizer.ts        # Prompt analysis engine
│   │   ├── markdown.ts               # Markdown processing
│   │   └── analytics.ts              # Privacy-friendly analytics
│   │
│   ├── types/                         # TypeScript types
│   │   ├── lesson.ts                  # Lesson types
│   │   ├── prompt.ts                  # Prompt types
│   │   ├── guide.ts                   # Guide types
│   │   ├── progress.ts               # Progress types
│   │   └── index.ts                   # Barrel export
│   │
│   └── test/                          # Test utilities
│       ├── setup.ts                   # Vitest setup
│       └── test-utils.tsx             # Custom render with providers
│
├── .github/
│   └── workflows/
│       ├── deploy.yml                 # Build & deploy to GH Pages
│       ├── ci.yml                     # PR checks (typecheck, lint, test)
│       └── content-update.yml         # Auto-update content index
│
├── index.html                         # HTML entry point
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite config
├── eslint.config.js                   # Linting rules
├── .prettierrc                        # Code formatting
├── .gitignore                         # Git ignores
└── README.md                          # Project documentation
```

---

## 3. Component Hierarchy

```
App
├── AppShell
│   ├── Header
│   │   ├── Logo
│   │   ├── DesktopNav
│   │   │   └── NavLink (Lessons | Prompts | Guides | Community)
│   │   ├── OfflineIndicator
│   │   └── UserMenu (Settings, About)
│   │
│   ├── MobileNav (fixed bottom, visible on mobile)
│   │   └── NavLink (Lessons | Prompts | Guides | Community)
│   │
│   └── <main>
│       └── <Routes>
│           ├── / (Home)
│           │   ├── HeroSection
│           │   ├── ProgressOverview
│           │   ├── FeaturedLessons
│           │   │   └── LessonCard[]
│           │   ├── QuickStartPrompts
│           │   │   └── PromptCard[]
│           │   └── RecentGuides
│           │       └── GuideCard[]
│           │
│           ├── /lessons (Lessons)
│           │   ├── LearningPathSelector
│           │   ├── LessonList
│           │   │   └── LessonCard[] (with progress indicators)
│           │   └── ProgressTracker
│           │
│           ├── /lessons/:category/:slug (LessonDetail)
│           │   ├── LessonNavigation (prev/next)
│           │   ├── LessonContent
│           │   │   ├── MarkdownRenderer
│           │   │   ├── CodeBlock[]
│           │   │   ├── PromptEditor (interactive)
│           │   │   └── QuizWidget
│           │   └── CompletionButton
│           │
│           ├── /prompts (Prompts)
│           │   ├── PromptCategories
│           │   ├── PromptGenerator
│           │   │   ├── InputSection
│           │   │   ├── OptimizerControls
│           │   │   └── OutputSection
│           │   └── PromptLibrary
│           │       └── PromptCard[]
│           │
│           ├── /guides (Guides)
│           │   ├── ModelTypeTabs (LLMs | Image | Code | Specialized)
│           │   └── GuideList
│           │       └── GuideCard[]
│           │
│           ├── /guides/:model (GuideDetail)
│           │   ├── GuideContent
│           │   ├── TipSection[]
│           │   ├── ExampleGallery
│           │   │   └── PromptCard[]
│           │   └── ModelComparison
│           │
│           ├── /community (Community)
│           │   ├── ExampleFeed
│           │   │   └── ExampleCard[]
│           │   └── ShareButton
│           │
│           ├── /settings (Settings)
│           │   ├── ThemeToggle
│           │   ├── OfflineDataManagement
│           │   ├── ProgressReset
│           │   └── ExportData
│           │
│           ├── /about (About)
│           │
│           └── * (NotFound)
│
└── ToastContainer (global toast notifications)
```

---

## 4. Routing Architecture

### Route Configuration

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Lessons = lazy(() => import('./pages/Lessons'));
const LessonDetail = lazy(() => import('./pages/LessonDetail'));
const Prompts = lazy(() => import('./pages/Prompts'));
const PromptGenerator = lazy(() => import('./pages/PromptGenerator'));
const Guides = lazy(() => import('./pages/Guides'));
const GuideDetail = lazy(() => import('./pages/GuideDetail'));
const Community = lazy(() => import('./pages/Community'));
const Settings = lazy(() => import('./pages/Settings'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Lessons */}
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:category" element={<Lessons />} />
          <Route path="/lessons/:category/:slug" element={<LessonDetail />} />
          
          {/* Prompts */}
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/generator" element={<PromptGenerator />} />
          
          {/* Guides */}
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:model" element={<GuideDetail />} />
          
          {/* Community */}
          <Route path="/community" element={<Community />} />
          
          {/* Settings & About */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Route Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Dashboard with progress overview |
| `/lessons` | Lessons | All lessons by category |
| `/lessons/:category` | Lessons | Filtered by category |
| `/lessons/:category/:slug` | LessonDetail | Individual lesson view |
| `/prompts` | Prompts | Prompt templates library |
| `/prompts/generator` | PromptGenerator | Interactive prompt builder |
| `/guides` | Guides | Model guides hub |
| `/guides/:model` | GuideDetail | Specific model guide |
| `/community` | Community | Community examples |
| `/settings` | Settings | User preferences |
| `/about` | About | About the app |

---

## 5. Content Architecture

### Content Organization

Content is stored as **Markdown files** with JSON metadata, organized in a hierarchical structure that supports both static generation and runtime loading.

### Content Loading Strategy

```typescript
// src/lib/content.ts
import type { Lesson, LessonCategory, Guide, PromptTemplate } from '../types';

// Content manifests (generated at build time or loaded statically)
import lessonsManifest from '../content/lessons/manifest.json';
import guidesManifest from '../content/guides/manifest.json';
import promptsManifest from '../content/examples/templates/manifest.json';

// Get all lessons for a category
export async function getLessonsByCategory(
  category: LessonCategory
): Promise<Lesson[]> {
  const categoryData = lessonsManifest.categories[category];
  return Promise.all(
    categoryData.lessons.map(async (slug) => {
      const content = await import(
        `../content/lessons/${category}/${slug}.md?raw`
      );
      return {
        ...categoryData.meta,
        slug,
        content: content.default,
      };
    })
  );
}

// Get a single lesson by slug
export async function getLesson(
  category: string,
  slug: string
): Promise<Lesson | null> {
  try {
    const content = await import(
      `../content/lessons/${category}/${slug}.md?raw`
    );
    const meta = await import(
      `../content/lessons/${category}/${slug}.meta.json`
    );
    return {
      category,
      slug,
      content: content.default,
      ...meta.default,
    };
  } catch {
    return null;
  }
}

// Get all guides for a model type
export async function getGuidesByType(
  modelType: 'llm' | 'image' | 'code' | 'specialized'
): Promise<Guide[]> {
  const guides = guidesManifest[modelType] || [];
  return Promise.all(
    guides.map(async (slug) => {
      const content = await import(
        `../content/guides/${modelType}/${slug}.md?raw`
      );
      return {
        modelType,
        slug,
        content: content.default,
      };
    })
  );
}

// Get prompt templates by category
export async function getPromptTemplates(
  category?: string
): Promise<PromptTemplate[]> {
  const templates = promptsManifest.templates;
  if (category) {
    return templates.filter((t) => t.category === category);
  }
  return templates;
}
```

### Content Manifest Structure

```json
// src/content/lessons/manifest.json
{
  "categories": {
    "fundamentals": {
      "title": "Fundamentals",
      "description": "Learn the basics of prompt engineering",
      "order": 1,
      "icon": "BookOpen",
      "color": "blue",
      "lessons": [
        "01-what-is-prompting",
        "02-basic-structure",
        "03-role-and-task"
      ]
    },
    "techniques": {
      "title": "Advanced Techniques",
      "description": "Master advanced prompting strategies",
      "order": 2,
      "icon": "Lightbulb",
      "color": "purple",
      "lessons": [
        "01-few-shot",
        "02-chain-of-thought",
        "03-tree-of-thought"
      ]
    },
    "advanced": {
      "title": "Expert Level",
      "description": "Expert-level prompt engineering",
      "order": 3,
      "icon": "Rocket",
      "color": "green",
      "lessons": [
        "01-prompt-chaining",
        "02-optimization"
      ]
    },
    "model-specific": {
      "title": "Model-Specific",
      "description": "Optimize prompts for specific models",
      "order": 4,
      "icon": "Cpu",
      "color": "orange",
      "lessons": [
        "gpt-4",
        "claude",
        "gemini"
      ]
    }
  }
}
```

### Markdown Content Structure

```markdown
---
title: "Chain of Thought Prompting"
description: "Learn how to guide AI through step-by-step reasoning"
category: techniques
difficulty: intermediate
estimatedTime: 15
order: 2
tags: ["reasoning", "logic", "chain-of-thought"]
prerequisites: ["fundamentals/01-what-is-prompting"]
---

# Chain of Thought Prompting

Chain of Thought (CoT) prompting encourages AI models to show their reasoning process...

## Key Concepts

### Why CoT Works

[Content continues...]

## Interactive Example

<TryPrompt
  initialPrompt="Calculate 15% of 230"
  hint="Add 'Show your work step by step' to see CoT in action"
/>

## Quiz

<Quiz
  question="What does CoT prompting primarily improve?"
  options={[
    "Response speed",
    "Accuracy on complex reasoning tasks",
    "Token efficiency",
    "Model selection"
  ]}
  correct={1}
/>
```

---

## 6. Data Models

### Core Types

```typescript
// src/types/lesson.ts

export type LessonCategory = 'fundamentals' | 'techniques' | 'advanced' | 'model-specific';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonMeta {
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedTime: number; // minutes
  order: number;
  tags: string[];
  prerequisites?: string[]; // slugs of required lessons
}

export interface Lesson extends LessonMeta {
  slug: string;
  content: string; // Markdown content
}

export interface LessonProgress {
  slug: string;
  category: LessonCategory;
  completed: boolean;
  completedAt?: number; // timestamp
  quizScore?: number; // 0-100
  lastVisited?: number; // timestamp
}

// src/types/prompt.ts

export type PromptCategory = 'role-play' | 'code' | 'creative' | 'analysis' | 'general';

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  model: string; // target model
  content: string; // The prompt text
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

// src/types/guide.ts

export type ModelType = 'llm' | 'image' | 'code' | 'specialized';
export type ModelSlug = string; // e.g., 'gpt-4', 'claude-3.5', 'midjourney'

export interface GuideMeta {
  title: string;
  description: string;
  modelType: ModelType;
  modelSlug: ModelSlug;
  version?: string;
  lastUpdated: number;
  icon: string; // Icon name from Lucide
  color: string;
}

export interface Guide extends GuideMeta {
  content: string; // Markdown content
  tips: GuideTip[];
  examples: PromptExample[];
  comparisons?: ModelComparison[];
}

export interface GuideTip {
  title: string;
  content: string;
  category: 'best-practice' | 'warning' | 'tip';
}

export interface PromptExample {
  title: string;
  description: string;
  prompt: string;
  expectedOutput?: string;
  model: ModelSlug;
}

export interface ModelComparison {
  modelA: ModelSlug;
  modelB: ModelSlug;
  criteria: {
    name: string;
    scoreA: number;
    scoreB: number;
  }[];
}

// src/types/progress.ts

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  completedCategories: LessonCategory[];
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  averageQuizScore: number;
  streakDays: number;
  lastActiveDate: string; // ISO date string
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress: number; // 0-100
  target: number;
}

export interface UserStats {
  lessonsCompleted: number;
  quizzesCompleted: number;
  averageScore: number;
  timeSpent: number; // minutes
  promptsCreated: number;
  streakDays: number;
}

// src/types/index.ts
export * from './lesson';
export * from './prompt';
export * from './guide';
export * from './progress';
```

### Zustand Store Implementation

```typescript
// src/stores/useProgressStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonProgress, UserProgress, Achievement } from '../types';

interface ProgressState {
  // State
  lessons: Record<string, LessonProgress>;
  achievements: Achievement[];
  
  // Actions
  markLessonComplete: (slug: string, category: string, quizScore?: number) => void;
  updateLessonProgress: (slug: string, updates: Partial<LessonProgress>) => void;
  getLessonProgress: (slug: string) => LessonProgress | undefined;
  getCompletionPercentage: (category: string, totalLessons: number) => number;
  resetProgress: () => void;
  
  // Computed
  getTotalCompleted: () => number;
  getStreakDays: () => number;
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
              category: category as any,
              completed: true,
              completedAt: Date.now(),
              quizScore,
              lastVisited: Date.now(),
            },
          },
        })),
      
      updateLessonProgress: (slug, updates) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [slug]: {
              ...state.lessons[slug],
              ...updates,
              lastVisited: Date.now(),
            },
          },
        })),
      
      getLessonProgress: (slug) => get().lessons[slug],
      
      getCompletionPercentage: (category, totalLessons) => {
        const lessons = get().lessons;
        const completed = Object.values(lessons).filter(
          (l) => l.category === category && l.completed
        ).length;
        return Math.round((completed / totalLessons) * 100);
      },
      
      resetProgress: () => set({ lessons: {}, achievements: [] }),
      
      getTotalCompleted: () =>
        Object.values(get().lessons).filter((l) => l.completed).length,
      
      getStreakDays: () => {
        // Streak calculation logic
        const lessons = Object.values(get().lessons);
        if (lessons.length === 0) return 0;
        
        const dates = lessons
          .filter((l) => l.lastVisited)
          .map((l) => new Date(l.lastVisited!).toDateString())
          .filter((d, i, a) => a.indexOf(d) === i)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        
        let streak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
          const current = new Date(dates[i]);
          const prev = new Date(dates[i + 1]);
          const diffDays = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
        return streak;
      },
    }),
    {
      name: 'promptcraft-progress',
      version: 1,
    }
  )
);

// src/stores/usePromptStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CustomPrompt } from '../types';

interface PromptState {
  prompts: CustomPrompt[];
  addPrompt: (prompt: Omit<CustomPrompt, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePrompt: (id: string, updates: Partial<CustomPrompt>) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getPromptsByCategory: (category: string) => CustomPrompt[];
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
```

---

## 7. PWA Implementation

### Vite PWA Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/', // Custom domain, not subpath
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt', // Show update prompt
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'PromptCraft - Learn Prompt Engineering',
        short_name: 'PromptCraft',
        description: 'Interactive platform to master prompt engineering',
        theme_color: '#6366f1', // Indigo
        background_color: '#0f172a', // Slate 900
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            // Cache content at runtime (dynamic imports)
            urlPattern: /^https:\/\/.*\.promptcraft\.bossincrypto\.dev\/assets\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'promptcraft-content',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Cache images
            urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'promptcraft-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // Disable in dev for faster iteration
      },
    }),
  ],
  
  // Manual chunk splitting for better caching
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React (stable, rarely changes)
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI libraries (medium stability)
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', 'framer-motion'],
          // Utilities (high stability)
          utils: ['clsx', 'tailwind-merge'],
        },
      },
    },
  },
});
```

### Service Worker Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    PWA Caching Strategy                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pre-cache (on install)                               │   │
│  │  • App shell (HTML, CSS, JS)                          │   │
│  │  • Static assets (icons, fonts)                       │   │
│  │  • Core lesson content (fundamentals)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Runtime cache (on demand)                            │   │
│  │  • Dynamic content (other lessons, guides)            │   │
│  │  • User-generated data (prompts, progress)            │   │
│  │  • Images and media                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  IndexedDB (persistent storage)                       │   │
│  │  • All lesson content                                 │   │
│  │  • User progress and settings                         │   │
│  │  • Custom prompts                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Offline Storage Implementation

```typescript
// src/lib/offline-storage.ts
const DB_NAME = 'promptcraft-db';
const DB_VERSION = 1;

const STORES = {
  CONTENT: 'content',
  PROGRESS: 'progress',
  PROMPTS: 'prompts',
  SETTINGS: 'settings',
} as const;

class OfflineStorage {
  private db: IDBDatabase | null = null;
  
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Content store
        if (!db.objectStoreNames.contains(STORES.CONTENT)) {
          const contentStore = db.createObjectStore(STORES.CONTENT, { keyPath: 'id' });
          contentStore.createIndex('category', 'category', { unique: false });
          contentStore.createIndex('type', 'type', { unique: false });
        }
        
        // Progress store
        if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
          db.createObjectStore(STORES.PROGRESS, { keyPath: 'slug' });
        }
        
        // Custom prompts store
        if (!db.objectStoreNames.contains(STORES.PROMPTS)) {
          const promptsStore = db.createObjectStore(STORES.PROMPTS, { keyPath: 'id' });
          promptsStore.createIndex('category', 'category', { unique: false });
        }
        
        // Settings store
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
        }
      };
    });
  }
  
  async cacheContent(content: any[]): Promise<void> {
    if (!this.db) return;
    
    const transaction = this.db.transaction(STORES.CONTENT, 'readwrite');
    const store = transaction.objectStore(STORES.CONTENT);
    
    for (const item of content) {
      await new Promise<void>((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }
  
  async getContent(category?: string): Promise<any[]> {
    if (!this.db) return [];
    
    const transaction = this.db.transaction(STORES.CONTENT, 'readonly');
    const store = transaction.objectStore(STORES.CONTENT);
    
    if (category) {
      const index = store.index('category');
      return new Promise((resolve, reject) => {
        const request = index.getAll(category);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async saveProgress(slug: string, progress: any): Promise<void> {
    if (!this.db) return;
    
    const transaction = this.db.transaction(STORES.PROGRESS, 'readwrite');
    const store = transaction.objectStore(STORES.PROGRESS);
    
    return new Promise((resolve, reject) => {
      const request = store.put({ slug, ...progress, updatedAt: Date.now() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getProgress(slug: string): Promise<any | null> {
    if (!this.db) return null;
    
    const transaction = this.db.transaction(STORES.PROGRESS, 'readonly');
    const store = transaction.objectStore(STORES.PROGRESS);
    
    return new Promise((resolve, reject) => {
      const request = store.get(slug);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }
  
  // Sync IndexedDB with Zustand store on app start
  async syncFromStorage(): Promise<void> {
    const progress = await this.getAllProgress();
    // Update Zustand store
    const store = useProgressStore.getState();
    for (const p of progress) {
      store.updateLessonProgress(p.slug, p);
    }
  }
  
  // Sync Zustand store back to IndexedDB periodically
  async syncToStorage(): Promise<void> {
    const lessons = useProgressStore.getState().lessons;
    for (const [slug, progress] of Object.entries(lessons)) {
      await this.saveProgress(slug, progress);
    }
  }
  
  private async getAllProgress(): Promise<any[]> {
    if (!this.db) return [];
    
    const transaction = this.db.transaction(STORES.PROGRESS, 'readonly');
    const store = transaction.objectStore(STORES.PROGRESS);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineStorage = new OfflineStorage();

// Initialize on app start
export async function initializeOfflineStorage(): Promise<void> {
  await offlineStorage.init();
  await offlineStorage.syncFromStorage();
  
  // Sync to IndexedDB every 30 seconds
  setInterval(() => {
    offlineStorage.syncToStorage();
  }, 30000);
}
```

---

## 8. Performance Optimization

### Bundle Splitting Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Bundle Splitting Plan                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  First Load (Critical Path):                                │
│  ├── index.html                                            │
│  ├── vendor.js     (React, React DOM, Router) ~45KB gzip   │
│  ├── app.js        (App shell, layout) ~15KB gzip          │
│  └── styles.css    (Tailwind base) ~12KB gzip              │
│                                                              │
│  Page Chunks (Lazy-loaded):                                 │
│  ├── Home.chunk.js        ~8KB gzip                        │
│  ├── Lessons.chunk.js     ~10KB gzip                       │
│  ├── LessonDetail.chunk.js ~15KB gzip (includes Markdown)  │
│  ├── Prompts.chunk.js     ~12KB gzip                       │
│  ├── Guide.chunk.js       ~8KB gzip                        │
│  ├── Community.chunk.js   ~6KB gzip                        │
│  └── Settings.chunk.js    ~4KB gzip                        │
│                                                              │
│  UI Library Chunks:                                        │
│  ├── ui-radix.chunk.js    ~25KB gzip                       │
│  ├── ui-motion.chunk.js   ~15KB gzip                       │
│  └── utils.chunk.js       ~3KB gzip                        │
│                                                              │
│  Content Chunks (dynamic):                                 │
│  └── Content loaded on-demand via dynamic import           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Performance Optimization Checklist

```typescript
// 1. React.memo for expensive components
export const LessonCard = React.memo(function LessonCard({
  lesson,
  progress,
  onClick,
}: LessonCardProps) {
  // Component logic
});

// 2. useMemo for expensive computations
const sortedLessons = useMemo(() => {
  return lessons
    .filter((l) => l.category === selectedCategory)
    .sort((a, b) => a.order - b.order);
}, [lessons, selectedCategory]);

// 3. useCallback for event handlers
const handleLessonClick = useCallback((slug: string) => {
  navigate(`/lessons/${slug}`);
}, [navigate]);

// 4. Virtual scrolling for large lists
import { useVirtualizer } from '@tanstack/react-virtual';

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: lessons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <LessonCard lesson={lessons[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Image optimization
import { lazy, Suspense } from 'react';

const LazyImage = lazy(() => import('./LazyImage'));

function LazyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Suspense fallback={<div className="bg-muted animate-pulse" />}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </Suspense>
  );
}

// 6. Code splitting at component level
const PromptEditor = lazy(() => import('./PromptEditor'));

// 7. Prefetching on hover
function GuideCard({ guide }: { guide: Guide }) {
  const prefetch = useCallback(() => {
    // Trigger dynamic import preload
    import(`./pages/GuideDetail`);
  }, []);
  
  return (
    <Card onMouseEnter={prefetch}>
      {/* Card content */}
    </Card>
  );
}
```

### Asset Optimization

```typescript
// Image processing pipeline
// Build time: convert images to WebP with fallbacks
// src/lib/image-optimization.ts

export function getImageUrl(
  path: string,
  width: number,
  quality: number = 80
): string {
  // For Vite, use the ?url suffix or import
  // In production, images should be pre-optimized
  return new URL(`../assets/${path}`, import.meta.url).href;
}

// Font optimization
// Use system fonts with fallbacks
const fontStack = [
  'Inter', // Primary
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'sans-serif',
].join(', ');

// Critical CSS inlining
// Vite handles this automatically with built-in CSS code splitting
```

---

## 9. GitHub Actions Workflow

### Main Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Generate content manifest
        run: pnpm generate-manifest

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

  post-deploy:
    runs-on: ubuntu-latest
    needs: deploy
    steps:
      - name: Purge Cloudflare cache (if using)
        run: |
          echo "Cache purged after deployment"
```

### CI Workflow for Pull Requests

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: ['main']

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Analyze bundle size
        run: pnpm analyze
```

### Content Update Workflow

```yaml
# .github/workflows/content-update.yml
name: Update Content Index

on:
  push:
    branches: ['main']
    paths:
      - 'src/content/**'
  workflow_dispatch:

jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate content manifests
        run: pnpm generate-manifest

      - name: Commit manifests if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/content/**/manifest.json
          if [ -n "$(git status --porcelain)" ]; then
            git commit -m "chore: update content manifests [skip ci]"
            git push
          fi
```

---

## 10. Performance Budget

### Target Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| First Contentful Paint (FCP) | < 1.5s | Core web vital |
| Largest Contentful Paint (LCP) | < 2.5s | Core web vital |
| Total Blocking Time (TBT) | < 200ms | Core web vital |
| Cumulative Layout Shift (CLS) | < 0.1 | Core web vital |
| Time to Interactive (TTI) | < 3.5s | Performance metric |
| First Input Delay (FID) | < 100ms | Core web vital |

### Bundle Size Budget

| Bundle | Budget | Current Est. |
|--------|--------|--------------|
| Total JS (gzipped) | < 150KB | ~120KB |
| Total CSS (gzipped) | < 30KB | ~12KB |
| Total Images | < 500KB | varies |
| Initial load | < 200KB | ~170KB |
| Largest chunk | < 50KB | ~25KB |

### Build Configuration

```typescript
// vite.config.ts - Build analysis
export default defineConfig({
  build: {
    target: 'es2022',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router';
            if (id.includes('radix')) return 'ui';
            if (id.includes('framer-motion')) return 'motion';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  // Bundle analyzer for development
  ...(process.env.ANALYZE && {
    plugins: [
      visualizer({
        open: true,
        gzipSize: true,
        filename: 'dist/stats.html',
      }),
    ],
  }),
});
```

### Scripts in package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview --port 4173",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "analyze": "ANALYZE=true vite build",
    "generate-manifest": "node scripts/generate-content-manifest.js",
    "predeploy": "pnpm generate-manifest"
  }
}
```

---

## Appendix A: Environment Variables

```env
# .env.example
VITE_APP_VERSION=$npm_package_version
VITE_APP_NAME=PromptCraft

# Optional: Analytics (privacy-friendly)
VITE_ANALYTICS_ID=your-analytics-id

# Optional: API endpoints (for future features)
VITE_API_URL=https://api.promptcraft.bossincrypto.dev
```

---

## Appendix B: Deployment Checklist

- [ ] Custom domain configured: `promptcraft.bossincrypto.dev`
- [ ] GitHub Pages enabled for repository
- [ ] CNAME file in public/ directory
- [ ] SSL certificate provisioned (automatic via GitHub Pages)
- [ ] PWA icons generated (192x192, 512x512, maskable)
- [ ] manifest.json configured with correct URLs
- [ ] Service worker registered and tested offline
- [ ] Open Graph image created for social sharing
- [ ] robots.txt and sitemap.xml configured
- [ ] Performance budget enforced via CI
- [ ] Lighthouse score > 90 for all metrics
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari)
- [ ] Accessibility audit passed (WCAG 2.1 AA)

---

## Appendix C: Future Considerations

1. **API Integration**: Backend for user accounts, cloud sync
2. **Interactive Playground**: Live prompt testing against real models
3. **Gamification**: Badges, leaderboards, challenges
4. **Multi-language Support**: i18n for non-English users
5. **Dark/Light Theme**: System preference detection + manual toggle
6. **Content Management**: Headless CMS for non-technical content updates
7. **Analytics**: Privacy-friendly usage tracking
8. **Accessibility**: Screen reader optimization, keyboard navigation
