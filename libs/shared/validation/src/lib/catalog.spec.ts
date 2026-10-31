import {
  createProductInfoSchema,
  createProductSchema,
  productEditorFormSchema,
  productVariantSchema,
  updateProductSchema,
} from './catalog';

const variant = { size: '42', sizeKind: 'FOOTWEAR', colorIds: [1], weight: 0.8 };
const product = { name: 'Air Max', sku: 'AM-1', categoryIds: [2], brandId: null, variants: [variant] };

describe('catalog schemas', () => {
  it('accepts valid products and variants with optional fields as null', () => {
    expect(createProductSchema.safeParse(product).success).toBe(true);
    expect(updateProductSchema.safeParse({ ...product, id: 9, descriptions: [{ languageCode: 'fa', description: 'x' }] }).success).toBe(true);
    expect(productVariantSchema.safeParse({ ...variant, price: null, discount: 0, stockQuantity: 0 }).success).toBe(true);
  });

  it('rejects missing names/skus and invalid variants with the existing messages', () => {
    expect(createProductSchema.safeParse({ ...product, sku: '' }).success).toBe(false);
    expect(updateProductSchema.safeParse(product).success).toBe(false);
    const bad = productVariantSchema.safeParse({ ...variant, size: '', weight: 0, discount: 120, stockQuantity: -1 });
    expect(bad.success ? [] : bad.error.issues.map((i) => i.message)).toEqual([
      'Variant size is required',
      'Weight must be greater than 0',
      'Discount cannot exceed 100',
      'Stock quantity cannot be negative',
    ]);
  });

  it('validates product infos', () => {
    expect(createProductInfoSchema.safeParse({ productId: 1, size: 'M', sizeKind: 'APPAREL', colorIds: [], weight: 1 }).success).toBe(true);
    expect(createProductInfoSchema.safeParse({ productId: 1, size: 'M' }).success).toBe(false);
  });
});
describe('productEditorFormSchema', () => {
  const form = {
    name: 'Air Max',
    sku: 'AM-1',
    categoryIds: [2],
    variants: [{ size: '42', colorIds: [1], weight: 0.8 }],
  };
  const paths = (v: unknown) => {
    const r = productEditorFormSchema.safeParse(v);
    return r.success ? [] : r.error.issues.map((i) => i.path.join('.'));
  };

  it('accepts a complete product', () => {
    expect(paths(form)).toEqual([]);
  });

  it('requires name, a non-blank sku and a category', () => {
    expect(paths({ ...form, name: '', sku: '  ', categoryIds: [] })).toEqual(['name', 'sku', 'categoryIds']);
  });

  it('requires each variant to have a size, a color and a positive weight', () => {
    expect(paths({ ...form, variants: [{ size: '', colorIds: [], weight: 0 }] })).toEqual([
      'variants.0.size',
      'variants.0.colorIds',
      'variants.0.weight',
    ]);
  });
});