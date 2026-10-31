import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { SellerResolver } from './seller-info.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, SellerResolver, method) ?? {}) as Record<
    string,
    ParamMeta
  >;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

const run = (method: string, index: number, value: unknown) =>
  zodPipe(method, index).transform(value, { type: 'body' });

describe('SellerResolver argument validation', () => {
  const product = { productInfoId: 3, price: 150, costPrice: 100, discount: 10, stockQuantity: 2 };

  it('validates seller create/update inputs', () => {
    expect(() =>
      run('createSeller', 0, {
        name: 'A', lastName: 'B', username: 'ab', email: 'a@b.co', password: 'x', storeName: 'S',
      })
    ).not.toThrow();
    expect(() => run('createSeller', 0, { name: 'A' })).toThrow(BadRequestException);
    expect(() => run('updateSeller', 0, { id: 1, email: 'bad' })).toThrow(BadRequestException);
  });

  it.each([
    ['createSellerProduct', 1],
    ['createMySellerProduct', 1],
  ])('%s validates the product input', (method, index) => {
    expect(() => run(method, index, product)).not.toThrow();
    expect(() => run(method, index, { ...product, discount: 150 })).toThrow(BadRequestException);
  });

  it.each([
    ['updateSellerProduct', 1],
    ['updateMySellerProduct', 1],
  ])('%s validates the product update', (method, index) => {
    expect(() => run(method, index, { id: 'sp1', price: 10 })).not.toThrow();
    expect(() => run(method, index, { id: 'sp1', stockQuantity: -1 })).toThrow(BadRequestException);
  });
});