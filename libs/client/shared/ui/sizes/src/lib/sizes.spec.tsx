import { render } from '@testing-library/react';

import Sizes from './sizes';

describe('Sizes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sizes />);
    expect(baseElement).toBeTruthy();
  });
});
