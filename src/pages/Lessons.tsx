import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Lightbulb, Rocket, Cpu } from 'lucide-react';
import { AppShell } from '../components/layout';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LessonCard } from '../components/lessons/LessonCard';
import { ProgressTracker } from '../components/lessons/ProgressTracker';
import { getCategories, getLessonsByCategory } from '../lib/content';
import { useProgressStore } from '../stores';
import type { Lesson, LessonCategory } from '../types';

const categoryIcons: Record<LessonCategory, React.ReactNode> = {
  fundamentals: <BookOpen className="h-6 w-6" />,
  techniques: <Lightbulb className="h-6 w-6" />,
  advanced: <Rocket className="h-6 w-6" />,
  'model-specific': <Cpu className="h-6 w-6" />,
};

const categoryColors: Record<LessonCategory, string> = {
  fundamentals: 'text-blue-500',
  techniques: 'text-purple-500',
  advanced: 'text-green-500',
  'model-specific': 'text-orange-500',
};

export function Lessons() {
  const { category } = useParams<{ category?: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = (category as LessonCategory) || null;
  
  const categories = getCategories();
  const { getCompletionPercentage } = useProgressStore();

  useEffect(() => {
    async function loadLessons() {
      setLoading(true);
      try {
        if (selectedCategory) {
          const categoryLessons = await getLessonsByCategory(selectedCategory);
          setLessons(categoryLessons);
        } else {
          // Load all lessons
          const allLessons: Lesson[] = [];
          for (const cat of Object.keys(categories) as Array<LessonCategory>) {
            const catLessons = await getLessonsByCategory(cat);
            allLessons.push(...catLessons);
          }
          setLessons(allLessons);
        }
      } catch (error) {
        console.error('Failed to load lessons:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLessons();
  }, [selectedCategory, categories]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Lessons</h1>
          <p className="text-muted-foreground mt-2">
            Master prompt engineering with structured lessons
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(categories) as LessonCategory[]).map((cat) => {
            const catData = (categories as Record<LessonCategory, { title: string; description: string; lessons: string[] }>)[cat];
            const completion = getCompletionPercentage(cat, catData.lessons.length);
            
            return (
              <Link
                key={cat}
                to={selectedCategory === cat ? '/lessons' : `/lessons/${cat}`}
                className="block"
              >
                <Card
                  hover
                  className={`transition-all ${
                    selectedCategory === cat ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg bg-background ${categoryColors[cat]}`}>
                        {categoryIcons[cat]}
                      </div>
                      <Badge variant={completion === 100 ? 'success' : 'secondary'}>
                        {catData.lessons.length} lessons
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{catData.title}</CardTitle>
                    <CardDescription>{catData.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {selectedCategory 
                  ? `${categories[selectedCategory as keyof typeof categories]?.title} Lessons`
                  : 'All Lessons'
                }
              </h2>
              {selectedCategory && (
                <Link to="/lessons">
                  <Button variant="ghost" size="sm">
                    Show All
                  </Button>
                </Link>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="h-48 animate-pulse">
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : lessons.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No lessons found.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessons.map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProgressTracker lessons={lessons} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
