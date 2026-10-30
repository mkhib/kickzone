export const VALIDATION_LIMITS = {
  password: { min: 8, max: 128 },
  trackingNumber: { min: 1, max: 100 },
  cartQuantity: { min: 1 },
  discountPercent: { min: 0, max: 100 },
} as const;

export type ValidationLimits = typeof VALIDATION_LIMITS;