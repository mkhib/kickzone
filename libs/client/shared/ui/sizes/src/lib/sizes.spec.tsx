import { render } from '@testing-library/react';

import { Sizes } from './sizes.tsx';

describe('Sizes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sizes />);
    expect(baseElement).toBeTruthy();
  });
});
