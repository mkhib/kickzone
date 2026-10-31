import { z } from 'zod';

/**
 * Seller and seller-product rules. They mirror the former class-validator
 * decorators on the GraphQL inputs so nothing that is accepted today is rejected.
 */
const requiredText = z.string().min(1);
const optionalText = z.string().nullish();
const optionalFlag = z.boolean().nullish();

export const createSellerSchema = z.object({
  name: requiredText,
  lastName: requiredText,
  username: requiredText,
  email: z.email(),
  password: requiredText,
  storeName: requiredText,
  phone: optionalText,
  address: optionalText,
  shippingFee: z.number().nullish(),
  canManageCatalog: optionalFlag,
});

export const updateSellerSchema = z.object({
  id: z.number().int(),
  name: optionalText,
  lastName: optionalText,
  username: optionalText,
  email: z.email().nullish(),
  storeName: optionalText,
  phone: optionalText,
  address: optionalText,
  shippingFee: z.number().nullish(),
  isActive: optionalFlag,
  canManageCatalog: optionalFlag,
});

export const SELLER_PRODUCT_LIMITS = {
  discount: { min: 0, max: 100 },
} as const;

const price = z.number().positive();
const costPrice = z.number().min(0);
const discount = z
  .number()
  .min(SELLER_PRODUCT_LIMITS.discount.min)
  .max(SELLER_PRODUCT_LIMITS.discount.max);
const stockQuantity = z.number().int().min(0);

export const createSellerProductSchema = z.object({
  productInfoId: z.number().positive(),
  price,
  costPrice,
  discount,
  stockQuantity,
  recommended: optionalFlag,
  boxLess: optionalFlag,
});

export const updateSellerProductSchema = z.object({
  id: requiredText,
  productInfoId: z.number().positive().nullish(),
  price: price.nullish(),
  costPrice: costPrice.nullish(),
  discount: discount.nullish(),
  stockQuantity: stockQuantity.nullish(),
  recommended: optionalFlag,
  boxLess: optionalFlag,
});

/** Seller product editor: the server rules plus a positive cost price. */
export const sellerProductFormSchema = createSellerProductSchema.extend({
  costPrice: z.number().positive(),
});

/** Admin seller form: blank or a non-negative shipping fee (typed as text). */
const sellerFeeSchema = z
  .union([z.number(), z.string()])
  .nullish()
  .refine((v) => v == null || v === '' || (Number.isFinite(Number(v)) && Number(v) >= 0));
const formEmail = z.string().trim().pipe(z.email());

/** Admin seller create form. */
export const sellerCreateFormSchema = z.object({
  name: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  username: z.string().trim().min(1),
  email: formEmail,
  storeName: z.string().trim().min(1),
  phone: z.string().nullish(),
  address: z.string().nullish(),
  shippingFee: sellerFeeSchema,
  canManageCatalog: optionalFlag,
});

/** Admin seller edit form: blank fields are left unchanged. */
export const sellerEditFormSchema = z.object({
  name: z.string().nullish(),
  lastName: z.string().nullish(),
  username: z.string().nullish(),
  email: z.union([z.literal(''), formEmail]).nullish(),
  storeName: z.string().nullish(),
  phone: z.string().nullish(),
  address: z.string().nullish(),
  shippingFee: sellerFeeSchema,
  canManageCatalog: optionalFlag,
});

export type SellerCreateFormInput = z.input<typeof sellerCreateFormSchema>;
export type SellerEditFormInput = z.input<typeof sellerEditFormSchema>;
export type CreateSellerData = z.output<typeof createSellerSchema>;
export type UpdateSellerData = z.output<typeof updateSellerSchema>;
export type CreateSellerProductData = z.output<typeof createSellerProductSchema>;
export type UpdateSellerProductData = z.output<typeof updateSellerProductSchema>;
export type SellerProductFormInput = z.input<typeof sellerProductFormSchema>;