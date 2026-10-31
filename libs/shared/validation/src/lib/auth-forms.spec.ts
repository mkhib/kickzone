import { describe, expect, it } from 'vitest';
import { customerSignupFormSchema } from './auth-forms';

describe('auth-forms validation schemas', () => {
  describe('customerSignupFormSchema', () => {
    const validInput = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securePassword123',
      confirmPassword: 'securePassword123',
    };

    it('accepts valid input and output is trimmed', () => {
      const result = customerSignupFormSchema.safeParse({
        name: '  John Doe  ',
        email: '  JOHN@EXAMPLE.COM  ',
        password: 'securePassword123',
        confirmPassword: 'securePassword123',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('JOHN@EXAMPLE.COM');
        expect(result.data.password).toBe('securePassword123');
        expect(result.data.confirmPassword).toBe('securePassword123');
      }
    });

    it('rejects password/confirmPassword mismatch with issue on confirmPassword path', () => {
      const result = customerSignupFormSchema.safeParse({
        ...validInput,
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

    it('rejects 7-char password', () => {
      const result = customerSignupFormSchema.safeParse({
        ...validInput,
        password: 'short7c',
        confirmPassword: 'short7c',
      });
      expect(result.success).toBe(false);
    });

    it('rejects bad email', () => {
      const result = customerSignupFormSchema.safeParse({
        ...validInput,
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty name', () => {
      const result = customerSignupFormSchema.safeParse({
        ...validInput,
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('rejects whitespace-only name', () => {
      const result = customerSignupFormSchema.safeParse({
        ...validInput,
        name: '   ',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('schema.shape fields reuse auth.ts schemas', () => {
    it('password field rejects 129 chars like newPasswordSchema', () => {
      const longPassword = 'a'.repeat(129);
      const result = customerSignupFormSchema.shape.password.safeParse(longPassword);
      expect(result.success).toBe(false);
    });

    it('password field accepts 128 chars like newPasswordSchema', () => {
      const maxPassword = 'a'.repeat(128);
      const result = customerSignupFormSchema.shape.password.safeParse(maxPassword);
      expect(result.success).toBe(true);
    });

    it('name field rejects 101 chars like personNameSchema', () => {
      const longName = 'a'.repeat(101);
      const result = customerSignupFormSchema.shape.name.safeParse(longName);
      expect(result.success).toBe(false);
    });

    it('name field accepts 100 chars like personNameSchema', () => {
      const maxName = 'a'.repeat(100);
      const result = customerSignupFormSchema.shape.name.safeParse(maxName);
      expect(result.success).toBe(true);
    });

    it('email field rejects 255 chars like emailSchema', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(59) + '.co';
      expect(longEmail.length).toBe(255);
      const result = customerSignupFormSchema.shape.email.safeParse(longEmail);
      expect(result.success).toBe(false);
    });

    it('email field accepts 254 chars like emailSchema', () => {
      const maxEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(58) + '.co';
      expect(maxEmail.length).toBe(254);
      const result = customerSignupFormSchema.shape.email.safeParse(maxEmail);
      expect(result.success).toBe(true);
    });

    it('email field trims and preserves case like emailSchema', () => {
      const result = customerSignupFormSchema.shape.email.safeParse('  A@B.co ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('A@B.co');
      }
    });

    it('name field trims like personNameSchema', () => {
      const result = customerSignupFormSchema.shape.name.safeParse('  John  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('John');
      }
    });
  });
});