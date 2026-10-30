import { GUARDS_METADATA } from '@nestjs/common/constants';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CatalogGuard } from '@kickzone-workspace/guards';
import { TranslationResolver } from './translation.resolver';

describe('TranslationResolver guards metadata', () => {
  const getGuards = (methodName: keyof TranslationResolver) =>
    Reflect.getMetadata(GUARDS_METADATA, TranslationResolver.prototype[methodName]) ?? [];

  it('setTranslation has CatalogGuard and does not rely on GraphqlAuthGuard alone', () => {
    const guards = getGuards('setTranslation');
    expect(guards).toContain(CatalogGuard);
    expect(guards).not.toEqual([GraphqlAuthGuard]);
  });

  it('bulkTranslateEntities has CatalogGuard and does not rely on GraphqlAuthGuard alone', () => {
    const guards = getGuards('bulkTranslateEntities');
    expect(guards).toContain(CatalogGuard);
    expect(guards).not.toEqual([GraphqlAuthGuard]);
  });

  it('deleteEntityTranslations has CatalogGuard and does not rely on GraphqlAuthGuard alone', () => {
    const guards = getGuards('deleteEntityTranslations');
    expect(guards).toContain(CatalogGuard);
    expect(guards).not.toEqual([GraphqlAuthGuard]);
  });

  it('getTranslation has no guards (stays public)', () => {
    const guards = getGuards('getTranslation');
    expect(guards).toEqual([]);
  });

  it('getEntityTranslations has no guards (stays public)', () => {
    const guards = getGuards('getEntityTranslations');
    expect(guards).toEqual([]);
  });

  it('getTranslationWithFallback has no guards (stays public)', () => {
    const guards = getGuards('getTranslationWithFallback');
    expect(guards).toEqual([]);
  });
});