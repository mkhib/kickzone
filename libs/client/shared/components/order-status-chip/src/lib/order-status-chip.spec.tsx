import { render } from '@testing-library/react';
import { vi } from 'vitest';
import OrderStatusChip from './order-status-chip';

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      orders: {
        pending: () => 'Pending',
        confirmed: () => 'Confirmed',
        processing: () => 'Processing',
        shipped: () => 'Shipped',
        delivered: () => 'Delivered',
        cancelled: () => 'Cancelled',
        refunded: () => 'Refunded',
      },
    },
  }),
}));

describe('OrderStatusChip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderStatusChip status="PENDING" />);
    expect(baseElement).toBeTruthy();
  });
});
