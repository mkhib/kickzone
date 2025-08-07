import { render } from '@testing-library/react';

import CustomersUnauthorizedScreen from './customers-unauthorized-screen';

describe('CustomersUnauthorizedScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomersUnauthorizedScreen />);
    expect(baseElement).toBeTruthy();
  });
});
