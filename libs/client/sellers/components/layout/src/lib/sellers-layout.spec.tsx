import { render } from '@testing-library/react';

import SellersLayout from './sellers-layout';

describe('SellersLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersLayout />);
    expect(baseElement).toBeTruthy();
  });
});
