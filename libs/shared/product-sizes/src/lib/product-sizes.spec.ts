import { describe, expect, it } from 'vitest';
import {
  APPAREL_SIZES,
  euToUs,
  expandFilterSizes,
  formatSizeLabel,
  FootwearSizeSystem,
  inferSizeKindFromRaw,
  normalizeSizeCode,
  SizeKind,
  usToEuCodes,
} from './product-sizes';

describe('product-sizes', () => {
  it('normalizes apparel letters', () => {
    expect(normalizeSizeCode(SizeKind.Apparel, 'm')).toBe('M');
    expect(normalizeSizeCode(SizeKind.Apparel, 'xxxl')).toBe('XXXL');
    expect(normalizeSizeCode(SizeKind.Apparel, 'invalid')).toBeNull();
  });

  it('normalizes footwear EU codes and drops .0', () => {
    expect(normalizeSizeCode(SizeKind.Footwear, '42.0')).toBe('42');
    expect(normalizeSizeCode(SizeKind.Footwear, '42,5')).toBe('42.5');
    expect(normalizeSizeCode(SizeKind.Footwear, '99')).toBeNull();
  });

  it('round-trips chart EU↔US entries', () => {
    expect(euToUs('42')).toBe('9');
    expect(euToUs('42.5')).toBe('9.5');
    expect(usToEuCodes('9')).toEqual(expect.arrayContaining(['42', '41.5']));
    expect(usToEuCodes('9.5')).toEqual(['42.5']);
  });

  it('expands US filter selections to canonical EU codes', () => {
    expect(
      expandFilterSizes(SizeKind.Footwear, FootwearSizeSystem.Us, ['9.5'])
    ).toEqual(['42.5']);
    expect(
      expandFilterSizes(SizeKind.Footwear, FootwearSizeSystem.Eu, ['42', '42.5'])
    ).toEqual(['42', '42.5']);
    expect(
      expandFilterSizes(SizeKind.Apparel, FootwearSizeSystem.Eu, ['m', 'L'])
    ).toEqual(['M', 'L']);
  });

  it('formats size labels', () => {
    expect(formatSizeLabel(SizeKind.Apparel, 'M')).toBe('M');
    expect(
      formatSizeLabel(SizeKind.Footwear, '42', FootwearSizeSystem.Eu)
    ).toBe('EU 42');
    expect(
      formatSizeLabel(SizeKind.Footwear, '42', FootwearSizeSystem.Us)
    ).toBe('US 9');
  });

  it('infers size kind from raw legacy values', () => {
    expect(inferSizeKindFromRaw('xl')).toEqual({
      sizeKind: SizeKind.Apparel,
      size: 'XL',
    });
    expect(inferSizeKindFromRaw('42.5')).toEqual({
      sizeKind: SizeKind.Footwear,
      size: '42.5',
    });
  });

  it('exposes apparel letter list in order', () => {
    expect(APPAREL_SIZES).toEqual([
      'XS',
      'S',
      'M',
      'L',
      'XL',
      'XXL',
      'XXXL',
    ]);
  });
});
