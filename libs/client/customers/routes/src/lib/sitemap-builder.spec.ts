import { describe, it, expect } from 'vitest';
import { buildSitemap } from './sitemap-builder';

describe('buildSitemap', () => {
  const ORIGIN = 'https://saintbala.com';

  it('includes all public routes with correct origin', () => {
    const xml = buildSitemap({});

    expect(xml).toContain(`<loc>${ORIGIN}/</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/shop</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/contact</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/guide/authenticity</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/guide/payment</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/shipping-returns</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/privacy-policy</loc>`);
  });

  it('excludes private routes', () => {
    const xml = buildSitemap({});

    expect(xml).not.toContain('/cart');
    expect(xml).not.toContain('/login');
    expect(xml).not.toContain('/signup');
    expect(xml).not.toContain('/forgot-password');
    expect(xml).not.toContain('/reset-password/');
    expect(xml).not.toContain('/orders');
    expect(xml).not.toContain('/profile');
    expect(xml).not.toContain('/favorites');
    expect(xml).not.toContain('/order-confirmation');
    expect(xml).not.toContain('/payment-callback');
    expect(xml).not.toContain('/unauthorized');
    expect(xml).not.toContain('/language-settings');
  });

  it('produces escaped loc entries for dynamic categories', () => {
    const xml = buildSitemap({ categories: ['foo&bar', 'men', 'women'] });

    expect(xml).toContain(`<loc>${ORIGIN}/shop?category=foo%26bar</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/shop?category=men</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/shop?category=women</loc>`);
  });

  it('produces escaped loc entries for dynamic brands (lowercase)', () => {
    const xml = buildSitemap({ brands: ['Nike', 'Adidas&Co'] });

    expect(xml).toContain(`<loc>${ORIGIN}/brands/nike</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/brands/adidas%26co</loc>`);
  });

  it('produces escaped loc entries for dynamic product IDs', () => {
    const xml = buildSitemap({ productIds: [123, 'abc&def'] });

    expect(xml).toContain(`<loc>${ORIGIN}/products/123</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/products/abc%26def</loc>`);
  });

  it('returns well-formed XML with declaration and urlset', () => {
    const xml = buildSitemap({});

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
  });

  it('handles empty arrays gracefully', () => {
    const xml = buildSitemap({ brands: [], categories: [], productIds: [] });

    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
  });

  it('escapes all XML special characters', () => {
    const xml = buildSitemap({
      categories: ['a&b', 'c<d', 'e>f', 'g"h', "i'j"],
    });

    expect(xml).toContain('a%26b');
    expect(xml).toContain('c%3Cd');
    expect(xml).toContain('e%3Ef');
    expect(xml).toContain('g%22h');
    expect(xml).toContain('i&apos;j');
  });
});
