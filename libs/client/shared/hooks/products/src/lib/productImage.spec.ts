import { describe, it, expect } from 'vitest';
import {
  resolveProductImageUrl,
  getProductPrimaryImage,
} from './productImage';

describe('resolveProductImageUrl', () => {
  it('returns empty string for null, undefined, or empty values', () => {
    expect(resolveProductImageUrl(null)).toBe('');
    expect(resolveProductImageUrl(undefined)).toBe('');
    expect(resolveProductImageUrl('')).toBe('');
    expect(resolveProductImageUrl('   ')).toBe('');
  });

  it('preserves valid relative paths starting with slash', () => {
    expect(resolveProductImageUrl('/uploads/products/shoe.jpg')).toBe(
      '/uploads/products/shoe.jpg'
    );
  });

  it('adds leading slash to relative paths without leading slash', () => {
    expect(resolveProductImageUrl('uploads/products/shoe.jpg')).toBe(
      '/uploads/products/shoe.jpg'
    );
  });

  it('strips http://127.0.0.1:4000 to prevent mixed content and SSL protocol errors', () => {
    expect(
      resolveProductImageUrl(
        'http://127.0.0.1:4000/uploads/products/shoe.jpg'
      )
    ).toBe('/uploads/products/shoe.jpg');
  });

  it('strips http://localhost:4000 to prevent mixed content and SSL protocol errors', () => {
    expect(
      resolveProductImageUrl(
        'http://localhost:4000/uploads/products/shoe.jpg'
      )
    ).toBe('/uploads/products/shoe.jpg');
  });

  it('preserves external https URLs', () => {
    expect(resolveProductImageUrl('https://example.com/photo.png')).toBe(
      'https://example.com/photo.png'
    );
  });

  it('preserves protocol-relative URLs', () => {
    expect(resolveProductImageUrl('//cdn.example.com/photo.png')).toBe(
      '//cdn.example.com/photo.png'
    );
  });
});

describe('getProductPrimaryImage', () => {
  it('returns null if product is null or undefined', () => {
    expect(getProductPrimaryImage(null)).toBeNull();
    expect(getProductPrimaryImage(undefined)).toBeNull();
  });

  it('returns the first image from the first productInfo that has images', () => {
    const product = {
      productInfos: [
        { images: [] },
        { images: ['/uploads/products/variant2.jpg'] },
      ],
    };
    expect(getProductPrimaryImage(product)).toBe(
      '/uploads/products/variant2.jpg'
    );
  });

  it('falls back to sellerProducts if productInfos have no images', () => {
    const product = {
      productInfos: [{ images: [] }],
      sellerProducts: [
        {
          productInfo: {
            images: ['/uploads/products/seller-prod.jpg'],
          },
        },
      ],
    };
    expect(getProductPrimaryImage(product)).toBe(
      '/uploads/products/seller-prod.jpg'
    );
  });

  it('returns null when no images are present anywhere', () => {
    const product = {
      productInfos: [{ images: [] }],
      sellerProducts: [{ productInfo: { images: [] } }],
    };
    expect(getProductPrimaryImage(product)).toBeNull();
  });
});
