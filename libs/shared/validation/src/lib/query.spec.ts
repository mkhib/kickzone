import {
  cursorSchema,
  optionalIdSchema,
  paginationFirstSchema,
  productFilterSchema,
  sellerFilterSchema,
} from './query';

const ok = (s: { safeParse: (v: unknown) => { success: boolean } }, v: unknown) => s.safeParse(v).success;

describe('query argument schemas', () => {
  it('bounds page sizes and cursors', () => {
    for (const n of [1, 10, 100, 200]) expect(ok(paginationFirstSchema, n)).toBe(true);
    for (const n of [0, -1, 201, 2.5]) expect(ok(paginationFirstSchema, n)).toBe(false);
    expect(ok(cursorSchema, undefined)).toBe(true);
    expect(ok(cursorSchema, 'x'.repeat(501))).toBe(false);
    expect(ok(optionalIdSchema, null)).toBe(true);
    expect(ok(optionalIdSchema, ' ')).toBe(false);
  });

  it('accepts the filters the storefront sends today', () => {
    expect(ok(productFilterSchema, undefined)).toBe(true);
    expect(
      ok(productFilterSchema, {
        first: 200,
        onlyInStock: true,
        onlyWithSellers: true,
        archivedStatus: 'ACTIVE',
        categorySlugs: ['t-shirts', 'sneakers'],
        brands: ['nike'],
        sortOrder: 'desc',
        productInfoFilter: { size: ['42'], colorId: [1, 2] },
      })
    ).toBe(true);
    expect(ok(sellerFilterSchema, { ids: [1, 2], first: 100 })).toBe(true);
  });

  it('rejects oversized filter arrays and bad sort orders', () => {
    const many = Array.from({ length: 101 }, (_, i) => i);
    expect(ok(productFilterSchema, { ids: many })).toBe(false);
    expect(ok(productFilterSchema, { productInfoFilter: { colorId: many } })).toBe(false);
    expect(ok(productFilterSchema, { sortOrder: 'sideways' })).toBe(false);
    expect(ok(sellerFilterSchema, { ids: many })).toBe(false);
  });
});