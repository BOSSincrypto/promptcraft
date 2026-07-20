import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LessonNavigation } from './LessonNavigation';
import type { Lesson } from '../../types';

const mockPrevLesson: Lesson = {
  slug: 'prev-lesson',
  title: 'Previous Lesson',
  description: 'Previous description',
  category: 'fundamentals',
  difficulty: 'beginner',
  estimatedTime: 10,
  order: 1,
  tags: [],
  content: '',
};

const mockNextLesson: Lesson = {
  slug: 'next-lesson',
  title: 'Next Lesson',
  description: 'Next description',
  category: 'fundamentals',
  difficulty: 'beginner',
  estimatedTime: 10,
  order: 2,
  tags: [],
  content: '',
};

describe('LessonNavigation', () => {
  it('shows previous lesson when provided', () => {
    render(
      <MemoryRouter>
        <LessonNavigation prevLesson={mockPrevLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Previous Lesson')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  it('shows next lesson when provided', () => {
    render(
      <MemoryRouter>
        <LessonNavigation nextLesson={mockNextLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Next Lesson')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows both prev and next when provided', () => {
    render(
      <MemoryRouter>
        <LessonNavigation prevLesson={mockPrevLesson} nextLesson={mockNextLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Previous Lesson')).toBeInTheDocument();
    expect(screen.getByText('Next Lesson')).toBeInTheDocument();
  });

  it('shows empty div when no lessons provided', () => {
    const { container } = render(
      <MemoryRouter>
        <LessonNavigation />
      </MemoryRouter>
    );

    // Should have two empty divs for prev and next
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThanOrEqual(2);
  });

  it('links to correct lesson paths', () => {
    render(
      <MemoryRouter>
        <LessonNavigation prevLesson={mockPrevLesson} nextLesson={mockNextLesson} />
      </MemoryRouter>
    );

    const prevLink = screen.getByRole('link', { name: /previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson/i });

    expect(prevLink).toHaveAttribute('href', '/lessons/fundamentals/prev-lesson');
    expect(nextLink).toHaveAttribute('href', '/lessons/fundamentals/next-lesson');
  });
});
