import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import ErrorBoundary from './error-boundary';

function ProblemChild({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Simulated crash in component');
  }
  return <div data-testid="safe-child">Normal content</div>;
}

function RecoveryTestHarness() {
  const [shouldThrow, setShouldThrow] = useState(true);

  return (
    <ErrorBoundary onReset={() => setShouldThrow(false)}>
      <ProblemChild shouldThrow={shouldThrow} />
    </ErrorBoundary>
  );
}

describe('ErrorBoundary', () => {
  const originalError = console.error;

  beforeEach(() => {
    // Suppress expected React error logging during boundary tests
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-child')).toBeInTheDocument();
  });

  it('catches thrown error and renders the default luxury fallback UI with recovery button', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    // Brand wordmark must be present
    expect(screen.getByText('SAINTBALA')).toBeInTheDocument();

    // Default error heading
    expect(
      screen.getByText('Service Temporarily Unavailable')
    ).toBeInTheDocument();

    // Recovery button with minHeight: 44px
    const returnBtn = screen.getByTestId('return-to-storefront-btn');
    expect(returnBtn).toBeInTheDocument();
    expect(returnBtn).toHaveTextContent('Return to Storefront');
    expect(returnBtn).toHaveStyle({ minHeight: '44px' });

    // Try again button
    const tryAgainBtn = screen.getByTestId('try-again-btn');
    expect(tryAgainBtn).toBeInTheDocument();
  });

  it('renders a custom function fallback when provided', () => {
    render(
      <ErrorBoundary
        fallback={({ error, resetError }) => (
          <div data-testid="custom-fallback">
            <span>Custom Error: {error?.message}</span>
            <button onClick={resetError}>Reset</button>
          </div>
        )}
      >
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(
      screen.getByText('Custom Error: Simulated crash in component')
    ).toBeInTheDocument();
  });

  it('renders a custom ReactNode fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="static-fallback">Static</div>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('static-fallback')).toBeInTheDocument();
  });

  it('calls onError callback when error is caught', () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Simulated crash in component' }),
      expect.any(Object)
    );
  });

  it('resets error state when Try Again is clicked and child no longer throws', () => {
    render(<RecoveryTestHarness />);

    expect(
      screen.getByText('Service Temporarily Unavailable')
    ).toBeInTheDocument();

    const tryAgainBtn = screen.getByTestId('try-again-btn');
    fireEvent.click(tryAgainBtn);

    expect(screen.getByTestId('safe-child')).toBeInTheDocument();
  });
});
