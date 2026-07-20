import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppShell } from '../components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui';
import { PromptGeneratorForm } from '../components/prompts/PromptGeneratorForm';
import { PromptOptimizer } from '../components/prompts/PromptOptimizer';
import { MyPrompts } from '../components/prompts/MyPrompts';
import { usePromptStore } from '../stores';

export function PromptGenerator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'generate');
  const { prompts } = usePromptStore();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['generate', 'optimize', 'my'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Prompt Tools</h1>
          <p className="text-muted-foreground mt-2">
            Create, optimize, and manage your prompts
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Generate
            </TabsTrigger>
            <TabsTrigger value="optimize" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Optimize
            </TabsTrigger>
            <TabsTrigger value="my" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              My Prompts ({prompts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <PromptGeneratorForm />
          </TabsContent>

          <TabsContent value="optimize" className="mt-6">
            <PromptOptimizer />
          </TabsContent>

          <TabsContent value="my" className="mt-6">
            <MyPrompts />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
