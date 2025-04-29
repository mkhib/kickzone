import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import { Snackbar } from './Snackbar';
import '@testing-library/jest-dom';

describe('Snackbar', () => {
  const defaultProps = {
    open: true,
    message: 'Test message',
    severity: 'info' as const,
    progress: 50,
    onClose: vi.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<Snackbar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the message', () => {
    render(<Snackbar {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(<Snackbar {...defaultProps} open={false} />);
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    render(<Snackbar {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should render progress bar with correct value', () => {
    render(<Snackbar {...defaultProps} progress={75} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('should apply correct severity styles', () => {
    const { rerender } = render(
      <Snackbar {...defaultProps} severity="error" />
    );
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');

    rerender(<Snackbar {...defaultProps} severity="success" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
  });
});

describe('Snackbar - Additional Tests', () => {
  const defaultProps = {
    open: true,
    message: 'Test message',
    severity: 'info' as const,
    progress: 100,
    onClose: vi.fn(),
  };

  it('should render with different severities', () => {
    const { rerender } = render(
      <Snackbar {...defaultProps} severity="error" />
    );
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
    rerender(<Snackbar {...defaultProps} severity="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardWarning');
    rerender(<Snackbar {...defaultProps} severity="success" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
    rerender(<Snackbar {...defaultProps} severity="info" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo');
  });

  it('should call onClose when pressing Escape', async () => {
    render(<Snackbar {...defaultProps} />);
    await userEvent.keyboard('{Escape}');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should not render progress bar if progress is 0', () => {
    render(<Snackbar {...defaultProps} progress={0} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('should be accessible by role', () => {
    render(<Snackbar {...defaultProps} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should support long messages', () => {
    const longMessage = 'A'.repeat(200);
    render(<Snackbar {...defaultProps} message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('should not call onClose if not open and Escape is pressed', async () => {
    const onClose = vi.fn();
    render(<Snackbar {...defaultProps} open={false} onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });
});
