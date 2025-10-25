import { render } from '@testing-library/react';

import ShippingValidation from './shipping-validation';

describe('ShippingValidation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShippingValidation />);
    expect(baseElement).toBeTruthy();
  });
});
