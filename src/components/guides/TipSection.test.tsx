import { render, screen } from '@testing-library/react';
import { TipSection } from './TipSection';
import type { GuideTip } from '../../types';

describe('TipSection', () => {
  const tips: GuideTip[] = [
    {
      title: 'Best Practice',
      content: 'This is a best practice tip.',
      category: 'best-practice',
    },
    {
      title: 'Warning',
      content: 'This is a warning tip.',
      category: 'warning',
    },
    {
      title: 'General Tip',
      content: 'This is a general tip.',
      category: 'tip',
    },
  ];

  it('renders tips section with title', () => {
    render(<TipSection tips={tips} />);
    expect(screen.getByText('Best Practices & Tips')).toBeInTheDocument();
  });

  it('renders all tips', () => {
    render(<TipSection tips={tips} />);
    expect(screen.getByText('Best Practice')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('General Tip')).toBeInTheDocument();
  });

  it('renders tip content', () => {
    render(<TipSection tips={tips} />);
    expect(screen.getByText('This is a best practice tip.')).toBeInTheDocument();
    expect(screen.getByText('This is a warning tip.')).toBeInTheDocument();
    expect(screen.getByText('This is a general tip.')).toBeInTheDocument();
  });

  it('renders nothing when tips array is empty', () => {
    const { container } = render(<TipSection tips={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays visual indicators for best practice tips', () => {
    render(<TipSection tips={tips} />);
    const bestPracticeTip = screen.getByText('Best Practice').closest('[class*="border-l-green-500"]');
    expect(bestPracticeTip).toBeInTheDocument();
    // Check for CheckCircle icon (green)
    const bestPracticeCard = bestPracticeTip?.querySelector('svg');
    expect(bestPracticeCard).toBeInTheDocument();
  });

  it('displays visual indicators for warning tips', () => {
    render(<TipSection tips={tips} />);
    const warningTip = screen.getByText('Warning').closest('[class*="border-l-yellow-500"]');
    expect(warningTip).toBeInTheDocument();
    // Check for AlertTriangle icon (yellow)
    const warningCard = warningTip?.querySelector('svg');
    expect(warningCard).toBeInTheDocument();
  });

  it('displays visual indicators for general tips', () => {
    render(<TipSection tips={tips} />);
    const generalTip = screen.getByText('General Tip').closest('[class*="border-l-blue-500"]');
    expect(generalTip).toBeInTheDocument();
    // Check for Lightbulb icon (blue)
    const generalCard = generalTip?.querySelector('svg');
    expect(generalCard).toBeInTheDocument();
  });

  it('renders correct number of tip cards', () => {
    render(<TipSection tips={tips} />);
    // Count cards by looking for the border-l-4 class (each tip card has this)
    const cards = document.querySelectorAll('.border-l-4');
    expect(cards).toHaveLength(3);
  });
});
