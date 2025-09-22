import { render } from '@testing-library/react';

import CustomerWishlistStore from './customer-wishlist-store';

describe('CustomerWishlistStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerWishlistStore />);
    expect(baseElement).toBeTruthy();
  });
});
