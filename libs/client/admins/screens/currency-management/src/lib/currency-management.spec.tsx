import { render } from '@testing-library/react';

import CurrencyManagement from './currency-management';

describe('CurrencyManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencyManagement />);
    expect(baseElement).toBeTruthy();
  });
});
