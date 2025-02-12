import { render } from '@testing-library/react';

import SellersLoginScreen from './sellers-login-screen';

describe('SellersLoginScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersLoginScreen />);
    expect(baseElement).toBeTruthy();
  });
});
