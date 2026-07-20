import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Lesson } from '../../types';
import { useProgressStore } from '../../stores';

interface ProgressTrackerProps {
  lessons: Lesson[];
  currentLesson?: Lesson;
}

export function ProgressTracker({ lessons, currentLesson }: ProgressTrackerProps) {
  const { getLessonProgress } = useProgressStore();
  
  const categoryLessons = lessons.filter(
    lesson => !currentLesson || lesson.category === currentLesson.category
  );

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3">
        {currentLesson ? 'Lesson Progress' : 'All Lessons'}
      </h3>
      
      <div className="space-y-1">
        {categoryLessons.map(lesson => {
          const progress = getLessonProgress(lesson.slug);
          const isCompleted = progress?.completed ?? false;
          const isCurrent = currentLesson?.slug === lesson.slug;
          
          return (
            <div
              key={lesson.slug}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                isCurrent ? 'bg-primary/10 text-primary' : 'text-foreground'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              
              <span className={`flex-1 ${isCurrent ? 'font-medium' : ''}`}>
                {lesson.title}
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.estimatedTime}m
                </span>
                
                {progress?.quizScore !== undefined && (
                  <Badge variant={progress.quizScore >= 80 ? 'success' : 'warning'}>
                    {progress.quizScore}%
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
