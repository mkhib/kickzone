import { render } from '@testing-library/react';

import CustomerOrderConfirmation from './customer-order-confirmation';

describe('CustomerOrderConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerOrderConfirmation />);
    expect(baseElement).toBeTruthy();
  });
});
