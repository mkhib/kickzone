/**
 * Calculate the discounted unit price matching server-side computation.
 * Server computes: Number((price * (1 - (discount || 0) / 100)).toFixed(2))
 * @param price - Base price in USD
 * @param discount - Discount percentage (e.g., 20 for 20%)
 * @returns Discounted price rounded to 2 decimal places
 */
export function getDiscountedUnitPrice(
  price: number | null | undefined,
  discount: number | null | undefined
): number {
  const basePrice = Number(price) || 0;
  const discountPercent = Number(discount) || 0;

  if (discountPercent <= 0) {
    return Number(basePrice.toFixed(2));
  }

  const discounted = basePrice * (1 - discountPercent / 100);
  return Number(discounted.toFixed(2));
}