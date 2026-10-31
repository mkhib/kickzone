import { describe, expect, it } from 'vitest';
import {
  customerLoginFormSchema,
  customerResetPasswordFormSchema,
  sellerLoginFormSchema,
  sellerSetupPasswordFormSchema,
} from './auth-forms';

describe('Seller form schemas reference Customer form schemas (no duplication)', () => {
  it('sellerLoginFormSchema === customerLoginFormSchema (same object reference)', () => {
    expect(sellerLoginFormSchema).toBe(customerLoginFormSchema);
  });

  it('sellerSetupPasswordFormSchema === customerResetPasswordFormSchema (same object reference)', () => {
    expect(sellerSetupPasswordFormSchema).toBe(customerResetPasswordFormSchema);
  });

  describe('sellerLoginFormSchema behavior mirrors customerLoginFormSchema', () => {
    it('accepts valid email and short password (legacy)', () => {
      const result = sellerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: 'abc',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('ann@example.com');
        expect(result.data.password).toBe('abc');
      }
    });

    it('trims email and preserves case', () => {
      const result = sellerLoginFormSchema.safeParse({
        email: '  Ann@Example.com  ',
        password: 'abc',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('Ann@Example.com');
        expect(result.data.password).toBe('abc');
      }
    });

    it('rejects empty password', () => {
      const result = sellerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });

    it('rejects 129-char password', () => {
      const result = sellerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: 'a'.repeat(129),
      });
      expect(result.success).toBe(false);
    });

    it('accepts 128-char password', () => {
      const result = sellerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: 'a'.repeat(128),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('sellerSetupPasswordFormSchema behavior mirrors customerResetPasswordFormSchema', () => {
    it('accepts valid 8+ char password with matching confirm', () => {
      const result = sellerSetupPasswordFormSchema.safeParse({
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.password).toBe('password123');
        expect(result.data.confirmPassword).toBe('password123');
      }
    });

    it('rejects password/confirmPassword mismatch with issue on confirmPassword path', () => {
      const result = sellerSetupPasswordFormSchema.safeParse({
        password: 'password123',
        confirmPassword: 'different123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const confirmPasswordIssue = result.error.issues.find(
          (issue) => issue.path[0] === 'confirmPassword'
        );
        expect(confirmPasswordIssue).toBeDefined();
        expect(confirmPasswordIssue?.message).toBe('passwordsDoNotMatch');
      }
    });

    it('rejects 7-char password (min 8)', () => {
      const result = sellerSetupPasswordFormSchema.safeParse({
        password: 'pass123',
        confirmPassword: 'pass123',
      });
      expect(result.success).toBe(false);
    });

    it('accepts 128-char password', () => {
      const maxPassword = 'a'.repeat(128);
      const result = sellerSetupPasswordFormSchema.safeParse({
        password: maxPassword,
        confirmPassword: maxPassword,
      });
      expect(result.success).toBe(true);
    });

    it('rejects 129-char password', () => {
      const longPassword = 'a'.repeat(129);
      const result = sellerSetupPasswordFormSchema.safeParse({
        password: longPassword,
        confirmPassword: longPassword,
      });
      expect(result.success).toBe(false);
    });
  });
});