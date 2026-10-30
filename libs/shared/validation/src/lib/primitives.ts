import { z } from 'zod';
import { VALIDATION_LIMITS } from './limits';

export function trimmedString(min: number, max: number) {
  return z.string().trim().min(min).max(max);
}

export const passwordSchema = z
  .string()
  .min(VALIDATION_LIMITS.password.min)
  .max(VALIDATION_LIMITS.password.max);

export const trackingNumberSchema = trimmedString(
  VALIDATION_LIMITS.trackingNumber.min,
  VALIDATION_LIMITS.trackingNumber.max
);

export const positiveIntSchema = z.number().int().min(1);

export const percentSchema = z.number().min(0).max(100);

export const idSchema = z.string().trim().min(1);