import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppShell } from '../components/layout';
import { Button } from '../components/ui';
import { ExampleDetail } from '../components/community/ExampleDetail';
import { getCommunityExampleById } from '../lib/content';
import type { CommunityExample } from '../types';

export function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [example, setExample] = useState<CommunityExample | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExample() {
      if (!id) {
        setError('No example ID provided');
        setLoading(false);
        return;
      }

      try {
        const exampleData = await getCommunityExampleById(id);
        if (exampleData) {
          setExample(exampleData);
        } else {
          setError('Example not found');
        }
      } catch (err) {
        console.error('Failed to load example:', err);
        setError('Failed to load example');
      } finally {
        setLoading(false);
      }
    }
    
    loadExample();
  }, [id]);

  const handleCopy = () => {
    // Could add analytics or toast notification here
    console.log('Copied prompt to clipboard');
  };

  if (loading) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (error || !example) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            {error || 'Example not found'}
          </h2>
          <p className="text-muted-foreground mb-6">
            The example you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/community">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Community
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Button */}
        <Link to="/community" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Community
        </Link>

        {/* Example Detail */}
        <ExampleDetail example={example} onCopy={handleCopy} />
      </div>
    </AppShell>
  );
}
