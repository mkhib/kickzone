import { render } from '@testing-library/react';

import AdminProducts from './admin-products';

describe('AdminProducts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminProducts />);
    expect(baseElement).toBeTruthy();
  });
});
