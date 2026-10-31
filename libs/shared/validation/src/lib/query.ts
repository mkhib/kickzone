import { z } from 'zod';
import { idSchema } from './primitives';

/** Query argument limits (largest client page size today is 200). */
export const QUERY_LIMITS = {
  first: { min: 1, max: 200 },
  cursor: { max: 500 },
  filterArray: { max: 100 },
  text: { max: 200 },
  sort: { max: 50 },
} as const;

export const paginationFirstSchema = z
  .number()
  .int()
  .min(QUERY_LIMITS.first.min)
  .max(QUERY_LIMITS.first.max);
export const cursorSchema = z.string().max(QUERY_LIMITS.cursor.max).nullish();
export const optionalIdSchema = idSchema.nullish();

const text = z.string().max(QUERY_LIMITS.text.max);
const list = <T extends z.ZodType>(item: T) => z.array(item).max(QUERY_LIMITS.filterArray.max).nullish();
const flag = z.boolean().nullish();

export const productInfoFilterSchema = z.object({
  size: list(text),
  sizeKind: z.string().nullish(),
  price: list(z.number()),
  costPrice: list(z.number()),
  colorId: list(z.number().int()),
  weight: list(z.number()),
  discount: list(z.number()),
  stockQuantity: list(z.number().int()),
});

export const productFilterSchema = z
  .object({
    category: text.nullish(),
    categorySlugs: list(text),
    brand: text.nullish(),
    brands: list(text),
    ids: list(z.number().int()),
    searchTerm: text.nullish(),
    productInfoFilter: productInfoFilterSchema.nullish(),
    categoryIds: list(z.number().int()),
    first: paginationFirstSchema.nullish(),
    after: cursorSchema,
    categoryId: z.number().int().nullish(),
    sort: z.string().max(QUERY_LIMITS.sort.max).nullish(),
    sortOrder: z.enum(['asc', 'desc']).nullish(),
    archivedStatus: z.string().nullish(),
    sellerId: z.number().int().nullish(),
    onlyWithSellers: flag,
    onlyInStock: flag,
    onlyDiscounted: flag,
  })
  .nullish();

export const sellerFilterSchema = z
  .object({
    searchTerm: text.nullish(),
    isActive: flag,
    ids: list(z.number().int()),
    first: paginationFirstSchema.nullish(),
    after: cursorSchema,
  })
  .nullish();