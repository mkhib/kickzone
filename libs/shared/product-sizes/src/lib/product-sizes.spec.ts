import { describe, expect, it } from 'vitest';
import {
  APPAREL_SIZES,
  euToUs,
  expandFilterSizes,
  formatPantsSize,
  formatSizeLabel,
  FootwearSizeSystem,
  inferSizeKindFromRaw,
  isPantsSizeKind,
  normalizeSizeCode,
  parsePantsSize,
  SizeKind,
  sortSizeCodes,
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
    expect(formatSizeLabel('Apparel' as SizeKind, 'M')).toBe('M');
    expect(
      formatSizeLabel(SizeKind.Footwear, '42', FootwearSizeSystem.Eu)
    ).toBe('EU 42');
    expect(
      formatSizeLabel('Footwear' as SizeKind, '42', FootwearSizeSystem.Eu)
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

  // ── Pants / composite sizing (Waist x Inseam) ──────────────────────

  it('parses pants composite sizes in multiple formats', () => {
    expect(parsePantsSize('32x34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('34 X 32')).toEqual({ waist: 34, inseam: 32 });
    expect(parsePantsSize('W32/L34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('32/34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('  32 x 34  ')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('M')).toBeNull();
    expect(parsePantsSize('42')).toBeNull();
    expect(parsePantsSize('')).toBeNull();
    expect(parsePantsSize('abc')).toBeNull();
  });

  it('formats pants canonical code', () => {
    expect(formatPantsSize(32, 34)).toBe('32x34');
    expect(formatPantsSize(34, 32)).toBe('34x32');
  });

  it('isPantsSizeKind detects PANTS', () => {
    expect(isPantsSizeKind(SizeKind.Pants)).toBe(true);
    expect(isPantsSizeKind('PANTS')).toBe(true);
    expect(isPantsSizeKind('pants')).toBe(true);
    expect(isPantsSizeKind(SizeKind.Apparel)).toBe(false);
    expect(isPantsSizeKind(SizeKind.Footwear)).toBe(false);
    expect(isPantsSizeKind(undefined)).toBe(false);
    expect(isPantsSizeKind(null)).toBe(false);
  });

  it('normalizes pants size codes', () => {
    expect(normalizeSizeCode(SizeKind.Pants, '32x34')).toBe('32x34');
    expect(normalizeSizeCode(SizeKind.Pants, '34 X 32')).toBe('34x32');
    expect(normalizeSizeCode(SizeKind.Pants, 'W32/L34')).toBe('32x34');
    expect(normalizeSizeCode(SizeKind.Pants, 'M')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, '')).toBeNull();
  });

  it('infers pants size kind from raw composite values', () => {
    expect(inferSizeKindFromRaw('32x34')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '32x34',
    });
    expect(inferSizeKindFromRaw('34x32')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '34x32',
    });
    expect(inferSizeKindFromRaw('W32/L34')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '32x34',
    });
  });

  it('sorts pants sizes by waist then inseam', () => {
    expect(sortSizeCodes(SizeKind.Pants, ['34x32', '32x34', '32x30'])).toEqual([
      '32x30',
      '32x34',
      '34x32',
    ]);
    expect(sortSizeCodes(SizeKind.Pants, ['40x34', '32x34', '32x30'])).toEqual([
      '32x30',
      '32x34',
      '40x34',
    ]);
  });

  it('expands pants filter selections to canonical codes', () => {
    expect(
      expandFilterSizes(SizeKind.Pants, FootwearSizeSystem.Eu, [
        '32x34',
        '34 X 32',
      ])
    ).toEqual(['32x34', '34x32']);
    expect(
      expandFilterSizes(SizeKind.Pants, FootwearSizeSystem.Eu, ['invalid'])
    ).toEqual([]);
    expect(expandFilterSizes(SizeKind.Pants, FootwearSizeSystem.Eu, [])).toEqual(
      []
    );
  });

  it('formats pants size labels', () => {
    expect(formatSizeLabel(SizeKind.Pants, '32x34')).toBe('W32/L34');
    expect(formatSizeLabel(SizeKind.Pants, '34x32')).toBe('W34/L32');
    expect(formatSizeLabel('Pants' as SizeKind, '32x34')).toBe('W32/L34');
  });

  // ── Backward compatibility: apparel & footwear unchanged ──────────

  it('apparel sizes still normalize correctly', () => {
    expect(normalizeSizeCode(SizeKind.Apparel, 'm')).toBe('M');
    expect(normalizeSizeCode(SizeKind.Apparel, 'xxxl')).toBe('XXXL');
    expect(normalizeSizeCode(SizeKind.Apparel, 'invalid')).toBeNull();
  });

  it('footwear sizes still normalize correctly', () => {
    expect(normalizeSizeCode(SizeKind.Footwear, '42.0')).toBe('42');
    expect(normalizeSizeCode(SizeKind.Footwear, '42,5')).toBe('42.5');
    expect(normalizeSizeCode(SizeKind.Footwear, '99')).toBeNull();
  });

  it('inference still classifies legacy apparel and footwear', () => {
    expect(inferSizeKindFromRaw('xl')).toEqual({
      sizeKind: SizeKind.Apparel,
      size: 'XL',
    });
    expect(inferSizeKindFromRaw('42.5')).toEqual({
      sizeKind: SizeKind.Footwear,
      size: '42.5',
    });
    expect(inferSizeKindFromRaw('M')).toEqual({
      sizeKind: SizeKind.Apparel,
      size: 'M',
    });
  });
});
