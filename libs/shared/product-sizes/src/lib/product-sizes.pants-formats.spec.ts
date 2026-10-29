import {
  SizeKind,
  expandFilterSizes,
  inferSizeKindFromRaw,
  normalizeSizeCode,
  parsePantsSize,
  FootwearSizeSystem,
} from './product-sizes';

const VALID = [
  '32x34', '32X34', '32 x 34', '32×34', '32*34',
  'W32/L34', 'w32/l34', 'W32 / L34', 'W32xL34', 'w32xl34',
  'W32-L34', 'W32 L34', 'w32 l34', 'W32L34', '32/34', '32 / 34',
];
const INVALID = [
  'W0/L34', '0/34', '-32/34', '32.5/34', 'W999/L34', '999/34',
  '0x34', '-32x34', '32.5x34', '999x34',
];

describe('product-sizes pants notation coverage (P1b)', () => {
  it.each(VALID)('parsePantsSize(%s) -> 32/34', (raw) => {
    expect(parsePantsSize(raw)).toEqual({ waist: 32, inseam: 34 });
  });

  it.each(INVALID)('parsePantsSize(%s) -> null', (raw) => {
    expect(parsePantsSize(raw)).toBeNull();
  });

  it.each(VALID)('normalizeSizeCode(Pants, %s) -> 32x34', (raw) => {
    expect(normalizeSizeCode(SizeKind.Pants, raw)).toBe('32x34');
  });

  it.each([...INVALID, '', '   ', 'M'])('normalizeSizeCode(Pants, %s) -> null', (raw) => {
    expect(normalizeSizeCode(SizeKind.Pants, raw)).toBeNull();
  });

  it.each(VALID)('inferSizeKindFromRaw(%s) -> Pants 32x34', (raw) => {
    expect(inferSizeKindFromRaw(raw)).toEqual({ sizeKind: SizeKind.Pants, size: '32x34' });
  });

  it.each(['0x34', '-32x34', '32.5x34', '999x34'])('inferSizeKindFromRaw(%s) is not Pants', (raw) => {
    expect(inferSizeKindFromRaw(raw).sizeKind).not.toBe(SizeKind.Pants);
  });

  it('expandFilterSizes(Pants) normalizes, drops invalid, dedupes in order', () => {
    expect(
      expandFilterSizes(SizeKind.Pants, FootwearSizeSystem.Eu, [
        '32x34', 'W32/L34', '32/34', '32X34', '34x32', '0x34', 'M',
      ]),
    ).toEqual(['32x34', '34x32']);
  });
});