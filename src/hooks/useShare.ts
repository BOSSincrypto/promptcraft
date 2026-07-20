import { useState, useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url?: string;
}

interface UseShareReturn {
  share: (data: ShareData) => Promise<boolean>;
  isSupported: boolean;
  isSharing: boolean;
  error: string | null;
}

export function useShare(): UseShareReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSupported = typeof navigator !== 'undefined' && 'share' in navigator;

  const share = useCallback(async (data: ShareData): Promise<boolean> => {
    if (!isSupported) {
      setError('Web Share API is not supported');
      return false;
    }

    setIsSharing(true);
    setError(null);

    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url || window.location.href,
      });
      return true;
    } catch (err) {
      // User cancelled share or error occurred
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
        console.error('Share failed:', err);
      }
      return false;
    } finally {
      setIsSharing(false);
    }
  }, [isSupported]);

  return {
    share,
    isSupported,
    isSharing,
    error,
  };
}
