import { z } from 'zod';

/**
 * Catalog product rules. They mirror the class-validator decorators on the
 * product GraphQL inputs so nothing that is accepted today is rejected.
 * (`sizeKind` is already restricted to the SizeKind enum by GraphQL.)
 */
const requiredText = z.string().min(1);

export const productDescriptionSchema = z.object({
  languageId: z.number().nullish(),
  languageCode: z.string().nullish(),
  description: requiredText,
});

export const productVariantSchema = z.object({
  id: z.number().nullish(),
  size: z.string().min(1, 'Variant size is required'),
  sizeKind: z.string().nullish(),
  colorIds: z.array(z.number().int()),
  weight: z.number().positive('Weight must be greater than 0'),
  sku: z.string().nullish(),
  price: z.number().min(0, 'Price cannot be negative').nullish(),
  costPrice: z.number().min(0, 'Cost price cannot be negative').nullish(),
  discount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100')
    .nullish(),
  stockQuantity: z.number().int().min(0, 'Stock quantity cannot be negative').nullish(),
  boxLess: z.boolean().nullish(),
  images: z.array(z.string()).nullish(),
});

export const createProductSchema = z.object({
  name: requiredText,
  sku: requiredText,
  categoryIds: z.array(z.number().int()),
  brandId: z.number().int().nullish(),
  description: z.string().nullish(),
  descriptions: z.array(productDescriptionSchema).nullish(),
  variants: z.array(productVariantSchema).nullish(),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.number(),
});

export const createProductInfoSchema = z.object({
  productId: z.number().int(),
  size: z.string(),
  sizeKind: z.string(),
  colorIds: z.array(z.number().int()),
  weight: z.number(),
});

export type ProductVariantData = z.output<typeof productVariantSchema>;
export type CreateProductData = z.output<typeof createProductSchema>;
export type UpdateProductData = z.output<typeof updateProductSchema>;
export type CreateProductInfoData = z.output<typeof createProductInfoSchema>;