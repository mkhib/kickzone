import { render } from '@testing-library/react';
import { vi } from 'vitest';
import LottieSuccessCheck from './lottie-success-check';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

describe('LottieSuccessCheck', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LottieSuccessCheck />);
    expect(baseElement).toBeTruthy();
  });
});
