import { render } from '@testing-library/react';

import SellersRouter from './sellers-router';

describe('SellersRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersRouter />);
    expect(baseElement).toBeTruthy();
  });
});
