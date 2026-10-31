import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { OrderStatus } from '@kickzone-workspace/entities';
import { ORDER_STATUSES } from '@kickzone-workspace/validation';
import { OrderResolver } from './order.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, OrderResolver, method) ?? {}) as Record<
    string,
    ParamMeta
  >;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

const run = (pipe: PipeTransform, value: unknown) =>
  pipe.transform(value, { type: 'body' });

const item = {
  productId: '101',
  sellerProductId: '301',
  productName: 'Air Jordan 1',
  productImage: null,
  quantity: 1,
  unitPrice: 100,
  totalPrice: 100,
  color: null,
  size: '42',
};

const order = {
  customerName: 'Ali Rezaei',
  customerEmail: '',
  customerPhone: '09121234567',
  shippingAddress: 'Valiasr St, No 12',
  city: 'Tehran',
  state: 'Tehran',
  zipCode: '1234567890',
  country: 'Iran',
  sellerId: 1,
  items: [item],
  notes: '[GuestToken: abc]',
  shippingCost: 0,
};

describe('OrderResolver argument validation pipes', () => {
  it('shared ORDER_STATUSES match the OrderStatus entity enum', () => {
    expect([...ORDER_STATUSES].sort()).toEqual(Object.values(OrderStatus).sort());
  });

  it('createOrder validates createOrderInput', () => {
    const pipe = zodPipe('createOrder', 0);
    expect(() => run(pipe, order)).not.toThrow();
    expect(() => run(pipe, { ...order, items: [] })).toThrow(BadRequestException);
    expect(() => run(pipe, { ...order, customerPhone: '1' })).toThrow(BadRequestException);
  });

  it('updateOrder validates id and updateOrderInput', () => {
    expect(() => run(zodPipe('updateOrder', 1), '')).toThrow(BadRequestException);
    const input = zodPipe('updateOrder', 2);
    expect(() => run(input, { city: 'Shiraz' })).not.toThrow();
    expect(() => run(input, { zipCode: '1' })).toThrow(BadRequestException);
  });

  it('updateOrder pipe keeps items so the resolver can reject item rewrites', () => {
    const out = run(zodPipe('updateOrder', 2), { items: [item] }) as { items?: unknown[] };
    expect(out.items).toHaveLength(1);
  });

  it('updateOrderStatus validates id and status', () => {
    const pipe = zodPipe('updateOrderStatus', 1);
    expect(() => run(pipe, { id: 'o-1', status: 'SHIPPED' })).not.toThrow();
    expect(() => run(pipe, { id: 'o-1', status: 'LOST' })).toThrow(BadRequestException);
  });

  it('cancelPendingOrder and deleteOrder reject an empty id', () => {
    expect(() => run(zodPipe('cancelPendingOrder', 1), ' ')).toThrow(BadRequestException);
    expect(() => run(zodPipe('deleteOrder', 1), '')).toThrow(BadRequestException);
  });
});
