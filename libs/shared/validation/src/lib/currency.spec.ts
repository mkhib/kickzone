import {
  bulkTranslationSchema,
  createCurrencySchema,
  currencyCodeSchema,
  exchangeRateFormSchema,
  setExchangeRateSchema,
  translationSchema,
  updateCurrencySchema,
} from './currency';

const ok = (s: { safeParse: (v: unknown) => { success: boolean } }, v: unknown) => s.safeParse(v).success;

describe('currency and translation schemas', () => {
  it('accepts the seeded currencies and rejects malformed codes', () => {
    expect(ok(createCurrencySchema, { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', decimalPlaces: 0 })).toBe(true);
    expect(ok(currencyCodeSchema, 'usd')).toBe(true);
    expect(ok(currencyCodeSchema, 'U$D')).toBe(false);
    expect(ok(createCurrencySchema, { code: 'USD', name: '', symbol: '$', decimalPlaces: 2 })).toBe(false);
    expect(ok(updateCurrencySchema, { decimalPlaces: 9 })).toBe(false);
    expect(ok(updateCurrencySchema, { isActive: false })).toBe(true);
  });

  it('requires a positive exchange rate', () => {
    expect(ok(setExchangeRateSchema, { fromCurrencyCode: 'USD', toCurrencyCode: 'IRR', rate: 600000 })).toBe(true);
    expect(ok(setExchangeRateSchema, { fromCurrencyCode: 'USD', toCurrencyCode: 'IRR', rate: 0 })).toBe(false);
    expect(ok(exchangeRateFormSchema, { rate: '58000.5' })).toBe(true);
    expect(ok(exchangeRateFormSchema, { rate: 'abc' })).toBe(false);
  });

  it('validates translations and allows clearing a value', () => {
    const t = { entityType: 'product', entityId: 3, locale: 'fa', fieldName: 'name', value: '' };
    expect(ok(translationSchema, t)).toBe(true);
    expect(ok(translationSchema, { ...t, locale: 'x' })).toBe(false);
    expect(ok(translationSchema, { ...t, entityId: 0 })).toBe(false);
    expect(ok(bulkTranslationSchema, { entityType: 'brand', entityIds: [1, 2], sourceLocale: 'en', targetLocales: ['fa'] })).toBe(true);
    expect(ok(bulkTranslationSchema, { entityType: 'brand', entityIds: [1], sourceLocale: 'en', targetLocales: [''] })).toBe(false);
  });
});