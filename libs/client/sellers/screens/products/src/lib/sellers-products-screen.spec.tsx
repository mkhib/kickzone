import { render } from '@testing-library/react';

import SellersProductsScreen from './sellers-products-screen';

describe('SellersProductsScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersProductsScreen />);
    expect(baseElement).toBeTruthy();
  });
});
