import { render } from '@testing-library/react';

import CustomerCartStore from './customer-cart-store';

describe('CustomerCartStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerCartStore />);
    expect(baseElement).toBeTruthy();
  });
});
