import { render, screen, fireEvent } from '../test/test-utils';
import { Settings } from './Settings';

describe('Settings', () => {
  it('renders settings page title', () => {
    render(<Settings />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Customize your PromptCraft experience')).toBeInTheDocument();
  });

  it('renders appearance section', () => {
    render(<Settings />);
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('renders audio section', () => {
    render(<Settings />);
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Sound Effects')).toBeInTheDocument();
  });

  it('renders performance section', () => {
    render(<Settings />);
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Offline Storage')).toBeInTheDocument();
    expect(screen.getByText('Service Worker')).toBeInTheDocument();
  });

  it('renders data management section', () => {
    render(<Settings />);
    expect(screen.getByText('Data Management')).toBeInTheDocument();
    expect(screen.getByText('Export Data')).toBeInTheDocument();
    expect(screen.getByText('Import Data')).toBeInTheDocument();
    expect(screen.getByText('Reset Progress')).toBeInTheDocument();
  });

  it('renders about section', () => {
    render(<Settings />);
    expect(screen.getByText('About PromptCraft')).toBeInTheDocument();
    expect(screen.getByText('Version: 0.1.0')).toBeInTheDocument();
  });

  it('allows theme selection', () => {
    render(<Settings />);
    const lightButton = screen.getByText('Light');
    const darkButton = screen.getByText('Dark');
    const systemButton = screen.getByText('System');
    
    expect(lightButton).toBeInTheDocument();
    expect(darkButton).toBeInTheDocument();
    expect(systemButton).toBeInTheDocument();
    
    // Click dark theme
    fireEvent.click(darkButton);
    // Button should be primary variant when selected
    expect(darkButton).toHaveClass('bg-primary');
  });

  it('allows sound toggle', () => {
    render(<Settings />);
    const soundSection = screen.getByText('Sound Effects').closest('div')?.parentElement;
    const soundButton = soundSection?.querySelector('button') as HTMLButtonElement;
    expect(soundButton).toBeInTheDocument();
    expect(soundButton.textContent).toBe('Enabled');
    
    fireEvent.click(soundButton);
    expect(soundButton.textContent).toBe('Disabled');
  });

  it('shows reset confirmation when reset button clicked', () => {
    render(<Settings />);
    const resetButton = screen.getByText('Reset');
    expect(resetButton).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(screen.getByText('Are you sure you want to reset all progress? This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    // There are two "Reset Progress" elements - one in the description and one in the button
    const resetProgressButtons = screen.getAllByText('Reset Progress');
    expect(resetProgressButtons.length).toBe(2);
  });

  it('can cancel reset', () => {
    render(<Settings />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(screen.queryByText('Are you sure you want to reset all progress? This cannot be undone.')).not.toBeInTheDocument();
  });
});
