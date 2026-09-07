import { render } from '@testing-library/react';
import { vi } from 'vitest';
import LottieEmptyCart from './lottie-empty-cart';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

describe('LottieEmptyCart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieEmptyCart />);
    expect(baseElement).toBeTruthy();
  });
});
