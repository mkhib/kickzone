import { z } from 'zod';
import { idSchema, positiveIntSchema, trackingNumberSchema } from './primitives';
import { emailSchema } from './auth';
import { CART_LIMITS, cartQuantitySchema } from './cart';

/**
 * Shipping / order limits. They mirror the existing customer checkout form rules
 * so the server never rejects what the storefront already accepts.
 */
export const ORDER_LIMITS = {
  name: { min: 2, max: 100 },
  phone: { pattern: /^[+]?[\d\s\-()]{7,15}$/ },
  address: { min: 3, max: 200 },
  city: { min: 2, max: 100 },
  state: { min: 2, max: 100 },
  zipCode: { min: 3, max: 20, pattern: /^[a-zA-Z0-9\s-]+$/ },
  country: { min: 2, max: 100 },
  notes: { max: 2000 },
  productName: { max: 300 },
  productImage: { max: 2048 },
  items: { min: 1, max: 100 },
} as const;

export const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
] as const;

const lettersPattern = /^[\p{L}\s'-]+$/u;

export const shippingNameSchema = z
  .string()
  .trim()
  .min(ORDER_LIMITS.name.min)
  .max(ORDER_LIMITS.name.max)
  .regex(lettersPattern);

export const shippingPhoneSchema = z.string().trim().regex(ORDER_LIMITS.phone.pattern);

/** Email is optional at checkout: empty string or a valid address. */
export const optionalEmailSchema = z.union([z.literal(''), emailSchema]);

export const shippingAddressSchema = z.object({
  customerName: shippingNameSchema,
  customerEmail: optionalEmailSchema,
  customerPhone: shippingPhoneSchema,
  shippingAddress: z
    .string()
    .trim()
    .min(ORDER_LIMITS.address.min)
    .max(ORDER_LIMITS.address.max),
  city: z
    .string()
    .trim()
    .min(ORDER_LIMITS.city.min)
    .max(ORDER_LIMITS.city.max)
    .regex(lettersPattern),
  state: z
    .string()
    .trim()
    .min(ORDER_LIMITS.state.min)
    .max(ORDER_LIMITS.state.max)
    .regex(lettersPattern),
  zipCode: z
    .string()
    .trim()
    .min(ORDER_LIMITS.zipCode.min)
    .max(ORDER_LIMITS.zipCode.max)
    .regex(ORDER_LIMITS.zipCode.pattern),
  country: z
    .string()
    .trim()
    .min(ORDER_LIMITS.country.min)
    .max(ORDER_LIMITS.country.max),
});

const moneySchema = z.number().finite().min(0);

export const orderItemSchema = z.object({
  productId: idSchema,
  sellerProductId: idSchema.nullish(),
  productName: z.string().trim().min(1).max(ORDER_LIMITS.productName.max),
  productImage: z.string().max(ORDER_LIMITS.productImage.max).nullish(),
  quantity: cartQuantitySchema,
  unitPrice: moneySchema,
  totalPrice: moneySchema,
  color: z.string().trim().max(CART_LIMITS.color.max).nullish(),
  size: z.string().trim().max(CART_LIMITS.size.max).nullish(),
});

export const createOrderSchema = shippingAddressSchema.extend({
  sellerId: positiveIntSchema,
  items: z
    .array(orderItemSchema)
    .min(ORDER_LIMITS.items.min)
    .max(ORDER_LIMITS.items.max),
  notes: z.string().max(ORDER_LIMITS.notes.max).nullish(),
  shippingCost: moneySchema.nullish(),
});

export const updateOrderItemSchema = orderItemSchema.extend({
  id: idSchema.nullish(),
});

/** Admin order edit: every field optional; items are kept so the resolver can still reject them. */
export const updateOrderSchema = z.object({
  customerName: shippingNameSchema.nullish(),
  customerEmail: optionalEmailSchema.nullish(),
  customerPhone: shippingPhoneSchema.nullish(),
  shippingAddress: shippingAddressSchema.shape.shippingAddress.nullish(),
  city: shippingAddressSchema.shape.city.nullish(),
  state: shippingAddressSchema.shape.state.nullish(),
  zipCode: shippingAddressSchema.shape.zipCode.nullish(),
  country: shippingAddressSchema.shape.country.nullish(),
  items: z.array(updateOrderItemSchema).nullish(),
  notes: z.string().max(ORDER_LIMITS.notes.max).nullish(),
  trackingNumber: trackingNumberSchema.nullish(),
});

export const updateOrderStatusSchema = z.object({
  id: idSchema,
  status: z.enum(ORDER_STATUSES),
});

export type ShippingAddressInput = z.input<typeof shippingAddressSchema>;
export type ShippingAddressData = z.output<typeof shippingAddressSchema>;
export type OrderItemData = z.output<typeof orderItemSchema>;
export type CreateOrderData = z.output<typeof createOrderSchema>;
export type UpdateOrderData = z.output<typeof updateOrderSchema>;
export type UpdateOrderStatusData = z.output<typeof updateOrderStatusSchema>;
export type OrderStatusValue = (typeof ORDER_STATUSES)[number];
