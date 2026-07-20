import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { LessonCategory, Difficulty } from '../../types';

interface FeaturedLesson {
  slug: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedTime: number;
}

const featuredLessons: FeaturedLesson[] = [
  {
    slug: '01-what-is-prompting',
    title: 'What is Prompting?',
    description: 'Learn the fundamentals of prompt engineering and why it matters.',
    category: 'fundamentals',
    difficulty: 'beginner',
    estimatedTime: 10,
  },
  {
    slug: '02-chain-of-thought',
    title: 'Chain of Thought Prompting',
    description: 'Guide AI through step-by-step reasoning for better results.',
    category: 'techniques',
    difficulty: 'intermediate',
    estimatedTime: 15,
  },
  {
    slug: '03-few-shot',
    title: 'Few-Shot Learning',
    description: 'Teach AI with examples for improved task performance.',
    category: 'techniques',
    difficulty: 'intermediate',
    estimatedTime: 12,
  },
];

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

export function FeaturedLessons() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Lessons</h2>
          <p className="text-muted-foreground">Start your learning journey</p>
        </div>
        <Link to="/lessons">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredLessons.map((lesson) => (
          <Link key={lesson.slug} to={`/lessons/${lesson.category}/${lesson.slug}`}>
            <Card hover className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={difficultyColors[lesson.difficulty]}>
                    {lesson.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.estimatedTime} min
                  </span>
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="mt-auto">
                <div className="flex items-center text-primary text-sm font-medium">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Lesson
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
