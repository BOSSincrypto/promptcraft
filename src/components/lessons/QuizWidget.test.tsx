import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizWidget } from './QuizWidget';

const mockProps = {
  question: 'What is 2 + 2?',
  options: ['3', '4', '5', '6'],
  correct: 1,
  onComplete: vi.fn(),
};

describe('QuizWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders question and options', () => {
    render(<QuizWidget {...mockProps} />);

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('disables submit button when no option selected', () => {
    render(<QuizWidget {...mockProps} />);

    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when option selected', () => {
    render(<QuizWidget {...mockProps} />);

    const option = screen.getByText('4');
    fireEvent.click(option);

    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('shows correct feedback for correct answer', () => {
    render(<QuizWidget {...mockProps} />);

    const correctOption = screen.getByText('4');
    fireEvent.click(correctOption);

    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Correct! Well done!')).toBeInTheDocument();
    expect(mockProps.onComplete).toHaveBeenCalledWith(true);
  });

  it('shows incorrect feedback for wrong answer', () => {
    render(<QuizWidget {...mockProps} />);

    const wrongOption = screen.getByText('3');
    fireEvent.click(wrongOption);

    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Incorrect/)).toBeInTheDocument();
    expect(mockProps.onComplete).toHaveBeenCalledWith(false);
  });

  it('allows retry after submission', () => {
    render(<QuizWidget {...mockProps} />);

    // Select wrong answer
    const wrongOption = screen.getByText('3');
    fireEvent.click(wrongOption);

    // Submit
    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    fireEvent.click(submitButton);

    // Click try again
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    // Should be able to select again
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled();
  });
});
