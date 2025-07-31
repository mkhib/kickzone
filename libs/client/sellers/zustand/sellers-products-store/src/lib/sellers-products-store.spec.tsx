import { render } from '@testing-library/react';

import SellersProductsStore from './sellers-products-store';

describe('SellersProductsStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersProductsStore />);
    expect(baseElement).toBeTruthy();
  });
});
