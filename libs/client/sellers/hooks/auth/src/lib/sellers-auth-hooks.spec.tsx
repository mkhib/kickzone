import { render } from '@testing-library/react';

import SellersAuthHooks from './sellers-auth-hooks';

describe('SellersAuthHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersAuthHooks />);
    expect(baseElement).toBeTruthy();
  });
});
