import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { ORDER_STATUSES, updateOrderStatusSchema } from '@kickzone-workspace/validation';

describe('order status dialog uses the shared Zod schema', () => {
  it('accepts every GraphQL order status', () => {
    const statuses = Object.values(KickzoneGraphqlTypes.OrderStatus);
    expect([...statuses].sort()).toEqual([...ORDER_STATUSES].sort());
    for (const status of statuses) {
      expect(updateOrderStatusSchema.safeParse({ id: 'order-1', status }).success).toBe(true);
    }
  });

  it('rejects a missing order id or an unknown status', () => {
    expect(updateOrderStatusSchema.safeParse({ id: '', status: 'PENDING' }).success).toBe(false);
    expect(updateOrderStatusSchema.safeParse({ id: 'order-1', status: 'LOST' }).success).toBe(false);
  });
});
