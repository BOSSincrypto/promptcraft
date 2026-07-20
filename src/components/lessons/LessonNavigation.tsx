import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Lesson } from '../../types';

interface LessonNavigationProps {
  prevLesson?: Lesson | null;
  nextLesson?: Lesson | null;
}

export function LessonNavigation({ prevLesson, nextLesson }: LessonNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
      {prevLesson ? (
        <Link to={`/lessons/${prevLesson.category}/${prevLesson.slug}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-medium">{prevLesson.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}
      
      {nextLesson ? (
        <Link to={`/lessons/${nextLesson.category}/${nextLesson.slug}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-medium">{nextLesson.title}</div>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
