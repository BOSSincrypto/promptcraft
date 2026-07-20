import { render, screen } from '@testing-library/react';
import { ModelComparison } from './ModelComparison';
import type { ModelComparison as ModelComparisonType } from '../../types';

describe('ModelComparison', () => {
  const comparisons: ModelComparisonType[] = [
    {
      modelA: 'GPT-4',
      modelB: 'Claude-3.5',
      criteria: [
        { name: 'Reasoning', scoreA: 9, scoreB: 8 },
        { name: 'Creativity', scoreA: 8, scoreB: 9 },
      ],
    },
  ];

  it('renders model comparison section', () => {
    render(<ModelComparison comparisons={comparisons} />);
    expect(screen.getByText('Model Comparison')).toBeInTheDocument();
  });

  it('renders model names', () => {
    render(<ModelComparison comparisons={comparisons} />);
    expect(screen.getByText('GPT-4 vs Claude-3.5')).toBeInTheDocument();
  });

  it('renders criteria names', () => {
    render(<ModelComparison comparisons={comparisons} />);
    expect(screen.getByText('Reasoning')).toBeInTheDocument();
    expect(screen.getByText('Creativity')).toBeInTheDocument();
  });

  it('renders model scores', () => {
    render(<ModelComparison comparisons={comparisons} />);
    expect(screen.getAllByText('9/10').length).toBeGreaterThan(0);
    expect(screen.getAllByText('8/10').length).toBeGreaterThan(0);
  });

  it('renders nothing when comparisons array is empty', () => {
    const { container } = render(<ModelComparison comparisons={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
