import { render } from '@testing-library/react';

import PriceDisplay from './price-display';

describe('PriceDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PriceDisplay />);
    expect(baseElement).toBeTruthy();
  });
});
