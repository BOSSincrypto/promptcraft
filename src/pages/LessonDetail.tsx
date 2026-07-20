import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { AppShell } from '../components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LessonContent } from '../components/lessons/LessonContent';
import { LessonNavigation } from '../components/lessons/LessonNavigation';
import { ProgressTracker } from '../components/lessons/ProgressTracker';
import { getLesson, getLessonsByCategory } from '../lib/content';
import { useProgressStore } from '../stores';
import type { Lesson, Difficulty, LessonCategory } from '../types';

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

export function LessonDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  
  const { markLessonComplete, getLessonProgress } = useProgressStore();
  const progress = getLessonProgress(slug || '');

  useEffect(() => {
    async function loadLesson() {
      if (!category || !slug) return;
      
      setLoading(true);
      try {
        const loadedLesson = await getLesson(category, slug);
        setLesson(loadedLesson);
        
        // Load all lessons for navigation
        const categoryLessons = await getLessonsByCategory(category as LessonCategory);
        const currentIndex = categoryLessons.findIndex(l => l.slug === slug);
        
        if (currentIndex > 0 && categoryLessons[currentIndex - 1]) {
          setPrevLesson(categoryLessons[currentIndex - 1]!);
        } else {
          setPrevLesson(null);
        }
        
        if (currentIndex < categoryLessons.length - 1 && categoryLessons[currentIndex + 1]) {
          setNextLesson(categoryLessons[currentIndex + 1]!);
        } else {
          setNextLesson(null);
        }
      } catch (error) {
        console.error('Failed to load lesson:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLesson();
  }, [category, slug]);

  const handleMarkComplete = () => {
    if (category && slug) {
      markLessonComplete(slug, category, quizScore || undefined);
    }
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    setQuizScore(isCorrect ? 100 : 0);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-muted rounded w-full animate-pulse" />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  if (!lesson) {
    return (
      <AppShell>
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
          <p className="text-muted-foreground mb-4">
            The lesson you're looking for doesn't exist.
          </p>
          <Link to="/lessons">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
          </Link>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              to="/lessons"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Lessons
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link
              to={`/lessons/${category}`}
              className="text-muted-foreground hover:text-foreground transition-colors capitalize"
            >
              {category}
            </Link>
          </div>

          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={difficultyColors[lesson.difficulty]}>
                {lesson.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.estimatedTime} min read
              </span>
              {progress?.completed && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-muted-foreground text-lg">{lesson.description}</p>
          </div>

          {/* Lesson Content */}
          <LessonContent lesson={lesson} onQuizComplete={handleQuizComplete} />

          {/* Mark Complete Button */}
          <div className="mt-8 pt-6 border-t border-border">
            {!progress?.completed ? (
              <Button onClick={handleMarkComplete} className="w-full md:w-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Lesson Completed</span>
                {progress.quizScore !== undefined && (
                  <span className="text-sm text-muted-foreground">
                    Quiz score: {progress.quizScore}%
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <LessonNavigation prevLesson={prevLesson} nextLesson={nextLesson} />
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <ProgressTracker lessons={[lesson]} currentLesson={lesson} />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About this lesson</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Estimated time: {lesson.estimatedTime} minutes
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
