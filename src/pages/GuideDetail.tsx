import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Palette, Code2, Wrench } from 'lucide-react';
import { AppShell } from '../components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { GuideContent } from '../components/guides/GuideContent';
import { TipSection } from '../components/guides/TipSection';
import { ExampleGallery } from '../components/guides/ExampleGallery';
import { ModelComparison } from '../components/guides/ModelComparison';
import { getGuide, getGuidesByType } from '../lib/content';
import { formatDate } from '../lib/utils';
import type { Guide, ModelType } from '../types';

const modelTypeIcons: Record<ModelType, React.ReactNode> = {
  llms: <Bot className="h-5 w-5" />,
  'image-generators': <Palette className="h-5 w-5" />,
  'code-models': <Code2 className="h-5 w-5" />,
  specialized: <Wrench className="h-5 w-5" />,
};

const modelTypeColors: Record<ModelType, 'primary' | 'secondary' | 'success' | 'warning'> = {
  llms: 'primary',
  'image-generators': 'secondary',
  'code-models': 'success',
  specialized: 'warning',
};

export function GuideDetail() {
  const { model } = useParams<{ model: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevGuide, setPrevGuide] = useState<Guide | null>(null);
  const [nextGuide, setNextGuide] = useState<Guide | null>(null);

  useEffect(() => {
    async function loadGuide() {
      if (!model) return;
      
      setLoading(true);
      try {
        const loadedGuide = await getGuide(model);
        setGuide(loadedGuide);
        
        if (loadedGuide) {
          // Load guides for navigation
          const typeGuides = await getGuidesByType(loadedGuide.modelType);
          const currentIndex = typeGuides.findIndex(g => g.modelSlug === model);
          
          if (currentIndex > 0 && typeGuides[currentIndex - 1]) {
            setPrevGuide(typeGuides[currentIndex - 1]!);
          } else {
            setPrevGuide(null);
          }
          
          if (currentIndex < typeGuides.length - 1 && typeGuides[currentIndex + 1]) {
            setNextGuide(typeGuides[currentIndex + 1]!);
          } else {
            setNextGuide(null);
          }
        }
      } catch (error) {
        console.error('Failed to load guide:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [model]);

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

  if (!guide) {
    return (
      <AppShell>
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Guide not found</h2>
          <p className="text-muted-foreground mb-4">
            The guide you're looking for doesn't exist.
          </p>
          <Link to="/guides">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
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
              to="/guides"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Guides
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground capitalize">{guide.modelType}</span>
          </div>

          {/* Guide Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {modelTypeIcons[guide.modelType]}
              </div>
              <Badge variant={modelTypeColors[guide.modelType]}>
                {guide.modelType}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Updated {formatDate(guide.lastUpdated)}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
            <p className="text-muted-foreground text-lg">{guide.description}</p>
          </div>

          {/* Guide Content */}
          <GuideContent guide={guide} />

          {/* Tips Section */}
          <div className="mt-8">
            <TipSection tips={guide.tips} />
          </div>

          {/* Example Gallery */}
          <div className="mt-8">
            <ExampleGallery examples={guide.examples} />
          </div>

          {/* Model Comparison */}
          <div className="mt-8">
            <ModelComparison comparisons={guide.comparisons || []} />
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex justify-between">
              {prevGuide ? (
                <Link to={`/guides/${prevGuide.modelSlug}`}>
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {prevGuide.title}
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              
              {nextGuide ? (
                <Link to={`/guides/${nextGuide.modelSlug}`}>
                  <Button variant="outline">
                    {nextGuide.title}
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About this guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Last updated: {formatDate(guide.lastUpdated)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Model:</span>
                  <Badge variant="outline">{guide.modelSlug}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Category:</span>
                  <Badge variant={modelTypeColors[guide.modelType]}>
                    {guide.modelType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
