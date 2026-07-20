import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareButton } from './ShareButton';

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined);

const originalShare = navigator.share;

beforeEach(() => {
  // Reset mocks
  vi.clearAllMocks();
  
  // Mock clipboard API
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockWriteText,
    },
    writable: true,
    configurable: true,
  });
  
  // Remove navigator.share to simulate Web Share API not supported
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (navigator as any).share;
});

afterEach(() => {
  // Restore navigator.share
  if (originalShare) {
    Object.defineProperty(navigator, 'share', {
      value: originalShare,
      writable: true,
      configurable: true,
    });
  }
});

describe('ShareButton', () => {
  it('renders share button with default text', () => {
    render(<ShareButton title="Test" text="Test content" />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('renders share button with custom variant', () => {
    render(<ShareButton title="Test" text="Test content" variant="ghost" />);
    const button = screen.getByText('Share');
    expect(button).toBeInTheDocument();
  });

  it('falls back to clipboard when Web Share API is not supported', async () => {
    render(<ShareButton title="Test Title" text="Test content" />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
    });
  });

  it('shows copied feedback after fallback copy', async () => {
    render(<ShareButton title="Test Title" text="Test content" />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    // Wait for the copied feedback
    await waitFor(() => {
      expect(screen.getByText('Copied to Clipboard!')).toBeInTheDocument();
    });
  });

  it('calls navigator.share when Web Share API is supported', async () => {
    // Mock navigator.share
    const mockShare = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      writable: true,
      configurable: true,
    });

    render(<ShareButton title="Test Title" text="Test content" />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith({
        title: 'Test Title',
        text: 'Test content',
        url: window.location.href,
      });
    });
  });
});
