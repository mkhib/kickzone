import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import LottieLoading from './lottie-loading';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

describe('LottieLoading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieLoading />);
    expect(baseElement).toBeTruthy();
  });

  it('renders lottie element with custom sizes', () => {
    const { getByTestId } = render(<LottieLoading width={280} height={280} />);
    expect(getByTestId('lottie-loading')).toBeInTheDocument();
  });
});
