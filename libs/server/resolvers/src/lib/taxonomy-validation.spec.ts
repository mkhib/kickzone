import { BadRequestException, PipeTransform, Type } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { BrandResolver } from './brand.resolver';
import { CategoryResolver } from './category.resolver';
import { ColorResolver } from './color.resolver';
import { SiteLanguageResolver } from './site-language.resolver';
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

describe('brand/category/color/site-language argument validation', () => {
  it.each([
    [BrandResolver, 'createBrand', 0, 1],
    [BrandResolver, 'updateBrand', 0, 1],
    [CategoryResolver, 'createCategory', 0, 1],
    [CategoryResolver, 'updateCategory', 0, 1],
  ] as const)('%p.%s validates slug input and the name argument', (cls, method, inputIdx, nameIdx) => {
    const input = method.startsWith('update') ? { id: 1, slug: 't-shirts' } : { slug: 't-shirts' };
    expect(() => run(cls, method, inputIdx, input)).not.toThrow();
    expect(() => run(cls, method, inputIdx, { ...input, slug: 'a b' })).toThrow(BadRequestException);
    expect(() => run(cls, method, nameIdx, undefined)).not.toThrow();
    expect(() => run(cls, method, nameIdx, 'x'.repeat(101))).toThrow(BadRequestException);
  });

  it('validates color hex codes', () => {
    expect(() => run(ColorResolver, 'createColor', 0, { hexCode: '#00ff00' })).not.toThrow();
    expect(() => run(ColorResolver, 'createColor', 0, { hexCode: 'green' })).toThrow(BadRequestException);
    expect(() => run(ColorResolver, 'updateColor', 1, { hexCode: '#123' })).not.toThrow();
    expect(() => run(ColorResolver, 'updateColor', 2, 'x'.repeat(101))).toThrow(BadRequestException);
  });

  it('validates site languages', () => {
    expect(() =>
      run(SiteLanguageResolver, 'createSiteLanguage', 0, { code: 'fa', name: 'Farsi', nativeName: 'فارسی' })
    ).not.toThrow();
    expect(() => run(SiteLanguageResolver, 'createSiteLanguage', 0, { code: '', name: 'x', nativeName: 'x' })).toThrow(
      BadRequestException
    );
    expect(() => run(SiteLanguageResolver, 'updateSiteLanguage', 1, { name: '' })).toThrow(BadRequestException);
  });
});