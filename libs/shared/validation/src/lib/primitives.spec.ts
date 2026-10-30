import { describe, expect, it } from 'vitest';
import {
  passwordSchema,
  trackingNumberSchema,
  positiveIntSchema,
  percentSchema,
  idSchema,
} from './primitives';
import { VALIDATION_LIMITS } from './limits';

describe('primitives', () => {
  describe('passwordSchema', () => {
    it('fails for 7 chars', () => {
      const result = passwordSchema.safeParse('a'.repeat(7));
      expect(result.success).toBe(false);
    });

    it('passes for 8 chars', () => {
      const result = passwordSchema.safeParse('a'.repeat(8));
      expect(result.success).toBe(true);
    });

    it('fails for 129 chars', () => {
      const result = passwordSchema.safeParse('a'.repeat(129));
      expect(result.success).toBe(false);
    });
  });

  describe('trackingNumberSchema', () => {
    it('trims and parses TRK1', () => {
      const result = trackingNumberSchema.safeParse('  TRK1  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('TRK1');
      }
    });

    it('fails for whitespace only', () => {
      const result = trackingNumberSchema.safeParse('   ');
      expect(result.success).toBe(false);
    });

    it('fails for 101 chars', () => {
      const result = trackingNumberSchema.safeParse('a'.repeat(101));
      expect(result.success).toBe(false);
    });

    it('passes for 100 chars', () => {
      const result = trackingNumberSchema.safeParse('a'.repeat(100));
      expect(result.success).toBe(true);
    });
  });

  describe('positiveIntSchema', () => {
    it('fails for 0', () => {
      const result = positiveIntSchema.safeParse(0);
      expect(result.success).toBe(false);
    });

    it('fails for -1', () => {
      const result = positiveIntSchema.safeParse(-1);
      expect(result.success).toBe(false);
    });

    it('fails for 1.5', () => {
      const result = positiveIntSchema.safeParse(1.5);
      expect(result.success).toBe(false);
    });

    it('passes for 1', () => {
      const result = positiveIntSchema.safeParse(1);
      expect(result.success).toBe(true);
    });
  });

  describe('percentSchema', () => {
    it('fails for -1', () => {
      const result = percentSchema.safeParse(-1);
      expect(result.success).toBe(false);
    });

    it('fails for 101', () => {
      const result = percentSchema.safeParse(101);
      expect(result.success).toBe(false);
    });

    it('passes for 0', () => {
      const result = percentSchema.safeParse(0);
      expect(result.success).toBe(true);
    });

    it('passes for 100', () => {
      const result = percentSchema.safeParse(100);
      expect(result.success).toBe(true);
    });
  });

  describe('idSchema', () => {
    it('fails for empty string', () => {
      const result = idSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('fails for whitespace only', () => {
      const result = idSchema.safeParse('  ');
      expect(result.success).toBe(false);
    });
  });

  describe('VALIDATION_LIMITS', () => {
    it('password limits match literals', () => {
      expect(VALIDATION_LIMITS.password.min).toBe(8);
      expect(VALIDATION_LIMITS.password.max).toBe(128);
    });

    it('trackingNumber limits match literals', () => {
      expect(VALIDATION_LIMITS.trackingNumber.min).toBe(1);
      expect(VALIDATION_LIMITS.trackingNumber.max).toBe(100);
    });

    it('cartQuantity limits match literals', () => {
      expect(VALIDATION_LIMITS.cartQuantity.min).toBe(1);
    });

    it('discountPercent limits match literals', () => {
      expect(VALIDATION_LIMITS.discountPercent.min).toBe(0);
      expect(VALIDATION_LIMITS.discountPercent.max).toBe(100);
    });
  });
});