import { ProductInfoResolver } from './product-info.resolver';
import { Color, ProductInfo, ProductInfoColor } from '@kickzone-workspace/entities';

describe('ProductInfoResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    resolver = new ProductInfoResolver();
  });

  it('resolves ALL ordered colors for a product info, not just the first one', () => {
    const colorRed = { id: 1, name: 'Red', hexCode: '#ff0000' } as Color;
    const colorBlue = { id: 2, name: 'Blue', hexCode: '#0000ff' } as Color;
    const colorGreen = { id: 3, name: 'Green', hexCode: '#00ff00' } as Color;

    const productInfo = {
      id: 10,
      colorLinks: [
        { id: 102, position: 1, color: colorBlue } as ProductInfoColor,
        { id: 101, position: 0, color: colorRed } as ProductInfoColor,
        { id: 103, position: 2, color: colorGreen } as ProductInfoColor,
      ],
    } as ProductInfo;

    const colors = resolver.colors(productInfo);

    expect(colors).toHaveLength(3);
    expect(colors[0]).toEqual(colorRed);
    expect(colors[1]).toEqual(colorBlue);
    expect(colors[2]).toEqual(colorGreen);
  });

  it('returns empty array when colorLinks is empty or null', () => {
    expect(resolver.colors({} as unknown as ProductInfo)).toEqual([]);
    expect(resolver.colors({ colorLinks: [] } as unknown as ProductInfo)).toEqual([]);
  });
});
