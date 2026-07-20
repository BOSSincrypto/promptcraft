import { render, screen } from '../../test/test-utils';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders children correctly', () => {
    render(
      <AppShell>
        <div data-testid="test-content">Test Content</div>
      </AppShell>
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('shows header', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    expect(screen.getAllByText('PromptCraft').length).toBeGreaterThanOrEqual(1);
  });

  it('shows footer', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    expect(screen.getByText(/PromptCraft Team/)).toBeInTheDocument();
  });

  it('shows navigation links', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    expect(screen.getAllByText('Lessons').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Prompts').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Guides').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Community').length).toBeGreaterThanOrEqual(1);
  });
});
