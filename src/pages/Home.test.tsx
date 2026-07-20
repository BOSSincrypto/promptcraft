import { render, screen } from '../test/test-utils';
import { Home } from './Home';

describe('Home', () => {
  it('renders hero section', () => {
    render(<Home />);
    expect(screen.getByText('Master Prompt Engineering')).toBeInTheDocument();
  });

  it('renders progress overview', () => {
    render(<Home />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    expect(screen.getAllByText('Lessons Completed').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Avg Quiz Score').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Day Streak').length).toBeGreaterThanOrEqual(1);
  });

  it('renders featured lessons section', () => {
    render(<Home />);
    expect(screen.getByText('Featured Lessons')).toBeInTheDocument();
    expect(screen.getByText('What is Prompting?')).toBeInTheDocument();
    expect(screen.getByText('Chain of Thought Prompting')).toBeInTheDocument();
  });

  it('renders quick start prompts section', () => {
    render(<Home />);
    expect(screen.getByText('Quick Start Prompts')).toBeInTheDocument();
    expect(screen.getByText('Role-Play Expert')).toBeInTheDocument();
    expect(screen.getByText('Code Review Assistant')).toBeInTheDocument();
  });

  it('renders recent guides section', () => {
    render(<Home />);
    expect(screen.getByText('Recent Guides')).toBeInTheDocument();
    expect(screen.getByText('GPT-4 Guide')).toBeInTheDocument();
    expect(screen.getByText('Midjourney Guide')).toBeInTheDocument();
  });

  it('shows zero/default values when no progress exists', () => {
    render(<Home />);
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(1);
  });
});
