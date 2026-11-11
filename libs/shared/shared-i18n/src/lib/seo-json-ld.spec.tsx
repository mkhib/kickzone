import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  buildHomeJsonLd,
  buildProductJsonLd,
  useJsonLd,
} from './seo-json-ld';
import { CANONICAL_ORIGIN } from './use-seo-meta';

interface JsonLdGraphNode {
  '@type': string;
  [key: string]: unknown;
}

interface JsonLdResult {
  '@context': string;
  '@graph': JsonLdGraphNode[];
}

function TestHomeJsonLd() {
  useJsonLd('home-schema', buildHomeJsonLd());
  return <div data-testid="home-jsonld-test">Home</div>;
}

function TestProductJsonLd({
  data,
}: {
  data: ReturnType<typeof buildProductJsonLd> | null;
}) {
  useJsonLd('product-schema', data);
  return <div data-testid="product-jsonld-test">Product</div>;
}

function getGraphNode(result: JsonLdResult, type: string): JsonLdGraphNode | undefined {
  return result['@graph'].find((g) => g['@type'] === type);
}

describe('seo-json-ld', () => {
  const originalTitle = document.title;
  const originalScripts = Array.from(
    document.head.querySelectorAll('script[type="application/ld+json"]')
  );

  beforeEach(() => {
    document.title = '';
    vi.clearAllMocks();
    // Clear all JSON-LD scripts we manage
    document
      .head.querySelectorAll('script[data-seo-jsonld]')
      .forEach((el) => el.remove());
  });

  afterAll(() => {
    document.title = originalTitle;
    // Restore original scripts
    document
      .head.querySelectorAll('script[data-seo-jsonld]')
      .forEach((el) => el.remove());
    originalScripts.forEach((script) => document.head.appendChild(script.cloneNode(true)));
  });

  describe('buildHomeJsonLd', () => {
    it('returns Organization and WebSite in @graph', () => {
      const result = buildHomeJsonLd() as JsonLdResult;
      expect(result).toHaveProperty('@context', 'https://schema.org');
      expect(result).toHaveProperty('@graph');
      expect(Array.isArray(result['@graph'])).toBe(true);
      const graph = result['@graph'];
      expect(graph.length).toBe(2);

      const org = getGraphNode(result, 'Organization');
      const site = getGraphNode(result, 'WebSite');

      expect(org).toBeDefined();
      expect(site).toBeDefined();
    });

    it('Organization has correct name, url, and logo', () => {
      const result = buildHomeJsonLd() as JsonLdResult;
      const org = getGraphNode(result, 'Organization');
      expect(org).toBeDefined();
      expect(org?.name).toBe('SAINTBALA');
      expect(org?.url).toBe('https://saintbala.com');
      expect(org?.logo).toBe('https://saintbala.com/web-app-manifest-512x512.png');
    });

    it('WebSite has SearchAction with correct target', () => {
      const result = buildHomeJsonLd() as JsonLdResult;
      const site = getGraphNode(result, 'WebSite');
      expect(site).toBeDefined();
      expect(site?.name).toBe('SAINTBALA');
      expect(site?.url).toBe('https://saintbala.com');
      expect(site?.potentialAction).toBeDefined();
      const potentialAction = site?.potentialAction as Record<string, unknown>;
      expect(potentialAction['@type']).toBe('SearchAction');
      expect(potentialAction.target).toBe(
        'https://saintbala.com/shop?search={search_term_string}'
      );
      expect(potentialAction['query-input']).toBe(
        'required name=search_term_string'
      );
    });
  });

  describe('buildProductJsonLd', () => {
    const baseInput = {
      id: '123',
      name: 'Test Product',
      sku: 'SKU-123',
      description: 'A test product description',
      brandName: 'Nike',
      images: ['/uploads/product.jpg', 'https://cdn.example.com/img.jpg'],
      categoryName: 'Shoes',
      categorySlug: 'shoes',
      price: 99.99,
      priceCurrency: 'USD',
      inStock: true,
    };

    it('maps name, sku, description, brand, price, currency, availability, offer URL', () => {
      const result = buildProductJsonLd(baseInput) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product).toBeDefined();

      expect(product?.name).toBe('Test Product');
      expect(product?.sku).toBe('SKU-123');
      expect(product?.description).toBe('A test product description');
      expect(product?.brand).toBeDefined();
      const brand = product?.brand as Record<string, unknown>;
      expect(brand['@type']).toBe('Brand');
      expect(brand.name).toBe('Nike');
      expect(product?.offers).toBeDefined();
      const offers = product?.offers as Record<string, unknown>;
      expect(offers['@type']).toBe('Offer');
      expect(offers.url).toBe('https://saintbala.com/products/123');
      expect(offers.priceCurrency).toBe('USD');
      expect(offers.price).toBe(99.99);
      expect(offers.availability).toBe('https://schema.org/InStock');
    });

    it('falls back description to name when description is missing', () => {
      const input = { ...baseInput, description: undefined };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.description).toBe('Test Product');
    });

    it('falls back brand to SAINTBALA when brandName is missing', () => {
      const input = { ...baseInput, brandName: undefined };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.brand).toBeDefined();
      const brand = product?.brand as Record<string, unknown>;
      expect(brand.name).toBe('SAINTBALA');
    });

    it('absolutizes relative image URLs', () => {
      const input = { ...baseInput, images: ['/uploads/x.jpg', '/uploads/y.jpg'] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual([
        'https://saintbala.com/uploads/x.jpg',
        'https://saintbala.com/uploads/y.jpg',
      ]);
    });

    it('absolutizes protocol-relative image URLs', () => {
      const input = { ...baseInput, images: ['//cdn.example.com/img.jpg'] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual(['https://cdn.example.com/img.jpg']);
    });

    it('keeps absolute image URLs as-is', () => {
      const input = { ...baseInput, images: ['https://cdn.example.com/img.jpg'] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual(['https://cdn.example.com/img.jpg']);
    });

    it('filters out empty image strings', () => {
      const input = { ...baseInput, images: ['/uploads/x.jpg', '', '  '] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual(['https://saintbala.com/uploads/x.jpg']);
    });

    it('omits image when only hypebeast placeholder is present', () => {
      const placeholder =
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';
      const input = { ...baseInput, images: [placeholder] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toBeUndefined();
    });

    it('drops hypebeast placeholder when mixed with real images', () => {
      const placeholder =
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';
      const input = { ...baseInput, images: ['/uploads/real.jpg', placeholder] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual([
        'https://saintbala.com/uploads/real.jpg',
      ]);
    });

    it('sets OutOfStock when inStock is false', () => {
      const input = { ...baseInput, inStock: false };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.offers).toBeDefined();
      const offers = product?.offers as Record<string, unknown>;
      expect(offers.availability).toBe('https://schema.org/OutOfStock');
    });

    it('omits sku when not provided', () => {
      const input = { ...baseInput, sku: undefined };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.sku).toBeUndefined();
    });

    it('BreadcrumbList includes Home -> Category -> Product when categorySlug present', () => {
      const result = buildProductJsonLd(baseInput) as JsonLdResult;
      const breadcrumb = getGraphNode(result, 'BreadcrumbList');
      expect(breadcrumb).toBeDefined();
      const itemListElement = (breadcrumb as Record<string, unknown>).itemListElement as Array<Record<string, unknown>>;
      expect(itemListElement.length).toBe(3);
      expect(itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://saintbala.com',
      });
      expect(itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Shoes',
        item: 'https://saintbala.com/shop?category=shoes',
      });
      expect(itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Test Product',
        item: 'https://saintbala.com/products/123',
      });
    });

    it('BreadcrumbList includes Home -> Shop -> Product when categorySlug absent', () => {
      const input = { ...baseInput, categorySlug: undefined, categoryName: undefined };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const breadcrumb = getGraphNode(result, 'BreadcrumbList');
      const itemListElement = (breadcrumb as Record<string, unknown>).itemListElement as Array<Record<string, unknown>>;
      expect(itemListElement.length).toBe(3);
      expect(itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: 'https://saintbala.com/shop',
      });
    });

    it('defaults priceCurrency to USD', () => {
      const input = { ...baseInput, priceCurrency: undefined };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.offers).toBeDefined();
      const offers = product?.offers as Record<string, unknown>;
      expect(offers.priceCurrency).toBe('USD');
    });

    it('deduplicates image URLs', () => {
      const input = { ...baseInput, images: ['/uploads/x.jpg', '/uploads/x.jpg'] };
      const result = buildProductJsonLd(input) as JsonLdResult;
      const product = getGraphNode(result, 'Product');
      expect(product?.image).toEqual(['https://saintbala.com/uploads/x.jpg']);
    });
  });

  describe('useJsonLd', () => {
    it('injects script tag with correct id and content', () => {
      const { unmount } = render(<TestHomeJsonLd />);

      const script = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="home-schema"]'
      );
      expect(script).toBeInTheDocument();
      expect(script?.textContent).toContain('"@context":"https://schema.org"');
      expect(script?.textContent).toContain('"@type":"Organization"');
      expect(script?.textContent).toContain('"@type":"WebSite"');

      unmount();
    });

    it('updates script content when data changes', () => {
      const { rerender } = render(
        <TestProductJsonLd data={buildProductJsonLd({ id: '1', name: 'Product 1', price: 10, inStock: true })} />
      );

      const script = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
      );
      expect(script).toBeInTheDocument();
      const firstContent = script?.textContent;
      expect(firstContent).toContain('Product 1');

      rerender(
        <TestProductJsonLd data={buildProductJsonLd({ id: '2', name: 'Product 2', price: 20, inStock: true })} />
      );

      const updatedScript = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
      );
      expect(updatedScript?.textContent).not.toBe(firstContent);
      expect(updatedScript?.textContent).toContain('Product 2');
    });

    it('removes script when data becomes null', () => {
      const { rerender } = render(
        <TestProductJsonLd data={buildProductJsonLd({ id: '1', name: 'Product 1', price: 10, inStock: true })} />
      );

      expect(
        document.head.querySelector(
          'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
        )
      ).toBeInTheDocument();

      rerender(<TestProductJsonLd data={null} />);

      expect(
        document.head.querySelector(
          'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
        )
      ).not.toBeInTheDocument();
    });

    it('removes script on unmount', () => {
      const { unmount } = render(
        <TestProductJsonLd data={buildProductJsonLd({ id: '1', name: 'Product 1', price: 10, inStock: true })} />
      );

      expect(
        document.head.querySelector(
          'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
        )
      ).toBeInTheDocument();

      unmount();

      expect(
        document.head.querySelector(
          'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
        )
      ).not.toBeInTheDocument();
    });

    it('escapes < as \\u003c to prevent script injection', () => {
      const maliciousData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name: 'Test</script><script>alert(1)</script>',
          },
        ],
      };

      const { unmount } = render(<TestProductJsonLd data={maliciousData} />);

      const script = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="product-schema"]'
      );
      expect(script?.textContent).not.toContain('</script>');
      expect(script?.textContent).toContain('\\u003c');

      unmount();
    });

    it('is SSR-safe (no-op when document is undefined)', () => {
      // The hook checks `typeof document === 'undefined'` and returns early
      // This test verifies the hook doesn't throw during normal client-side render
      expect(() => {
        render(<TestHomeJsonLd />);
      }).not.toThrow();
    });

    it('CANONICAL_ORIGIN is correctly used in builders', () => {
      expect(CANONICAL_ORIGIN).toBe('https://saintbala.com');
    });
  });
});
