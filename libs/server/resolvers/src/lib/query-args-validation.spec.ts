import { BadRequestException, PipeTransform, Type } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { OrderResolver } from './order.resolver';
import { ProductResolver } from './product.resolver';
import { SellerResolver } from './seller-info.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(cls: Type<unknown>, method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, cls, method) ?? {}) as Record<string, ParamMeta>;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

const run = (cls: Type<unknown>, method: string, index: number, value: unknown) =>
  zodPipe(cls, method, index).transform(value, { type: 'body' });

describe('pagination, id and filter argument validation', () => {
  it.each([
    ['orders', 1, 2],
    ['myOrders', 1, 2],
    ['mySellerOrders', 1, 2],
    ['adminSellerOrders', 2, 3],
    ['allSellerOrders', 1, 2],
  ])('OrderResolver.%s bounds first/after', (method, firstIdx, afterIdx) => {
    expect(() => run(OrderResolver, method, firstIdx, 10)).not.toThrow();
    expect(() => run(OrderResolver, method, firstIdx, 0)).toThrow(BadRequestException);
    expect(() => run(OrderResolver, method, firstIdx, 1000)).toThrow(BadRequestException);
    expect(() => run(OrderResolver, method, afterIdx, undefined)).not.toThrow();
    expect(() => run(OrderResolver, method, afterIdx, 'x'.repeat(501))).toThrow(BadRequestException);
  });

  it('validates order ids, seller ids and tracking numbers', () => {
    expect(() => run(OrderResolver, 'order', 1, 'order-1')).not.toThrow();
    expect(() => run(OrderResolver, 'order', 1, ' ')).toThrow(BadRequestException);
    expect(() => run(OrderResolver, 'orders', 3, undefined)).not.toThrow();
    expect(() => run(OrderResolver, 'adminSellerOrders', 1, '')).toThrow(BadRequestException);
    expect(() => run(OrderResolver, 'updateOrderTracking', 1, 'order-1')).not.toThrow();
    expect(() => run(OrderResolver, 'updateOrderTracking', 2, 'TRK123')).not.toThrow();
    expect(() => run(OrderResolver, 'updateOrderTracking', 2, 'x'.repeat(101))).toThrow(BadRequestException);
  });

  it('validates product and seller filters', () => {
    const many = Array.from({ length: 101 }, (_, i) => i);
    expect(() => run(ProductResolver, 'products', 0, undefined)).not.toThrow();
    expect(() => run(ProductResolver, 'products', 0, { first: 200, onlyInStock: true })).not.toThrow();
    expect(() => run(ProductResolver, 'products', 0, { ids: many })).toThrow(BadRequestException);
    expect(() => run(ProductResolver, 'sellerProductsForMe', 1, { first: 500 })).toThrow(BadRequestException);
    expect(() => run(SellerResolver, 'sellers', 1, { ids: [1, 2] })).not.toThrow();
    expect(() => run(SellerResolver, 'sellers', 1, { ids: many })).toThrow(BadRequestException);
    expect(() => run(SellerResolver, 'sellers', 2, 100)).not.toThrow();
    expect(() => run(SellerResolver, 'sellerProductsForMe', 1, { sortOrder: 'up' })).toThrow(BadRequestException);
  });
});