import { useEffect } from 'react';
import { CANONICAL_ORIGIN } from './use-seo-meta';
import { SITE_NAME } from './site-name';

/**
 * Builds the JSON-LD for the home page: Organization + WebSite with SearchAction.
 * Returns an object with @context and @graph containing both types.
 */
export function buildHomeJsonLd(): Record<string, unknown> {
  const organization = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: CANONICAL_ORIGIN,
    logo: 'https://saintbala.com/web-app-manifest-512x512.png',
  };

  const webSite = {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: CANONICAL_ORIGIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://saintbala.com/shop?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, webSite],
  };
}

export interface BuildProductJsonLdInput {
  id: string | number;
  name: string;
  sku?: string;
  description?: string;
  brandName?: string;
  images?: string[];
  categoryName?: string;
  categorySlug?: string;
  price: number;
  priceCurrency?: string;
  inStock: boolean;
}

/**
 * Absolutizes an image URL using CANONICAL_ORIGIN.
 * - Root-relative paths (/uploads/x.jpg) become https://saintbala.com/uploads/x.jpg
 * - Protocol-relative (//cdn.example.com/img.jpg) become https://cdn.example.com/img.jpg
 * - Absolute URLs are returned as-is.
 * - Empty/falsy values are filtered out by the caller.
 */
function absolutizeImageUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  if (url.startsWith('/')) {
    return `${CANONICAL_ORIGIN}${url}`;
  }
  return url;
}

/**
 * Builds the JSON-LD for a product page: Product + BreadcrumbList.
 * Returns an object with @context and @graph containing both types.
 */
export function buildProductJsonLd(input: BuildProductJsonLdInput): Record<string, unknown> {
  const {
    id,
    name,
    sku,
    description,
    brandName,
    images,
    categoryName,
    categorySlug,
    price,
    priceCurrency = 'USD',
    inStock,
  } = input;

  // Product object
  const product: Record<string, unknown> = {
    '@type': 'Product',
    name,
    description: description || name,
    brand: {
      '@type': 'Brand',
      name: brandName || SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${CANONICAL_ORIGIN}/products/${id}`,
      priceCurrency,
      price,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  if (sku) {
    product.sku = sku;
  }

  // Handle images: drop empties and the PDP hypebeast placeholder, absolutize, deduplicate
  if (images && images.length > 0) {
    const absoluteImages = images
      .filter((img) => img && img.trim() !== '')
      .filter((img) => !img.includes('hypebeast.com'))
      .map(absolutizeImageUrl)
      .filter((url, index, self) => self.indexOf(url) === index);

    if (absoluteImages.length > 0) {
      product.image = absoluteImages;
    }
  }

  // BreadcrumbList
  const breadcrumbItems: Array<Record<string, unknown>> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: CANONICAL_ORIGIN,
    },
  ];

  let position = 2;

  if (categorySlug) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: position++,
      name: categoryName || 'Shop',
      item: `${CANONICAL_ORIGIN}/shop?category=${encodeURIComponent(categorySlug)}`,
    });
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: position++,
      name: 'Shop',
      item: `${CANONICAL_ORIGIN}/shop`,
    });
  }

  breadcrumbItems.push({
    '@type': 'ListItem',
    position,
    name,
    item: `${CANONICAL_ORIGIN}/products/${id}`,
  });

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [product, breadcrumbList],
  };
}

/**
 * Hook to upsert/remove a JSON-LD script tag in document.head.
 * - When data is provided, creates/updates a script with type="application/ld+json" and data-seo-jsonld={id}
 * - When data is null, removes the script with that id
 * - On unmount, removes the script
 * - Escapes '<' as '\u003c' to prevent </script> injection
 */
export function useJsonLd(
  id: string,
  data: Record<string, unknown> | null
): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const selector = `script[type="application/ld+json"][data-seo-jsonld="${id}"]`;
    let script = document.head.querySelector<HTMLScriptElement>(selector);

    if (data === null) {
      if (script) {
        script.remove();
      }
      return;
    }

    const json = JSON.stringify(data).replace(/</g, '\\u003c');

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', id);
      document.head.appendChild(script);
    }

    script.textContent = json;
  }, [id, data]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof document === 'undefined') return;
      const selector = `script[type="application/ld+json"][data-seo-jsonld="${id}"]`;
      const script = document.head.querySelector<HTMLScriptElement>(selector);
      if (script) {
        script.remove();
      }
    };
  }, [id]);
}
