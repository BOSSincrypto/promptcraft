import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders code content', () => {
    const code = 'console.log("Hello, World!");';
    render(<CodeBlock code={code} />);

    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('displays language label', () => {
    render(<CodeBlock code="test" language="javascript" />);

    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('shows copy button on hover', () => {
    render(<CodeBlock code="test" />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('copies code to clipboard when copy button clicked', async () => {
    const code = 'test code';
    render(<CodeBlock code={code} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
  });

  it('shows "Copied" after successful copy', async () => {
    render(<CodeBlock code="test" />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    // Wait for state update
    await vi.waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
  });

  it('hides copy button when showCopy is false', () => {
    render(<CodeBlock code="test" showCopy={false} />);

    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });
});
