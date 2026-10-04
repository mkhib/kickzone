import { render } from '@testing-library/react';

import AdminCustomerManagement from './admin-customer-management';

describe('AdminCustomerManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminCustomerManagement />);
    expect(baseElement).toBeTruthy();
  });
});
