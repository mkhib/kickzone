import { render } from '@testing-library/react';

import LottieUnauthorized from './lottie-unauthorized';

describe('LottieUnauthorized', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieUnauthorized />);
    expect(baseElement).toBeTruthy();
  });
});
