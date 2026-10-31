import { z } from 'zod';
import { languageCodeSchema } from './taxonomy';

export const CURRENCY_LIMITS = {
  name: { max: 100 },
  symbol: { max: 10 },
  decimalPlaces: { min: 0, max: 8 },
  notes: { max: 1000 },
} as const;

/** Currency codes such as USD or IRR (letters only, 2-10 characters). */
export const currencyCodeSchema = z.string().trim().regex(/^[A-Za-z]{2,10}$/);
const currencyName = z.string().trim().min(1).max(CURRENCY_LIMITS.name.max);
const currencySymbol = z.string().trim().min(1).max(CURRENCY_LIMITS.symbol.max);
const decimalPlaces = z
  .number()
  .int()
  .min(CURRENCY_LIMITS.decimalPlaces.min)
  .max(CURRENCY_LIMITS.decimalPlaces.max);
const flag = z.boolean().nullish();

export const createCurrencySchema = z.object({
  code: currencyCodeSchema,
  name: currencyName,
  symbol: currencySymbol,
  decimalPlaces,
  isActive: flag,
  isBaseCurrency: flag,
});

export const updateCurrencySchema = z.object({
  code: currencyCodeSchema.nullish(),
  name: currencyName.nullish(),
  symbol: currencySymbol.nullish(),
  decimalPlaces: decimalPlaces.nullish(),
  isActive: flag,
  isBaseCurrency: flag,
});

export const setExchangeRateSchema = z.object({
  fromCurrencyCode: currencyCodeSchema,
  toCurrencyCode: currencyCodeSchema,
  rate: z.number().positive().finite(),
  effectiveDate: z.coerce.date().nullish(),
  notes: z.string().max(CURRENCY_LIMITS.notes.max).nullish(),
});

/** Admin exchange-rate form (rate typed as text). */
export const exchangeRateFormSchema = z.object({
  rate: z.coerce.number().positive().finite(),
  notes: z.string().max(CURRENCY_LIMITS.notes.max).optional(),
});

export const TRANSLATION_LIMITS = {
  entityType: { max: 50 },
  fieldName: { max: 100 },
  value: { max: 20000 },
} as const;

const entityType = z.string().trim().min(1).max(TRANSLATION_LIMITS.entityType.max);

export const translationSchema = z.object({
  entityType,
  entityId: z.number().int().positive(),
  locale: languageCodeSchema,
  fieldName: z.string().trim().min(1).max(TRANSLATION_LIMITS.fieldName.max),
  /** May be empty: a blank value clears a translation. */
  value: z.string().max(TRANSLATION_LIMITS.value.max),
  isAutoTranslated: flag,
  translatedBy: z.number().int().nullish(),
});

export const bulkTranslationSchema = z.object({
  entityType,
  entityIds: z.array(z.number().int().positive()),
  sourceLocale: languageCodeSchema,
  targetLocales: z.array(languageCodeSchema),
});

export type ExchangeRateFormInput = z.input<typeof exchangeRateFormSchema>;