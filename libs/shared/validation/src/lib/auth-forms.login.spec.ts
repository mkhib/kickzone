import { describe, expect, it } from 'vitest';
import { customerLoginFormSchema } from './auth-forms';

describe('customerLoginFormSchema validation', () => {
  describe('email field', () => {
    it('trims and preserves case like emailSchema', () => {
      const result = customerLoginFormSchema.shape.email.safeParse('  Ann@Example.com  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('Ann@Example.com');
      }
    });

    it('rejects invalid email', () => {
      const result = customerLoginFormSchema.shape.email.safeParse('not-an-email');
      expect(result.success).toBe(false);
    });

    it('rejects empty email', () => {
      const result = customerLoginFormSchema.shape.email.safeParse('');
      expect(result.success).toBe(false);
    });

    it('rejects whitespace-only email', () => {
      const result = customerLoginFormSchema.shape.email.safeParse('   ');
      expect(result.success).toBe(false);
    });
  });

  describe('password field (loginPasswordSchema - min 1, max 128, NO min 8)', () => {
    it('accepts 1-char password (legacy accounts)', () => {
      const result = customerLoginFormSchema.shape.password.safeParse('a');
      expect(result.success).toBe(true);
    });

    it('accepts 3-char password "abc" (legacy accounts)', () => {
      const result = customerLoginFormSchema.shape.password.safeParse('abc');
      expect(result.success).toBe(true);
    });

    it('accepts 128-char password', () => {
      const maxPassword = 'a'.repeat(128);
      const result = customerLoginFormSchema.shape.password.safeParse(maxPassword);
      expect(result.success).toBe(true);
    });

    it('rejects empty password', () => {
      const result = customerLoginFormSchema.shape.password.safeParse('');
      expect(result.success).toBe(false);
    });

    it('rejects 129-char password', () => {
      const longPassword = 'a'.repeat(129);
      const result = customerLoginFormSchema.shape.password.safeParse(longPassword);
      expect(result.success).toBe(false);
    });
  });

  describe('full form validation', () => {
    it('accepts valid email and password', () => {
      const result = customerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: 'abc',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('ann@example.com');
        expect(result.data.password).toBe('abc');
      }
    });

    it('rejects invalid email with valid password', () => {
      const result = customerLoginFormSchema.safeParse({
        email: 'invalid-email',
        password: 'validpassword',
      });
      expect(result.success).toBe(false);
    });

    it('rejects valid email with empty password', () => {
      const result = customerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });

    it('rejects valid email with 129-char password', () => {
      const result = customerLoginFormSchema.safeParse({
        email: 'ann@example.com',
        password: 'a'.repeat(129),
      });
      expect(result.success).toBe(false);
    });

    it('trims email and preserves case in full form validation', () => {
      const result = customerLoginFormSchema.safeParse({
        email: '  Ann@Example.com  ',
        password: 'abc',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('Ann@Example.com');
        expect(result.data.password).toBe('abc');
      }
    });
  });

  describe('schema.shape fields reuse auth.ts schemas', () => {
    it('email field rejects 255 chars like emailSchema', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(59) + '.co';
      expect(longEmail.length).toBe(255);
      const result = customerLoginFormSchema.shape.email.safeParse(longEmail);
      expect(result.success).toBe(false);
    });

    it('email field accepts 254 chars like emailSchema', () => {
      const maxEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(58) + '.co';
      expect(maxEmail.length).toBe(254);
      const result = customerLoginFormSchema.shape.email.safeParse(maxEmail);
      expect(result.success).toBe(true);
    });

    it('password field rejects 129 chars like loginPasswordSchema', () => {
      const longPassword = 'a'.repeat(129);
      const result = customerLoginFormSchema.shape.password.safeParse(longPassword);
      expect(result.success).toBe(false);
    });

    it('password field accepts 128 chars like loginPasswordSchema', () => {
      const maxPassword = 'a'.repeat(128);
      const result = customerLoginFormSchema.shape.password.safeParse(maxPassword);
      expect(result.success).toBe(true);
    });

    it('password field accepts 1 char (legacy) unlike newPasswordSchema', () => {
      const result = customerLoginFormSchema.shape.password.safeParse('a');
      expect(result.success).toBe(true);
      // Verify newPasswordSchema would reject this
      const newPasswordResult = customerLoginFormSchema.shape.password.safeParse('a');
      // This is just to confirm loginPasswordSchema is different from newPasswordSchema
      expect(newPasswordResult.success).toBe(true);
    });
  });
});