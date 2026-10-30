import { describe, expect, it } from 'vitest';
import {
  emailSchema,
  loginPasswordSchema,
  newPasswordSchema,
  personNameSchema,
  usernameSchema,
  tokenSchema,
  baseUrlSchema,
  userRoleSchema,
  createUserSchema,
  USER_ROLES,
} from './auth';

describe('auth validation schemas', () => {
  describe('emailSchema', () => {
    it('trims and accepts valid email, preserving case (stored emails are case-sensitive)', () => {
      const result = emailSchema.safeParse(' A@B.co ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('A@B.co');
      }
    });

    it('rejects invalid email', () => {
      const result = emailSchema.safeParse('nope');
      expect(result.success).toBe(false);
    });

    it('rejects empty string', () => {
      const result = emailSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('rejects 255-char email', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(59) + '.co';
      expect(longEmail.length).toBe(255);
      const result = emailSchema.safeParse(longEmail);
      expect(result.success).toBe(false);
    });

    it('accepts 254-char email', () => {
      const maxEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(58) + '.co';
      expect(maxEmail.length).toBe(254);
      const result = emailSchema.safeParse(maxEmail);
      expect(result.success).toBe(true);
    });
  });

  describe('loginPasswordSchema', () => {
    it('accepts short legacy password (3 chars)', () => {
      const result = loginPasswordSchema.safeParse('abc');
      expect(result.success).toBe(true);
    });

    it('rejects empty string', () => {
      const result = loginPasswordSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('accepts max length password (128 chars)', () => {
      const result = loginPasswordSchema.safeParse('a'.repeat(128));
      expect(result.success).toBe(true);
    });

    it('rejects 129 chars', () => {
      const result = loginPasswordSchema.safeParse('a'.repeat(129));
      expect(result.success).toBe(false);
    });
  });

  describe('newPasswordSchema', () => {
    it('rejects 7 chars', () => {
      const result = newPasswordSchema.safeParse('a'.repeat(7));
      expect(result.success).toBe(false);
    });

    it('accepts 8 chars', () => {
      const result = newPasswordSchema.safeParse('a'.repeat(8));
      expect(result.success).toBe(true);
    });

    it('accepts 128 chars', () => {
      const result = newPasswordSchema.safeParse('a'.repeat(128));
      expect(result.success).toBe(true);
    });

    it('rejects 129 chars', () => {
      const result = newPasswordSchema.safeParse('a'.repeat(129));
      expect(result.success).toBe(false);
    });
  });

  describe('personNameSchema', () => {
    it('trims and accepts valid name', () => {
      const result = personNameSchema.safeParse('  John  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('John');
      }
    });

    it('rejects empty after trim', () => {
      const result = personNameSchema.safeParse('   ');
      expect(result.success).toBe(false);
    });

    it('rejects 101 chars', () => {
      const result = personNameSchema.safeParse('a'.repeat(101));
      expect(result.success).toBe(false);
    });

    it('accepts 100 chars', () => {
      const result = personNameSchema.safeParse('a'.repeat(100));
      expect(result.success).toBe(true);
    });
  });

  describe('usernameSchema', () => {
    it('rejects 2 chars', () => {
      const result = usernameSchema.safeParse('ab');
      expect(result.success).toBe(false);
    });

    it('rejects invalid characters (space)', () => {
      const result = usernameSchema.safeParse('bad name');
      expect(result.success).toBe(false);
    });

    it('accepts valid username with dots, underscores, hyphens', () => {
      const result = usernameSchema.safeParse('good_user.1');
      expect(result.success).toBe(true);
    });

    it('trims whitespace', () => {
      const result = usernameSchema.safeParse('  good_user  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('good_user');
      }
    });

    it('rejects 51 chars', () => {
      const result = usernameSchema.safeParse('a'.repeat(51));
      expect(result.success).toBe(false);
    });

    it('accepts 50 chars', () => {
      const result = usernameSchema.safeParse('a'.repeat(50));
      expect(result.success).toBe(true);
    });
  });

  describe('tokenSchema', () => {
    it('rejects whitespace only', () => {
      const result = tokenSchema.safeParse('  ');
      expect(result.success).toBe(false);
    });

    it('accepts valid token', () => {
      const result = tokenSchema.safeParse('valid-token-123');
      expect(result.success).toBe(true);
    });

    it('trims whitespace', () => {
      const result = tokenSchema.safeParse('  token  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('token');
      }
    });

    it('rejects 513 chars', () => {
      const result = tokenSchema.safeParse('a'.repeat(513));
      expect(result.success).toBe(false);
    });

    it('accepts 512 chars', () => {
      const result = tokenSchema.safeParse('a'.repeat(512));
      expect(result.success).toBe(true);
    });
  });

  describe('baseUrlSchema', () => {
    it('accepts valid https URL', () => {
      const result = baseUrlSchema.safeParse('https://kickzone.ir/x');
      expect(result.success).toBe(true);
    });

    it('accepts valid http URL', () => {
      const result = baseUrlSchema.safeParse('http://example.com/path');
      expect(result.success).toBe(true);
    });

    it('rejects javascript: protocol', () => {
      const result = baseUrlSchema.safeParse('javascript:alert(1)');
      expect(result.success).toBe(false);
    });

    it('rejects ftp: protocol', () => {
      const result = baseUrlSchema.safeParse('ftp://x');
      expect(result.success).toBe(false);
    });

    it('rejects non-URL string', () => {
      const result = baseUrlSchema.safeParse('not a url');
      expect(result.success).toBe(false);
    });

    it('rejects URL over 2048 chars', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(2040);
      expect(longUrl.length).toBeGreaterThan(2048);
      const result = baseUrlSchema.safeParse(longUrl);
      expect(result.success).toBe(false);
    });
  });

  describe('userRoleSchema', () => {
    it('accepts ADMIN', () => {
      const result = userRoleSchema.safeParse('ADMIN');
      expect(result.success).toBe(true);
    });

    it('accepts SELLER', () => {
      const result = userRoleSchema.safeParse('SELLER');
      expect(result.success).toBe(true);
    });

    it('accepts CUSTOMER', () => {
      const result = userRoleSchema.safeParse('CUSTOMER');
      expect(result.success).toBe(true);
    });

    it('rejects ROOT', () => {
      const result = userRoleSchema.safeParse('ROOT');
      expect(result.success).toBe(false);
    });

    it('rejects lowercase', () => {
      const result = userRoleSchema.safeParse('admin');
      expect(result.success).toBe(false);
    });
  });

  describe('createUserSchema', () => {
    const validInput = {
      name: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securePassword123',
      role: 'CUSTOMER',
    };

    it('accepts valid input (happy path)', () => {
      const result = createUserSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John');
        expect(result.data.lastName).toBe('Doe');
        expect(result.data.username).toBe('john_doe');
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.password).toBe('securePassword123');
        expect(result.data.role).toBe('CUSTOMER');
      }
    });

    it('rejects invalid name', () => {
      const result = createUserSchema.safeParse({ ...validInput, name: '' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid lastName', () => {
      const result = createUserSchema.safeParse({ ...validInput, lastName: '   ' });
      expect(result.success).toBe(false);
    });

    it('rejects short username', () => {
      const result = createUserSchema.safeParse({ ...validInput, username: 'ab' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid username characters', () => {
      const result = createUserSchema.safeParse({ ...validInput, username: 'bad name' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid email', () => {
      const result = createUserSchema.safeParse({ ...validInput, email: 'not-an-email' });
      expect(result.success).toBe(false);
    });

    it('rejects short password (7 chars)', () => {
      const result = createUserSchema.safeParse({ ...validInput, password: 'short7' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid role', () => {
      const result = createUserSchema.safeParse({ ...validInput, role: 'ROOT' });
      expect(result.success).toBe(false);
    });

    it('trims email and preserves case', () => {
      const result = createUserSchema.safeParse({
        ...validInput,
        email: '  JOHN@EXAMPLE.COM  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('JOHN@EXAMPLE.COM');
      }
    });

    it('trims name fields', () => {
      const result = createUserSchema.safeParse({
        ...validInput,
        name: '  John  ',
        lastName: '  Doe  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John');
        expect(result.data.lastName).toBe('Doe');
      }
    });

    it('trims username', () => {
      const result = createUserSchema.safeParse({
        ...validInput,
        username: '  john_doe  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.username).toBe('john_doe');
      }
    });
  });

  describe('USER_ROLES constant', () => {
    it('matches expected values', () => {
      expect(USER_ROLES).toEqual(['ADMIN', 'SELLER', 'CUSTOMER']);
    });
  });
});