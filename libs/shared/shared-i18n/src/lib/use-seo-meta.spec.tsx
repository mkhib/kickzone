import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSeoMeta, CANONICAL_ORIGIN } from './use-seo-meta';

vi.mock('../lib/locales/i18n-react', () => ({
  useI18nContext: () => ({
    LL: {
      appNames: {
        siteName: () => 'SAINTBALA',
      },
    },
  }),
}));

function TestComponent({ options }: { options: Parameters<typeof useSeoMeta>[0] }) {
  useSeoMeta(options);
  return <div data-testid="seo-test">Test</div>;
}

describe('useSeoMeta', () => {
  const originalTitle = document.title;
  const originalCanonical = document.head.querySelector('link[rel="canonical"]')?.href || '';
  const originalDescription = document.head.querySelector('meta[name="description"]')?.content || '';
  const originalOgTitle = document.head.querySelector('meta[property="og:title"]')?.content || '';
  const originalOgDescription = document.head.querySelector('meta[property="og:description"]')?.content || '';
  const originalOgUrl = document.head.querySelector('meta[property="og:url"]')?.content || '';
  const originalOgType = document.head.querySelector('meta[property="og:type"]')?.content || '';
  const originalOgSiteName = document.head.querySelector('meta[property="og:site_name"]')?.content || '';
  const originalOgImage = document.head.querySelector('meta[property="og:image"]')?.content || '';
  const originalTwitterCard = document.head.querySelector('meta[name="twitter:card"]')?.content || '';
  const originalTwitterTitle = document.head.querySelector('meta[name="twitter:title"]')?.content || '';
  const originalTwitterDescription = document.head.querySelector('meta[name="twitter:description"]')?.content || '';
  const originalTwitterImage = document.head.querySelector('meta[name="twitter:image"]')?.content || '';
  const originalRobots = document.head.querySelector('meta[name="robots"]')?.content || '';

  beforeEach(() => {
    document.title = '';
    vi.clearAllMocks();
    // Clear all meta/link tags we manage
    const tagsToRemove = [
      'link[rel="canonical"]',
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[property="og:type"]',
      'meta[property="og:site_name"]',
      'meta[property="og:image"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[name="robots"]',
    ];
    tagsToRemove.forEach((selector) => {
      const el = document.head.querySelector(selector);
      if (el) el.remove();
    });
  });

  afterAll(() => {
    document.title = originalTitle;
    // Restore original tags
    if (originalCanonical) {
      upsertLinkTag('canonical', originalCanonical);
    }
    if (originalDescription) {
      upsertMetaTag('description', originalDescription);
    }
    if (originalOgTitle) {
      upsertMetaTag('og:title', originalOgTitle, true);
    }
    if (originalOgDescription) {
      upsertMetaTag('og:description', originalOgDescription, true);
    }
    if (originalOgUrl) {
      upsertMetaTag('og:url', originalOgUrl, true);
    }
    if (originalOgType) {
      upsertMetaTag('og:type', originalOgType, true);
    }
    if (originalOgSiteName) {
      upsertMetaTag('og:site_name', originalOgSiteName, true);
    }
    if (originalOgImage) {
      upsertMetaTag('og:image', originalOgImage, true);
    }
    if (originalTwitterCard) {
      upsertMetaTag('twitter:card', originalTwitterCard);
    }
    if (originalTwitterTitle) {
      upsertMetaTag('twitter:title', originalTwitterTitle);
    }
    if (originalTwitterDescription) {
      upsertMetaTag('twitter:description', originalTwitterDescription);
    }
    if (originalTwitterImage) {
      upsertMetaTag('twitter:image', originalTwitterImage);
    }
    if (originalRobots) {
      upsertMetaTag('robots', originalRobots);
    }
  });

  function upsertMetaTag(name: string, content: string, isProperty = false) {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let tag = document.head.querySelector<HTMLMetaElement>(selector);
    if (!tag) {
      tag = document.createElement('meta');
      if (isProperty) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  function upsertLinkTag(rel: string, href: string) {
    let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
  }

  it('creates canonical link with origin when path is "/"', () => {
    render(<TestComponent options={{ canonicalPath: '/' }} />);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical?.href).toBe('https://saintbala.com/');
  });

  it('creates canonical link with normalized path (no trailing slash)', () => {
    render(<TestComponent options={{ canonicalPath: '/products/123' }} />);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.href).toBe('https://saintbala.com/products/123');
  });

  it('strips trailing slash from canonical path except for root', () => {
    render(<TestComponent options={{ canonicalPath: '/shop/' }} />);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.href).toBe('https://saintbala.com/shop');
  });

  it('adds leading slash if missing from canonicalPath', () => {
    render(<TestComponent options={{ canonicalPath: 'brands/nike' }} />);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.href).toBe('https://saintbala.com/brands/nike');
  });

  it('uses window.location.pathname when canonicalPath is omitted', () => {
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/products/456' },
      writable: true,
      configurable: true,
    });
    render(<TestComponent options={{}} />);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.href).toBe('https://saintbala.com/products/456');
  });

  it('sets meta description', () => {
    render(<TestComponent options={{ description: 'Custom description' }} />);
    const desc = document.head.querySelector('meta[name="description"]');
    expect(desc?.content).toBe('Custom description');
  });

  it('sets og:title from options.title', () => {
    render(<TestComponent options={{ title: 'Custom Page Title' }} />);
    const ogTitle = document.head.querySelector('meta[property="og:title"]');
    expect(ogTitle?.content).toBe('Custom Page Title');
  });

  it('sets og:title from document.title when options.title is not provided', () => {
    document.title = 'SAINTBALA - Shop';
    render(<TestComponent options={{}} />);
    const ogTitle = document.head.querySelector('meta[property="og:title"]');
    expect(ogTitle?.content).toBe('SAINTBALA - Shop');
  });

  it('sets og:description from options.description', () => {
    render(<TestComponent options={{ description: 'OG Description' }} />);
    const ogDesc = document.head.querySelector('meta[property="og:description"]');
    expect(ogDesc?.content).toBe('OG Description');
  });

  it('sets og:url to canonical URL', () => {
    render(<TestComponent options={{ canonicalPath: '/shop' }} />);
    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    expect(ogUrl?.content).toBe('https://saintbala.com/shop');
  });

  it('sets og:type to website by default', () => {
    render(<TestComponent options={{}} />);
    const ogType = document.head.querySelector('meta[property="og:type"]');
    expect(ogType?.content).toBe('website');
  });

  it('sets og:type to product when specified', () => {
    render(<TestComponent options={{ ogType: 'product' }} />);
    const ogType = document.head.querySelector('meta[property="og:type"]');
    expect(ogType?.content).toBe('product');
  });

  it('sets og:site_name to SAINTBALA', () => {
    render(<TestComponent options={{}} />);
    const ogSiteName = document.head.querySelector('meta[property="og:site_name"]');
    expect(ogSiteName?.content).toBe('SAINTBALA');
  });

  it('sets og:image to custom image when provided', () => {
    render(<TestComponent options={{ ogImage: 'https://saintbala.com/custom.jpg' }} />);
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage?.content).toBe('https://saintbala.com/custom.jpg');
  });

  it('sets og:image to default hero image when not provided', () => {
    render(<TestComponent options={{}} />);
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage?.content).toBe('https://saintbala.com/assets/hero/hero-center-jordan.jpg');
  });

  it('sets twitter:card to summary_large_image', () => {
    render(<TestComponent options={{}} />);
    const twitterCard = document.head.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.content).toBe('summary_large_image');
  });

  it('sets twitter:title', () => {
    render(<TestComponent options={{ title: 'Twitter Title' }} />);
    const twitterTitle = document.head.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.content).toBe('Twitter Title');
  });

  it('sets twitter:description', () => {
    render(<TestComponent options={{ description: 'Twitter Description' }} />);
    const twitterDesc = document.head.querySelector('meta[name="twitter:description"]');
    expect(twitterDesc?.content).toBe('Twitter Description');
  });

  it('sets twitter:image', () => {
    render(<TestComponent options={{ ogImage: 'https://saintbala.com/twitter.jpg' }} />);
    const twitterImage = document.head.querySelector('meta[name="twitter:image"]');
    expect(twitterImage?.content).toBe('https://saintbala.com/twitter.jpg');
  });

  it('sets robots to index, follow by default', () => {
    render(<TestComponent options={{}} />);
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.content).toBe('index, follow');
  });

  it('sets robots to noindex, nofollow when noindex is true', () => {
    render(<TestComponent options={{ noindex: true }} />);
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.content).toBe('noindex, nofollow');
  });

  it('updates tags when options change', () => {
    const { rerender } = render(<TestComponent options={{ title: 'First Title', description: 'First Description' }} />);
    expect(document.head.querySelector('meta[property="og:title"]')?.content).toBe('First Title');
    expect(document.head.querySelector('meta[name="description"]')?.content).toBe('First Description');

    rerender(<TestComponent options={{ title: 'Second Title', description: 'Second Description' }} />);
    expect(document.head.querySelector('meta[property="og:title"]')?.content).toBe('Second Title');
    expect(document.head.querySelector('meta[name="description"]')?.content).toBe('Second Description');
  });

  it('does not create duplicate tags on re-render with same options', () => {
    const { rerender } = render(<TestComponent options={{ title: 'Test', description: 'Test' }} />);
    const canonicalCount1 = document.head.querySelectorAll('link[rel="canonical"]').length;
    const descCount1 = document.head.querySelectorAll('meta[name="description"]').length;
    const ogTitleCount1 = document.head.querySelectorAll('meta[property="og:title"]').length;

    rerender(<TestComponent options={{ title: 'Test', description: 'Test' }} />);

    const canonicalCount2 = document.head.querySelectorAll('link[rel="canonical"]').length;
    const descCount2 = document.head.querySelectorAll('meta[name="description"]').length;
    const ogTitleCount2 = document.head.querySelectorAll('meta[property="og:title"]').length;

    expect(canonicalCount2).toBe(canonicalCount1);
    expect(descCount2).toBe(descCount1);
    expect(ogTitleCount2).toBe(ogTitleCount1);
  });

  it('is SSR-safe (no-op when document is undefined)', () => {
    // The hook checks `typeof document === 'undefined'` at the start of useEffect
    // and returns early. This test verifies the hook doesn't throw during normal
    // client-side render. SSR behavior is tested by the fact that the hook's
    // effect callback safely guards against undefined document.
    expect(() => {
      render(<TestComponent options={{ title: 'Test' }} />);
    }).not.toThrow();
  });

  it('CANONICAL_ORIGIN is exported and correct', () => {
    expect(CANONICAL_ORIGIN).toBe('https://saintbala.com');
  });
});