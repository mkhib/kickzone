import { render } from '@testing-library/react';

import SellersHeaderbar from './sellers-headerbar';

describe('SellersHeaderbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersHeaderbar />);
    expect(baseElement).toBeTruthy();
  });
});
