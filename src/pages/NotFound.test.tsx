import { render, screen } from '../test/test-utils';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders 404 error code', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.")).toBeInTheDocument();
  });

  it('renders go home button', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders go back button', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });
});
