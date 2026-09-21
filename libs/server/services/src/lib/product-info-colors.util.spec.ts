import {
  formatProductInfoColorNames,
  orderedColorsFromLinks,
  serializeProductInfoColorHexes,
} from './product-info-colors.util';

describe('product-info-colors.util', () => {
  const red = { id: 1, name: 'Red', hexCode: '#ff0000' } as never;
  const blue = { id: 2, name: 'Blue', hexCode: '#0000ff' } as never;

  it('orders colors by position', () => {
    const links = [
      { position: 1, color: blue },
      { position: 0, color: red },
    ] as never[];

    expect(orderedColorsFromLinks(links)).toEqual([red, blue]);
  });

  it('serializes hex codes and formats names', () => {
    const links = [
      { position: 0, color: red },
      { position: 1, color: blue },
    ] as never[];

    expect(serializeProductInfoColorHexes(links)).toBe('#ff0000,#0000ff');
    expect(formatProductInfoColorNames(links)).toBe('Red / Blue');
  });

  it('handles empty links', () => {
    expect(orderedColorsFromLinks(null)).toEqual([]);
    expect(serializeProductInfoColorHexes([])).toBeUndefined();
    expect(formatProductInfoColorNames(undefined)).toBe('');
  });
});
