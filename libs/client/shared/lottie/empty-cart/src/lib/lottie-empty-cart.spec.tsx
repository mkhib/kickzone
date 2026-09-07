import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

import LottieEmptyCart from './lottie-empty-cart';

describe('LottieEmptyCart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieEmptyCart />);
    expect(baseElement).toBeTruthy();
  });
});
