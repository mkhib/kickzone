import { render } from '@testing-library/react';

import SellersAuthContext from './sellers-auth-context';

describe('SellersAuthContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersAuthContext />);
    expect(baseElement).toBeTruthy();
  });
});
