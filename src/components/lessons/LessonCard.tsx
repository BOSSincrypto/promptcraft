import { Link } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Lesson, Difficulty } from '../../types';
import { useProgressStore } from '../../stores';

interface LessonCardProps {
  lesson: Lesson;
  showProgress?: boolean;
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

export function LessonCard({ lesson, showProgress = true }: LessonCardProps) {
  const { getLessonProgress } = useProgressStore();
  const progress = getLessonProgress(lesson.slug);
  const isCompleted = progress?.completed ?? false;

  return (
    <Link to={`/lessons/${lesson.category}/${lesson.slug}`}>
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
            {showProgress && isCompleted && (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            )}
          </div>
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="mt-auto">
          <div className="flex items-center text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4 mr-2" />
            {isCompleted ? 'Review Lesson' : 'Start Lesson'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
