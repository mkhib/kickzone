import { z } from 'zod';
import { shippingAddressSchema, shippingPhoneSchema } from './order';

export const PROFILE_LIMITS = {
  clothingSize: { max: 20 },
  shoeSize: { max: 20 },
  favorites: { max: 20000 },
} as const;

/** Profile fields may be cleared: accept an empty string or a valid value. */
const clearable = <T extends z.ZodType<string>>(schema: T) =>
  z.union([z.literal(''), schema]).nullish();

const shape = shippingAddressSchema.shape;

export const updateCustomerProfileSchema = z.object({
  phone: clearable(shippingPhoneSchema),
  address: clearable(shape.shippingAddress),
  city: clearable(shape.city),
  state: clearable(shape.state),
  zipCode: clearable(shape.zipCode),
  country: clearable(shape.country),
  clothingSize: z.string().trim().max(PROFILE_LIMITS.clothingSize.max).nullish(),
  shoeSize: z.string().trim().max(PROFILE_LIMITS.shoeSize.max).nullish(),
  favorites: z.string().max(PROFILE_LIMITS.favorites.max).nullish(),
});

/** Profile screen: address modal. */
export const profileAddressFormSchema = z.object({
  state: clearable(shape.state),
  city: clearable(shape.city),
  address: clearable(shape.shippingAddress),
  zipCode: clearable(shape.zipCode),
  phone: clearable(shippingPhoneSchema),
  country: clearable(shape.country),
});

/** Profile screen: personal info modal (only the phone is editable). */
export const profilePhoneFormSchema = z.object({
  phone: clearable(shippingPhoneSchema),
});

export type UpdateCustomerProfileData = z.output<typeof updateCustomerProfileSchema>;
export type ProfileAddressFormInput = z.input<typeof profileAddressFormSchema>;
export type ProfilePhoneFormInput = z.input<typeof profilePhoneFormSchema>;
