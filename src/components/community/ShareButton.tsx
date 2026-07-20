import { useState } from 'react';
import { Button } from '../ui';
import { useShare } from '../../hooks/useShare';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function ShareButton({ 
  title, 
  text, 
  url, 
  variant = 'outline',
  size = 'md'
}: ShareButtonProps) {
  const { share, isSupported, isSharing } = useShare();
  const [copiedFallback, setCopiedFallback] = useState(false);

  const handleShare = async () => {
    if (!isSupported) {
      // Fallback: copy to clipboard
      try {
        const shareText = `${title}\n\n${text}\n\n${url || window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        setCopiedFallback(true);
        setTimeout(() => setCopiedFallback(false), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
      return;
    }

    await share({ title, text, url });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      disabled={isSharing}
      className="gap-2"
    >
      {isSharing ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sharing...
        </>
      ) : copiedFallback ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied to Clipboard!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </>
      )}
    </Button>
  );
}
