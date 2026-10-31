import { BadRequestException, PipeTransform, Type } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CurrencyResolver } from './currency.resolver';
import { TranslationResolver } from './translation.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(cls: Type<unknown>, method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, cls, method) ?? {}) as Record<string, ParamMeta>;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

const run = (cls: Type<unknown>, method: string, index: number, value: unknown) =>
  zodPipe(cls, method, index).transform(value, { type: 'body' });

describe('currency and translation argument validation', () => {
  it('validates currency create/update', () => {
    expect(() =>
      run(CurrencyResolver, 'createCurrency', 0, { code: 'USD', name: 'US Dollar', symbol: '$', decimalPlaces: 2 })
    ).not.toThrow();
    expect(() => run(CurrencyResolver, 'createCurrency', 0, { code: '$$', name: 'x', symbol: '$', decimalPlaces: 2 })).toThrow(
      BadRequestException
    );
    expect(() => run(CurrencyResolver, 'updateCurrency', 1, { decimalPlaces: -1 })).toThrow(BadRequestException);
  });

  it('validates exchange rates and currency preferences', () => {
    expect(() =>
      run(CurrencyResolver, 'setExchangeRate', 0, { fromCurrencyCode: 'USD', toCurrencyCode: 'IRR', rate: 600000 })
    ).not.toThrow();
    expect(() =>
      run(CurrencyResolver, 'setExchangeRate', 0, { fromCurrencyCode: 'USD', toCurrencyCode: 'IRR', rate: -1 })
    ).toThrow(BadRequestException);
    expect(() => run(CurrencyResolver, 'setCurrencyPreference', 0, 'fa')).not.toThrow();
    expect(() => run(CurrencyResolver, 'setCurrencyPreference', 1, 'IR-R')).toThrow(BadRequestException);
  });

  it('validates translations', () => {
    const t = { entityType: 'product', entityId: 1, locale: 'fa', fieldName: 'name', value: 'کفش' };
    expect(() => run(TranslationResolver, 'setTranslation', 0, t)).not.toThrow();
    expect(() => run(TranslationResolver, 'setTranslation', 0, { ...t, fieldName: '' })).toThrow(BadRequestException);
    expect(() =>
      run(TranslationResolver, 'bulkTranslateEntities', 0, {
        entityType: 'product', entityIds: [1], sourceLocale: 'en', targetLocales: ['fa'],
      })
    ).not.toThrow();
  });
});