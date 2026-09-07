import { render } from '@testing-library/react';

import { ShippingValidation } from './shipping-validation.tsx';

describe('ShippingValidation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShippingValidation />);
    expect(baseElement).toBeTruthy();
  });
});
