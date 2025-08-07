import { render } from '@testing-library/react';

import SellersUnauthorizedScreen from './sellers-unauthorized-screen';

describe('SellersUnauthorizedScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersUnauthorizedScreen />);
    expect(baseElement).toBeTruthy();
  });
});
