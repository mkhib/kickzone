import { render } from '@testing-library/react';

import AdminSellerManagement from './admin-seller-management';

describe('AdminSellerManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminSellerManagement />);
    expect(baseElement).toBeTruthy();
  });
});
