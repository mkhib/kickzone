import { z } from 'zod';
import { idSchema, trimmedString } from './primitives';

export const CART_LIMITS = {
  quantity: { min: 1, max: 99 },
  color: { max: 50 },
  size: { max: 20 },
} as const;

export const cartQuantitySchema = z
  .number()
  .int()
  .min(CART_LIMITS.quantity.min)
  .max(CART_LIMITS.quantity.max);

export const addToCartSchema = z.object({
  sellerProductId: idSchema,
  quantity: cartQuantitySchema,
});

export const updateCartItemSchema = z.object({
  quantity: cartQuantitySchema.nullish(),
  color: trimmedString(1, CART_LIMITS.color.max).nullish(),
  size: trimmedString(1, CART_LIMITS.size.max).nullish(),
});

export type AddToCartInput = z.input<typeof addToCartSchema>;
export type AddToCartData = z.output<typeof addToCartSchema>;
export type UpdateCartItemInput = z.input<typeof updateCartItemSchema>;
export type UpdateCartItemData = z.output<typeof updateCartItemSchema>;
export type CartQuantityData = z.output<typeof cartQuantitySchema>;