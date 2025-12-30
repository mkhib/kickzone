import { render } from '@testing-library/react';

import LottieEmptyCart from './lottie-empty-cart';

describe('LottieEmptyCart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieEmptyCart />);
    expect(baseElement).toBeTruthy();
  });
});
