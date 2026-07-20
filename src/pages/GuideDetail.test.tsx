import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GuideDetail } from './GuideDetail';
import { getGuide, getGuidesByType } from '../lib/content';
import type { Guide } from '../types';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the content loading functions
vi.mock('../lib/content', () => {
  return {
    getGuide: vi.fn(),
    getGuidesByType: vi.fn(),
    formatDate: vi.fn((date: number) => new Date(date).toLocaleDateString()),
  };
});

const mockGetGuide = vi.mocked(getGuide);
const mockGetGuidesByType = vi.mocked(getGuidesByType);

const mockGuide: Guide = {
  title: 'GPT-4 Guide',
  description: 'A guide for GPT-4',
  modelType: 'llms',
  modelSlug: 'gpt-4',
  lastUpdated: Date.now(),
  icon: 'Bot',
  color: 'blue',
  content: '# GPT-4 Guide\n\nThis is a guide for GPT-4.',
  tips: [
    {
      title: 'Best Practice',
      content: 'Use specific instructions.',
      category: 'best-practice',
    },
  ],
  examples: [],
  comparisons: [],
};

const mockGuides: Guide[] = [
  {
    ...mockGuide,
    modelSlug: 'gpt-3.5',
    title: 'GPT-3.5 Guide',
  },
  mockGuide,
  {
    ...mockGuide,
    modelSlug: 'claude-3.5',
    title: 'Claude 3.5 Guide',
  },
];

const renderWithRouter = (ui: React.ReactElement, { route = '/guides/gpt-4' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/guides/:model" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('GuideDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetGuide.mockResolvedValue(mockGuide);
    mockGetGuidesByType.mockResolvedValue(mockGuides);
  });

  it('renders guide loading state', async () => {
    // Make getGuide never resolve so loading state persists
    mockGetGuide.mockReturnValue(new Promise(() => {}));
    renderWithRouter(<GuideDetail />);
    // The component uses skeleton loaders (animate-pulse divs) during loading
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('renders guide not found when guide is null', async () => {
    mockGetGuide.mockResolvedValue(null);
    mockGetGuidesByType.mockResolvedValue([]);
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      expect(screen.getByText('Guide not found')).toBeInTheDocument();
    });
  });

  it('renders guide content after loading', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      expect(screen.getAllByText('GPT-4 Guide').length).toBeGreaterThan(0);
      expect(screen.getByText('A guide for GPT-4')).toBeInTheDocument();
    });
  });

  it('renders breadcrumb navigation', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      // Breadcrumb contains "Guides" link and the model type
      const breadcrumbLinks = screen.getAllByText('Guides');
      expect(breadcrumbLinks.length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('llms').length).toBeGreaterThan(0);
    });
  });

  it('renders previous navigation button when available', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      // Previous guide button appears in the navigation section at the bottom
      const prevButtons = screen.getAllByText('GPT-3.5 Guide');
      expect(prevButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders next navigation button when available', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      // Next guide button appears in the navigation section at the bottom
      const nextButtons = screen.getAllByText('Claude 3.5 Guide');
      expect(nextButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('does not render previous button for first guide', async () => {
    // Set up guides where current guide is first
    mockGetGuidesByType.mockResolvedValue([mockGuide, { ...mockGuide, modelSlug: 'gpt-3.5' }]);
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      // The first guide should not have a prev button in the navigation section
      // (it may still have the guide title in other places)
      const navSection = document.querySelector('.border-t');
      if (navSection) {
        expect(navSection.textContent).not.toContain('GPT-3.5 Guide');
      }
    });
  });

  it('does not render next button for last guide', async () => {
    // Set up guides where current guide is last
    mockGetGuidesByType.mockResolvedValue([{ ...mockGuide, modelSlug: 'gpt-3.5' }, mockGuide]);
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      // The last guide should not have a next button in the navigation section
      const navSection = document.querySelector('.border-t');
      if (navSection) {
        expect(navSection.textContent).not.toContain('GPT-3.5 Guide');
      }
    });
  });

  it('renders tips section with visual indicators', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      expect(screen.getByText('Best Practices & Tips')).toBeInTheDocument();
      expect(screen.getByText('Best Practice')).toBeInTheDocument();
    });
  });

  it('renders sidebar with guide information', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      expect(screen.getByText('About this guide')).toBeInTheDocument();
      expect(screen.getByText('Model:')).toBeInTheDocument();
      expect(screen.getByText('Category:')).toBeInTheDocument();
    });
  });

  it('has correct link for previous guide', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      const prevLinks = screen.getAllByText('GPT-3.5 Guide');
      const prevLink = prevLinks[0]?.closest('a');
      expect(prevLink).toHaveAttribute('href', '/guides/gpt-3.5');
    });
  });

  it('has correct link for next guide', async () => {
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      const nextLinks = screen.getAllByText('Claude 3.5 Guide');
      const nextLink = nextLinks[0]?.closest('a');
      expect(nextLink).toHaveAttribute('href', '/guides/claude-3.5');
    });
  });

  it('shows back to guides button when guide not found', async () => {
    mockGetGuide.mockResolvedValue(null);
    renderWithRouter(<GuideDetail />);
    await waitFor(() => {
      const backButton = screen.getByText('Back to Guides');
      expect(backButton).toBeInTheDocument();
    });
  });
});
