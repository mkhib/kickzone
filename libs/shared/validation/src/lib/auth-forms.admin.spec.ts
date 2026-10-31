import { describe, expect, it } from 'vitest';
import { customerLoginFormSchema, adminLoginFormSchema } from './auth-forms';

describe('auth-forms admin login schema', () => {
  it('adminLoginFormSchema === customerLoginFormSchema (reference equality)', () => {
    expect(adminLoginFormSchema).toBe(customerLoginFormSchema);
  });

  it('AdminLoginFormValues === CustomerLoginFormValues (type alias)', () => {
    // TypeScript structural typing - verify the shapes match at runtime by parsing
    const customerResult = customerLoginFormSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    const adminResult = adminLoginFormSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(customerResult.success).toBe(adminResult.success);
  });

  it('accepts "abc" password (no min 8 enforcement)', () => {
    const result = adminLoginFormSchema.safeParse({
      email: 'admin@example.com',
      password: 'abc',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.password).toBe('abc');
    }
  });

  it('trims email (leading/trailing whitespace removed)', () => {
    const result = adminLoginFormSchema.safeParse({
      email: '  admin@example.com  ',
      password: 'abc',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('admin@example.com');
    }
  });

  it('rejects invalid email', () => {
    const result = adminLoginFormSchema.safeParse({
      email: 'not-an-email',
      password: 'abc',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = adminLoginFormSchema.safeParse({
      email: 'admin@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = adminLoginFormSchema.safeParse({
      email: '',
      password: 'abc',
    });
    expect(result.success).toBe(false);
  });
});