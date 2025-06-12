import { render } from '@testing-library/react';

import SellersSetupPassword from './sellers-setup-password';

describe('SellersSetupPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersSetupPassword />);
    expect(baseElement).toBeTruthy();
  });
});
