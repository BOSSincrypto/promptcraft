import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { AppShell } from '../components/layout';
import { GuideCard } from '../components/guides/GuideCard';
import { getGuidesByType } from '../lib/content';
import type { Guide, ModelType } from '../types';

const modelTypeTabs: { value: ModelType; label: string; icon: string }[] = [
  { value: 'llms', label: 'LLMs', icon: 'Bot' },
  { value: 'image-generators', label: 'Image Generators', icon: 'Palette' },
  { value: 'code-models', label: 'Code Models', icon: 'Code2' },
  { value: 'specialized', label: 'Specialized', icon: 'Wrench' },
];

export function Guides() {
  const [activeTab, setActiveTab] = useState<ModelType>('llms');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const guidesData = await getGuidesByType(activeTab);
        setGuides(guidesData);
      } catch (error) {
        console.error('Failed to load guides:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeTab]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Model Guides</h1>
          <p className="text-muted-foreground mt-2">
            Master prompt engineering for different AI models
          </p>
        </div>

        {/* Model Type Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ModelType)}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {modelTypeTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Guide Content */}
          <div className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : guides.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No guides available for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <GuideCard
                    key={guide.modelSlug}
                    slug={guide.modelSlug}
                    title={guide.title}
                    description={guide.description}
                    modelType={guide.modelType}
                    lastUpdated={guide.lastUpdated}
                    icon={guide.icon}
                    color={guide.color}
                  />
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
}
