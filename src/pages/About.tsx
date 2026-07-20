import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpen, Heart, Sparkles, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">PromptCraft</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interactive platform to master prompt engineering for AI models
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Interactive Learning</h2>
          </div>
          <p className="text-muted-foreground">
            Learn through hands-on lessons, quizzes, and real-world examples. 
            Master prompt engineering techniques from fundamentals to advanced strategies.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Prompt Tools</h2>
          </div>
          <p className="text-muted-foreground">
            Generate, optimize, and test prompts with our interactive tools. 
            Create effective prompts for any AI model or use case.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Model Guides</h2>
          </div>
          <p className="text-muted-foreground">
            Comprehensive guides for GPT-4, Claude, Gemini, Midjourney, and more. 
            Learn model-specific best practices and techniques.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Offline First</h2>
          </div>
          <p className="text-muted-foreground">
            Learn anywhere with full offline support. Your progress syncs automatically 
            when you're back online. Install as a PWA for the best experience.
          </p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium">Frontend</p>
            <p className="text-muted-foreground">React 19 + TypeScript</p>
          </div>
          <div>
            <p className="font-medium">Styling</p>
            <p className="text-muted-foreground">Tailwind CSS 4</p>
          </div>
          <div>
            <p className="font-medium">State</p>
            <p className="text-muted-foreground">Zustand 5</p>
          </div>
          <div>
            <p className="font-medium">Build</p>
            <p className="text-muted-foreground">Vite 6</p>
          </div>
          <div>
            <p className="font-medium">PWA</p>
            <p className="text-muted-foreground">Workbox</p>
          </div>
          <div>
            <p className="font-medium">Routing</p>
            <p className="text-muted-foreground">React Router 7</p>
          </div>
          <div>
            <p className="font-medium">Icons</p>
            <p className="text-muted-foreground">Lucide React</p>
          </div>
          <div>
            <p className="font-medium">Animation</p>
            <p className="text-muted-foreground">Framer Motion</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Structured learning path from beginner to advanced
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Interactive quizzes with immediate feedback
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Prompt generator with variable inputs
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Model-specific guides and best practices
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Community examples and prompt templates
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Progress tracking with persistence
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Full offline support with service worker
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            PWA installation for native app experience
          </li>
        </ul>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Built with <Heart className="inline h-4 w-4 text-red-500" /> by the PromptCraft Team
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/lessons">
            <Button>Start Learning</Button>
          </Link>
          <Link to="/prompts">
            <Button variant="outline">Browse Prompts</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
