import {
  categoryFormSchema,
  colorFormSchema,
  createBrandSchema,
  createColorSchema,
  createSiteLanguageSchema,
  optionalDisplayNameSchema,
  updateBrandSchema,
  updateColorSchema,
  updateSiteLanguageSchema,
} from './taxonomy';

const ok = (s: { safeParse: (v: unknown) => { success: boolean } }, v: unknown) => s.safeParse(v).success;

describe('taxonomy schemas', () => {
  it('accepts slugs built from names, including Persian ones', () => {
    expect(ok(createBrandSchema, { slug: 't-shirts', sortOrder: 0 })).toBe(true);
    expect(ok(createBrandSchema, { slug: 'کفش-ورزشی' })).toBe(true);
    expect(ok(updateBrandSchema, { id: 1, slug: null, isActive: false })).toBe(true);
  });

  it('rejects blank or spaced slugs', () => {
    expect(ok(createBrandSchema, { slug: '  ' })).toBe(false);
    expect(ok(createBrandSchema, { slug: 'a b' })).toBe(false);
    expect(ok(updateBrandSchema, { slug: 'x' })).toBe(false);
  });

  it('validates hex colors', () => {
    for (const hex of ['#fff', '#00FF00', '#1A1A1A80']) expect(ok(createColorSchema, { hexCode: hex })).toBe(true);
    for (const hex of ['red', '#12345', '00ff00']) expect(ok(updateColorSchema, { hexCode: hex })).toBe(false);
  });

  it('validates site languages', () => {
    expect(ok(createSiteLanguageSchema, { code: 'fa', name: 'Farsi', nativeName: 'فارسی', isRTL: true })).toBe(true);
    expect(ok(createSiteLanguageSchema, { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português' })).toBe(true);
    expect(ok(createSiteLanguageSchema, { code: 'f', name: 'x', nativeName: 'x' })).toBe(false);
    expect(ok(updateSiteLanguageSchema, { name: '' })).toBe(false);
    expect(ok(updateSiteLanguageSchema, { isActive: false })).toBe(true);
  });

  it('validates the optional name argument and the admin modals', () => {
    expect(ok(optionalDisplayNameSchema, null)).toBe(true);
    expect(ok(optionalDisplayNameSchema, 'x'.repeat(101))).toBe(false);
    expect(ok(categoryFormSchema, { name: ' ' })).toBe(false);
    expect(ok(colorFormSchema, { name: 'Green', hexCode: '#00ff00' })).toBe(true);
    expect(ok(colorFormSchema, { name: 'Green', hexCode: 'green' })).toBe(false);
  });
});