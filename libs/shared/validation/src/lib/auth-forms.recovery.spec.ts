import { describe, expect, it } from 'vitest';
import { customerForgotPasswordFormSchema, customerResetPasswordFormSchema } from './auth-forms';

describe('auth-forms recovery validation schemas', () => {
  describe('customerForgotPasswordFormSchema', () => {
    it('trims and preserves case like emailSchema', () => {
      const result = customerForgotPasswordFormSchema.safeParse({
        email: '  Ann@Example.com  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('Ann@Example.com');
      }
    });

    it('rejects invalid email', () => {
      const result = customerForgotPasswordFormSchema.safeParse({
        email: 'nope',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty email', () => {
      const result = customerForgotPasswordFormSchema.safeParse({
        email: '',
      });
      expect(result.success).toBe(false);
    });

    it('rejects whitespace-only email', () => {
      const result = customerForgotPasswordFormSchema.safeParse({
        email: '   ',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('customerResetPasswordFormSchema', () => {
    it('rejects 7-char password', () => {
      const result = customerResetPasswordFormSchema.safeParse({
        password: 'short7c',
        confirmPassword: 'short7c',
      });
      expect(result.success).toBe(false);
    });

    it('rejects mismatch with path ["confirmPassword"]', () => {
      const result = customerResetPasswordFormSchema.safeParse({
        password: 'validPassword123',
        confirmPassword: 'differentPassword',
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

    it('accepts 8+ matching passwords', () => {
      const result = customerResetPasswordFormSchema.safeParse({
        password: 'validPassword123',
        confirmPassword: 'validPassword123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects 129 chars', () => {
      const longPassword = 'a'.repeat(129);
      const result = customerResetPasswordFormSchema.safeParse({
        password: longPassword,
        confirmPassword: longPassword,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('schema.shape fields reuse auth.ts schemas', () => {
    it('password field rejects 129 chars like newPasswordSchema', () => {
      const longPassword = 'a'.repeat(129);
      const result = customerResetPasswordFormSchema.shape.password.safeParse(longPassword);
      expect(result.success).toBe(false);
    });

    it('password field accepts 128 chars like newPasswordSchema', () => {
      const maxPassword = 'a'.repeat(128);
      const result = customerResetPasswordFormSchema.shape.password.safeParse(maxPassword);
      expect(result.success).toBe(true);
    });

    it('email field trims and preserves case like emailSchema', () => {
      const result = customerForgotPasswordFormSchema.shape.email.safeParse('  A@B.co ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('A@B.co');
      }
    });
  });
});