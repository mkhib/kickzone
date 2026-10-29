import {
  SizeKind,
  expandFilterSizes,
  formatPantsSize,
  formatSizeLabel,
  inferSizeKindFromRaw,
  normalizeSizeCode,
  parsePantsSize,
} from './product-sizes';

describe('product-sizes strict pants parsing and formatting (P1a)', () => {
  it('parses valid 1..99 integer waist and inseam formats', () => {
    expect(parsePantsSize('32x34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('1x99')).toEqual({ waist: 1, inseam: 99 });
    expect(parsePantsSize('32X34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('32×34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('W32/L34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('w32/l34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('32/34')).toEqual({ waist: 32, inseam: 34 });
    expect(parsePantsSize('W32 L34')).toEqual({ waist: 32, inseam: 34 });
  });

  it('rejects 0, leading zeros, negative, decimal, >99, empty, and non-numeric inputs in parsePantsSize', () => {
    expect(parsePantsSize('0x34')).toBeNull();
    expect(parsePantsSize('32x0')).toBeNull();
    expect(parsePantsSize('032x34')).toBeNull();
    expect(parsePantsSize('-32x34')).toBeNull();
    expect(parsePantsSize('32x-34')).toBeNull();
    expect(parsePantsSize('32.5x34')).toBeNull();
    expect(parsePantsSize('32x34.5')).toBeNull();
    expect(parsePantsSize('100x34')).toBeNull();
    expect(parsePantsSize('32x100')).toBeNull();
    expect(parsePantsSize('999x34')).toBeNull();
    expect(parsePantsSize('')).toBeNull();
    expect(parsePantsSize('   ')).toBeNull();
    expect(parsePantsSize('32x')).toBeNull();
    expect(parsePantsSize('x34')).toBeNull();
    expect(parsePantsSize('abc')).toBeNull();
  });

  it('formats valid 1..99 integers and returns empty string for invalid inputs in formatPantsSize', () => {
    expect(formatPantsSize(32, 34)).toBe('32x34');
    expect(formatPantsSize('32', '34')).toBe('32x34');
    expect(formatPantsSize(' 32 ', ' 34 ')).toBe('32x34');
    expect(formatPantsSize(1, 99)).toBe('1x99');
    expect(formatPantsSize(0, 34)).toBe('');
    expect(formatPantsSize(32, 0)).toBe('');
    expect(formatPantsSize('0', '34')).toBe('');
    expect(formatPantsSize('032', '34')).toBe('');
    expect(formatPantsSize(-32, 34)).toBe('');
    expect(formatPantsSize(32, -34)).toBe('');
    expect(formatPantsSize(32.5, 34)).toBe('');
    expect(formatPantsSize('32.5', '34')).toBe('');
    expect(formatPantsSize(999, 34)).toBe('');
    expect(formatPantsSize(32, 100)).toBe('');
    expect(formatPantsSize('', 34)).toBe('');
    expect(formatPantsSize(32, '')).toBe('');
    expect(formatPantsSize('   ', '34')).toBe('');
    expect(formatPantsSize('abc', '34')).toBe('');
    expect(formatPantsSize(NaN, 34)).toBe('');
    expect(formatPantsSize(Infinity, 34)).toBe('');
  });

  it('preserves kind-first normalizeSizeCode null contract, inferSizeKindFromRaw shape, formatSizeLabel, and canonical expandFilterSizes', () => {
    expect(normalizeSizeCode(SizeKind.Pants, '32x34')).toBe('32x34');
    expect(normalizeSizeCode(SizeKind.Pants, 'W32/L34')).toBe('32x34');
    expect(normalizeSizeCode(SizeKind.Pants, '32/34')).toBe('32x34');
    expect(normalizeSizeCode(SizeKind.Pants, '0x34')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, '-32x34')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, '32.5x34')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, '999x34')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, '')).toBeNull();
    expect(normalizeSizeCode(SizeKind.Pants, 'M')).toBeNull();
    expect(inferSizeKindFromRaw('32x34')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '32x34',
    });
    expect(inferSizeKindFromRaw('W32/L34')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '32x34',
    });
    expect(inferSizeKindFromRaw('32/34')).toEqual({
      sizeKind: SizeKind.Pants,
      size: '32x34',
    });
    expect(formatSizeLabel(SizeKind.Pants, 'W32/L34')).toBe(
      formatSizeLabel(SizeKind.Pants, '32x34'),
    );
    expect(formatSizeLabel(SizeKind.Pants, '32/34')).toBe(
      formatSizeLabel(SizeKind.Pants, '32x34'),
    );
    expect(
      expandFilterSizes(SizeKind.Pants, undefined, ['32x34', 'W32/L34', '34x32']),
    ).toEqual(['32x34', '34x32']);
  });
});