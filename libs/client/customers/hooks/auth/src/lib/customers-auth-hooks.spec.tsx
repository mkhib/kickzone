import { render } from '@testing-library/react';

import CustomersAuthHooks from './customers-auth-hooks';

describe('CustomersAuthHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomersAuthHooks />);
    expect(baseElement).toBeTruthy();
  });
});
