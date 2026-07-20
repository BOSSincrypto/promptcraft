import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ExampleFeed } from './ExampleFeed';
import type { CommunityExample } from '../../types';

const mockExamples: CommunityExample[] = [
  {
    id: 'example-1',
    title: 'First Example',
    description: 'First test example',
    prompt: 'First prompt',
    author: 'Author 1',
    category: 'technique',
    tags: ['tag1'],
    likes: 5,
    createdAt: Date.now(),
  },
  {
    id: 'example-2',
    title: 'Second Example',
    description: 'Second test example',
    prompt: 'Second prompt',
    author: 'Author 2',
    category: 'code',
    tags: ['tag2'],
    likes: 10,
    createdAt: Date.now(),
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ExampleFeed', () => {
  it('renders all examples', () => {
    renderWithRouter(<ExampleFeed examples={mockExamples} />);
    
    expect(screen.getByText('First Example')).toBeInTheDocument();
    expect(screen.getByText('Second Example')).toBeInTheDocument();
  });

  it('renders empty state when no examples', () => {
    renderWithRouter(<ExampleFeed examples={[]} />);
    
    expect(screen.getByText('No examples found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('renders correct number of example cards', () => {
    renderWithRouter(<ExampleFeed examples={mockExamples} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('applies grid layout classes', () => {
    const { container } = renderWithRouter(<ExampleFeed examples={mockExamples} />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
  });
});
