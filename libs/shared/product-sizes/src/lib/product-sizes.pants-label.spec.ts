import { SizeKind, formatSizeLabel } from './product-sizes';

const CANONICAL = () => formatSizeLabel(SizeKind.Pants, '32x34');

describe('product-sizes formatSizeLabel pants (P1c)', () => {
  it('canonical label contains waist and inseam', () => {
    expect(CANONICAL()).toContain('32');
    expect(CANONICAL()).toContain('34');
  });

  it.each(['32X34', '32×34', 'W32/L34', 'w32/l34', '32/34', 'W32 L34', 'W32L34', ' 32x34 '])(
    'formatSizeLabel(Pants, %s) equals the canonical label',
    (raw) => {
      expect(formatSizeLabel(SizeKind.Pants, raw)).toBe(CANONICAL());
    },
  );

  it.each(['M', '0x34', '999x34', '32.5x34', 'abc'])(
    'formatSizeLabel(Pants, %s) does not throw or leak NaN/undefined',
    (raw) => {
      expect(() => formatSizeLabel(SizeKind.Pants, raw)).not.toThrow();
      const label = formatSizeLabel(SizeKind.Pants, raw);
      expect(label).not.toContain('NaN');
      expect(label).not.toContain('undefined');
    },
  );

  it('empty and whitespace-only input returns empty string', () => {
    expect(formatSizeLabel(SizeKind.Pants, '')).toBe('');
    expect(formatSizeLabel(SizeKind.Pants, '   ')).toBe('');
  });
});