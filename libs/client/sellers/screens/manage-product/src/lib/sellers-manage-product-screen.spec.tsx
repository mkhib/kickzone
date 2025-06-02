import { render } from '@testing-library/react';

import SellersManageProductScreen from './sellers-manage-product-screen';

describe('SellersManageProductScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersManageProductScreen />);
    expect(baseElement).toBeTruthy();
  });
});
