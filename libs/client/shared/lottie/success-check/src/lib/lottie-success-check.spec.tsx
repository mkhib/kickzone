import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

import LottieSuccessCheck from './lottie-success-check';

describe('LottieSuccessCheck', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieSuccessCheck />);
    expect(baseElement).toBeTruthy();
  });
});
