import { describe, it, expect } from 'vitest';
import { createContactResolver } from './customer-contact';

const opts = { shouldUseNativeValidation: false, fields: {} };
const valid = {
  fullName: 'Ali Rezaei',
  email: 'ali@example.com',
  phone: '',
  inquiryType: 'AUTHENTICATION',
  subject: 'Serial check',
  message: 'Please verify tag #SB-98421.',
};

describe('contact form uses the shared Zod contact schema', () => {
  it('accepts a valid inquiry', async () => {
    expect((await createContactResolver(true)(valid, undefined, opts)).errors).toEqual({});
  });

  it('distinguishes a missing email from an invalid one', async () => {
    const missing = await createContactResolver(true)({ ...valid, email: ' ' }, undefined, opts);
    expect(missing.errors.email?.message).toBe('Please enter your email address');
    const invalid = await createContactResolver(true)({ ...valid, email: 'ali@x' }, undefined, opts);
    expect(invalid.errors.email?.message).toBe('Please enter a valid email address');
  });

  it('uses the Persian messages when the locale is not English', async () => {
    const res = await createContactResolver(false)({ ...valid, subject: '' }, undefined, opts);
    expect(res.errors.subject?.message).toBeTruthy();
    expect(res.errors.subject?.message).not.toBe('Please enter a subject');
  });
});