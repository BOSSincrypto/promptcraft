import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GuideCard } from './GuideCard';

describe('GuideCard', () => {
  const defaultProps = {
    slug: 'gpt-5.5',
    title: 'GPT-5.5 Guide',
    description: 'Master prompt engineering for GPT-5.5',
    modelType: 'llms' as const,
    lastUpdated: Date.now() - 86400000,
  };

  it('renders guide card with title and description', () => {
    render(
      <MemoryRouter>
        <GuideCard {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('GPT-5.5 Guide')).toBeInTheDocument();
    expect(screen.getByText('Master prompt engineering for GPT-5.5')).toBeInTheDocument();
  });

  it('renders model type badge', () => {
    render(
      <MemoryRouter>
        <GuideCard {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('llms')).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    render(
      <MemoryRouter>
        <GuideCard {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Updated/)).toBeInTheDocument();
  });

  it('links to guide detail page', () => {
    render(
      <MemoryRouter>
        <GuideCard {...defaultProps} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/guides/gpt-5.5');
  });
});
