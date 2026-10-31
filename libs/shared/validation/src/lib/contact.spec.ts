import { contactFormSchema } from './contact';

const valid = {
  fullName: 'Ali Rezaei',
  email: 'ali@example.com',
  phone: '',
  inquiryType: 'AUTHENTICATION',
  subject: 'Serial check',
  message: 'Please verify tag #SB-98421.',
};

const fieldsWithErrors = (value: unknown) => {
  const r = contactFormSchema.safeParse(value);
  return r.success ? [] : [...new Set(r.error.issues.map((i) => String(i.path[0])))];
};

describe('contactFormSchema', () => {
  it('accepts a complete message with an optional phone', () => {
    expect(fieldsWithErrors(valid)).toEqual([]);
    expect(fieldsWithErrors({ ...valid, phone: undefined })).toEqual([]);
  });

  it('requires name, email, subject and message (whitespace counts as empty)', () => {
    expect(
      fieldsWithErrors({ ...valid, fullName: ' ', email: '', subject: '', message: '  ' })
    ).toEqual(['fullName', 'email', 'subject', 'message']);
  });

  it('rejects an invalid email and over-long text', () => {
    expect(fieldsWithErrors({ ...valid, email: 'ali@example' })).toEqual(['email']);
    expect(fieldsWithErrors({ ...valid, message: 'x'.repeat(5001) })).toEqual(['message']);
  });
});