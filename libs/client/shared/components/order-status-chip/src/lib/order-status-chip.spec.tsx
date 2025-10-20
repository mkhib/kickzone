import { render } from '@testing-library/react';

import OrderStatusChip from './order-status-chip';

describe('OrderStatusChip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderStatusChip />);
    expect(baseElement).toBeTruthy();
  });
});
