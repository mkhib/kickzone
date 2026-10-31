import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { ProductResolver } from './product.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, ProductResolver, method) ?? {}) as Record<
    string,
    ParamMeta
  >;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

const run = (method: string, value: unknown) => zodPipe(method, 0).transform(value, { type: 'body' });

describe('ProductResolver argument validation', () => {
  const variant = { size: '42', colorIds: [1], weight: 0.8 };
  const product = { name: 'Air Max', sku: 'AM-1', categoryIds: [2], variants: [variant] };

  it('validates createProduct and updateProduct inputs', () => {
    expect(() => run('createProduct', product)).not.toThrow();
    expect(() => run('createProduct', { ...product, name: '' })).toThrow(BadRequestException);
    expect(() => run('updateProduct', { ...product, id: 1 })).not.toThrow();
    expect(() =>
      run('updateProduct', { ...product, id: 1, variants: [{ ...variant, weight: -1 }] })
    ).toThrow(BadRequestException);
  });

  it('validates createProductInfo input', () => {
    expect(() =>
      run('createProductInfo', { productId: 1, size: '42', sizeKind: 'FOOTWEAR', colorIds: [1], weight: 1 })
    ).not.toThrow();
    expect(() => run('createProductInfo', { productId: 1 })).toThrow(BadRequestException);
  });
});