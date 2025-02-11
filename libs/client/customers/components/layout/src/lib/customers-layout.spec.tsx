import { render } from '@testing-library/react';

import CustomersLayout from './customers-layout';

describe('CustomersLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomersLayout />);
    expect(baseElement).toBeTruthy();
  });
});
