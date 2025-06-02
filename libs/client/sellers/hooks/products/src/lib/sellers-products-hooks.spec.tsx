import { render } from '@testing-library/react';

import SellersProductsHooks from './sellers-products-hooks';

describe('SellersProductsHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersProductsHooks />);
    expect(baseElement).toBeTruthy();
  });
});
