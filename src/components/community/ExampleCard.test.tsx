import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ExampleCard } from './ExampleCard';
import type { CommunityExample } from '../../types';

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  vi.clearAllMocks();
  
  // Mock clipboard API
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockWriteText,
    },
    writable: true,
  });
});

const mockExample: CommunityExample = {
  id: 'test-example',
  title: 'Test Example',
  description: 'This is a test example',
  prompt: 'Test prompt content',
  author: 'Test Author',
  category: 'technique',
  tags: ['test', 'example'],
  likes: 10,
  createdAt: Date.now(),
  isFeatured: true,
  difficulty: 'intermediate',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ExampleCard', () => {
  it('renders example information correctly', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    
    expect(screen.getByText('Test Example')).toBeInTheDocument();
    expect(screen.getByText('This is a test example')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
    expect(screen.getByText('10 likes')).toBeInTheDocument();
  });

  it('displays category badge', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    expect(screen.getByText('technique')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });

  it('displays featured badge when isFeatured is true', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('displays tags', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
  });

  it('calls onCopy when copy button is clicked', async () => {
    const onCopy = vi.fn();
    renderWithRouter(<ExampleCard example={mockExample} onCopy={onCopy} />);
    
    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('Test prompt content');
    });
  });

  it('links to example detail page', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/community/test-example');
  });

  it('truncates long prompts', () => {
    const longPromptExample = {
      ...mockExample,
      prompt: 'A'.repeat(200),
    };
    
    renderWithRouter(<ExampleCard example={longPromptExample} />);
    
    // Should show truncated text with "..."
    expect(screen.getByText(/A+\.\.\./)).toBeInTheDocument();
  });

  it('displays creation date', () => {
    renderWithRouter(<ExampleCard example={mockExample} />);
    
    // Should display formatted date (e.g., "Jul 20, 2026")
    const dateRegex = /[A-Z][a-z]{2} \d{1,2}, \d{4}/;
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
  });
});
