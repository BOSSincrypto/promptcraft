import { render, screen } from '../test/test-utils';
import { About } from './About';

describe('About', () => {
  it('renders about page title', () => {
    render(<About />);
    expect(screen.getByText('PromptCraft')).toBeInTheDocument();
    expect(screen.getByText('Interactive platform to master prompt engineering for AI models')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<About />);
    expect(screen.getByText('Interactive Learning')).toBeInTheDocument();
    expect(screen.getByText('Prompt Tools')).toBeInTheDocument();
    expect(screen.getByText('Model Guides')).toBeInTheDocument();
    expect(screen.getByText('Offline First')).toBeInTheDocument();
  });

  it('renders technology stack', () => {
    render(<About />);
    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    expect(screen.getByText('React 19 + TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4')).toBeInTheDocument();
    expect(screen.getByText('Zustand 5')).toBeInTheDocument();
    expect(screen.getByText('Vite 6')).toBeInTheDocument();
  });

  it('renders features list', () => {
    render(<About />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Structured learning path from beginner to advanced')).toBeInTheDocument();
    expect(screen.getByText('Interactive quizzes with immediate feedback')).toBeInTheDocument();
    expect(screen.getByText('Full offline support with service worker')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<About />);
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
    expect(screen.getByText('Browse Prompts')).toBeInTheDocument();
  });

  it('renders footer credit', () => {
    render(<About />);
    expect(screen.getByText(/Built with/)).toBeInTheDocument();
    expect(screen.getByText(/by the PromptCraft Team/)).toBeInTheDocument();
  });
});
