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
