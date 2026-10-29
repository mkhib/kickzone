import {
  SizeKind,
  expandFilterSizes,
  inferSizeKindFromRaw,
  normalizeSizeCode,
  parsePantsSize,
} from './product-sizes';

describe('product-sizes strict pants parsing (P1a-1)', () => {
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

  it('rejects 0, leading zeros, negative, decimal, >99, empty, and non-numeric inputs', () => {
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

  it('preserves kind-first normalizeSizeCode null contract and canonical expandFilterSizes', () => {
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
    expect(
      expandFilterSizes(SizeKind.Pants, undefined, ['32x34', 'W32/L34', '34x32']),
    ).toEqual(['32x34', '34x32']);
  });
});