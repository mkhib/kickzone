import { render } from '@testing-library/react';

import CustomersGraphql from './customers-graphql';

describe('CustomersGraphql', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomersGraphql />);
    expect(baseElement).toBeTruthy();
  });
});
