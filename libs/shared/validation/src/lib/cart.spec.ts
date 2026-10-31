import { describe, expect, it } from 'vitest';
import {
  CART_LIMITS,
  cartQuantitySchema,
  addToCartSchema,
  updateCartItemSchema,
} from './cart';

describe('cart validation schemas', () => {
  describe('cartQuantitySchema', () => {
    it('accepts 1', () => {
      const result = cartQuantitySchema.safeParse(1);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(1);
      }
    });

    it('accepts 99', () => {
      const result = cartQuantitySchema.safeParse(99);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(99);
      }
    });

    it('rejects 0', () => {
      const result = cartQuantitySchema.safeParse(0);
      expect(result.success).toBe(false);
    });

    it('rejects -1', () => {
      const result = cartQuantitySchema.safeParse(-1);
      expect(result.success).toBe(false);
    });

    it('rejects 1.5 (non-integer)', () => {
      const result = cartQuantitySchema.safeParse(1.5);
      expect(result.success).toBe(false);
    });

    it('rejects 100', () => {
      const result = cartQuantitySchema.safeParse(100);
      expect(result.success).toBe(false);
    });
  });

  describe('addToCartSchema', () => {
    const validInput = { sellerProductId: 'sp-1', quantity: 1 };

    it('accepts valid input (happy path)', () => {
      const result = addToCartSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sellerProductId).toBe('sp-1');
        expect(result.data.quantity).toBe(1);
      }
    });

    it('accepts max quantity 99', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: 'sp-1', quantity: 99 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quantity).toBe(99);
      }
    });

    it('rejects quantity 0', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: 'sp-1', quantity: 0 });
      expect(result.success).toBe(false);
    });

    it('rejects quantity -1', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: 'sp-1', quantity: -1 });
      expect(result.success).toBe(false);
    });

    it('rejects quantity 1.5 (non-integer)', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: 'sp-1', quantity: 1.5 });
      expect(result.success).toBe(false);
    });

    it('rejects quantity 100', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: 'sp-1', quantity: 100 });
      expect(result.success).toBe(false);
    });

    it('rejects empty sellerProductId', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: '', quantity: 1 });
      expect(result.success).toBe(false);
    });

    it('rejects whitespace-only sellerProductId', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: '  ', quantity: 1 });
      expect(result.success).toBe(false);
    });

    it('trims sellerProductId', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: '  sp-1  ', quantity: 1 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sellerProductId).toBe('sp-1');
      }
    });
  });

  describe('updateCartItemSchema', () => {
    it('accepts empty object', () => {
      const result = updateCartItemSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({});
      }
    });

    it('accepts all-null', () => {
      const result = updateCartItemSchema.safeParse({ quantity: null, color: null, size: null });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ quantity: null, color: null, size: null });
      }
    });

    it('trims color', () => {
      const result = updateCartItemSchema.safeParse({ color: '  red  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.color).toBe('red');
      }
    });

    it('trims size', () => {
      const result = updateCartItemSchema.safeParse({ size: '  M  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.size).toBe('M');
      }
    });

    it('rejects quantity 0', () => {
      const result = updateCartItemSchema.safeParse({ quantity: 0 });
      expect(result.success).toBe(false);
    });

    it('rejects empty color after trim', () => {
      const result = updateCartItemSchema.safeParse({ color: '   ' });
      expect(result.success).toBe(false);
    });

    it('rejects 51-char color', () => {
      const result = updateCartItemSchema.safeParse({ color: 'a'.repeat(51) });
      expect(result.success).toBe(false);
    });

    it('accepts 50-char color', () => {
      const result = updateCartItemSchema.safeParse({ color: 'a'.repeat(50) });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.color).toBe('a'.repeat(50));
      }
    });

    it('rejects 21-char size', () => {
      const result = updateCartItemSchema.safeParse({ size: 'a'.repeat(21) });
      expect(result.success).toBe(false);
    });

    it('accepts 20-char size', () => {
      const result = updateCartItemSchema.safeParse({ size: 'a'.repeat(20) });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.size).toBe('a'.repeat(20));
      }
    });

    it('accepts valid color and size', () => {
      const result = updateCartItemSchema.safeParse({ color: 'blue', size: 'L' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.color).toBe('blue');
        expect(result.data.size).toBe('L');
      }
    });

    it('accepts valid quantity', () => {
      const result = updateCartItemSchema.safeParse({ quantity: 5 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quantity).toBe(5);
      }
    });
  });

  describe('CART_LIMITS constant', () => {
    it('has correct values', () => {
      expect(CART_LIMITS.quantity.min).toBe(1);
      expect(CART_LIMITS.quantity.max).toBe(99);
      expect(CART_LIMITS.color.max).toBe(50);
      expect(CART_LIMITS.size.max).toBe(20);
    });
  });
});