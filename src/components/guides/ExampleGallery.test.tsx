import { render, screen } from '@testing-library/react';
import { ExampleGallery } from './ExampleGallery';
import type { PromptExample } from '../../types';

describe('ExampleGallery', () => {
  const examples: PromptExample[] = [
    {
      title: 'Example 1',
      description: 'First example prompt',
      prompt: 'Write a poem about nature',
      model: 'gpt-4',
    },
    {
      title: 'Example 2',
      description: 'Second example prompt',
      prompt: 'Explain quantum computing',
      expectedOutput: 'Quantum computing uses qubits...',
      model: 'claude-3.5',
    },
  ];

  it('renders example gallery with title', () => {
    render(<ExampleGallery examples={examples} />);
    expect(screen.getByText('Example Prompts')).toBeInTheDocument();
  });

  it('renders all examples', () => {
    render(<ExampleGallery examples={examples} />);
    expect(screen.getByText('Example 1')).toBeInTheDocument();
    expect(screen.getByText('Example 2')).toBeInTheDocument();
  });

  it('renders example descriptions', () => {
    render(<ExampleGallery examples={examples} />);
    expect(screen.getByText('First example prompt')).toBeInTheDocument();
    expect(screen.getByText('Second example prompt')).toBeInTheDocument();
  });

  it('renders prompt text', () => {
    render(<ExampleGallery examples={examples} />);
    expect(screen.getByText('Write a poem about nature')).toBeInTheDocument();
    expect(screen.getByText('Explain quantum computing')).toBeInTheDocument();
  });

  it('renders expected output when provided', () => {
    render(<ExampleGallery examples={examples} />);
    expect(screen.getByText('Quantum computing uses qubits...')).toBeInTheDocument();
  });

  it('renders nothing when examples array is empty', () => {
    const { container } = render(<ExampleGallery examples={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
