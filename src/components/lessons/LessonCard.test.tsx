import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LessonCard } from './LessonCard';
import { useProgressStore } from '../../stores';
import type { Lesson } from '../../types';

// Mock the progress store
vi.mock('../../stores', () => ({
  useProgressStore: vi.fn(),
}));

const mockLesson: Lesson = {
  slug: 'test-lesson',
  title: 'Test Lesson',
  description: 'A test lesson description',
  category: 'fundamentals',
  difficulty: 'beginner',
  estimatedTime: 10,
  order: 1,
  tags: ['test'],
  content: '# Test Content',
};

describe('LessonCard', () => {
  beforeEach(() => {
    vi.mocked(useProgressStore).mockReturnValue({
      getLessonProgress: vi.fn().mockReturnValue(null),
    } as unknown as ReturnType<typeof useProgressStore>);
  });

  it('renders lesson title and description', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Lesson')).toBeInTheDocument();
    expect(screen.getByText('A test lesson description')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  it('shows estimated time', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('10 min')).toBeInTheDocument();
  });

  it('links to correct lesson path', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/lessons/fundamentals/test-lesson');
  });

  it('shows "Start Lesson" for uncompleted lessons', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Start Lesson')).toBeInTheDocument();
  });

  it('shows "Review Lesson" for completed lessons', () => {
    vi.mocked(useProgressStore).mockReturnValue({
      getLessonProgress: vi.fn().mockReturnValue({ completed: true }),
    } as unknown as ReturnType<typeof useProgressStore>);

    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );

    expect(screen.getByText('Review Lesson')).toBeInTheDocument();
  });
});
