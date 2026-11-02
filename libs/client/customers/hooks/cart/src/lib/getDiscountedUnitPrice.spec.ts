import { describe, expect, it } from '@jest/globals';
import { getDiscountedUnitPrice } from './getDiscountedUnitPrice';

describe('getDiscountedUnitPrice', () => {
  it('returns price rounded to 2dp when no discount', () => {
    expect(getDiscountedUnitPrice(100, 0)).toBe(100);
    expect(getDiscountedUnitPrice(100.123, 0)).toBe(100.12);
    expect(getDiscountedUnitPrice(100.126, 0)).toBe(100.13);
    expect(getDiscountedUnitPrice(100, undefined)).toBe(100);
    expect(getDiscountedUnitPrice(100, null)).toBe(100);
  });

  it('applies 20% discount and rounds to 2dp', () => {
    expect(getDiscountedUnitPrice(100, 20)).toBe(80);
    expect(getDiscountedUnitPrice(100.123, 20)).toBe(80.1);
    expect(getDiscountedUnitPrice(99.99, 20)).toBe(79.99);
    expect(getDiscountedUnitPrice(50, 20)).toBe(40);
  });

  it('handles rounding edge cases to 2dp', () => {
    expect(getDiscountedUnitPrice(100, 33)).toBe(67);
    expect(getDiscountedUnitPrice(100, 33.33)).toBe(66.67);
    expect(getDiscountedUnitPrice(100, 10)).toBe(90);
    expect(getDiscountedUnitPrice(10, 50)).toBe(5);
    expect(getDiscountedUnitPrice(0.01, 10)).toBe(0.01);
  });

  it('handles null/undefined discount as no discount', () => {
    expect(getDiscountedUnitPrice(100, undefined)).toBe(100);
    expect(getDiscountedUnitPrice(100, null)).toBe(100);
    expect(getDiscountedUnitPrice(100, NaN)).toBe(100);
  });

  it('handles null/undefined price as 0', () => {
    expect(getDiscountedUnitPrice(null, 20)).toBe(0);
    expect(getDiscountedUnitPrice(undefined, 20)).toBe(0);
    expect(getDiscountedUnitPrice(NaN, 20)).toBe(0);
  });

  it('handles negative discount as no discount', () => {
    expect(getDiscountedUnitPrice(100, -10)).toBe(100);
    expect(getDiscountedUnitPrice(100, -5)).toBe(100);
  });

  it('handles 100% discount', () => {
    expect(getDiscountedUnitPrice(100, 100)).toBe(0);
  });

  it('handles discount over 100%', () => {
    expect(getDiscountedUnitPrice(100, 150)).toBe(-50);
  });
});