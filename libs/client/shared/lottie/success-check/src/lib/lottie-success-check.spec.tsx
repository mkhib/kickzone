import { render } from '@testing-library/react';

import LottieSuccessCheck from './lottie-success-check';

describe('LottieSuccessCheck', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieSuccessCheck />);
    expect(baseElement).toBeTruthy();
  });
});
