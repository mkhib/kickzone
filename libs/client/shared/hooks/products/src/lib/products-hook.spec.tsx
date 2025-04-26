import { render } from '@testing-library/react';

import ProductsHook from './products-hook';

describe('ProductsHook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductsHook />);
    expect(baseElement).toBeTruthy();
  });
});
