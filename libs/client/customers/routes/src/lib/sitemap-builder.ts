export interface SitemapBuilderOptions {
  brands?: string[];
  categories?: string[];
  productIds?: Array<number | string>;
}

const ORIGIN = 'https://saintbala.com';

const PUBLIC_ROUTES = [
  '/',
  '/shop',
  '/contact',
  '/guide/authenticity',
  '/guide/payment',
  '/shipping-returns',
  '/privacy-policy',
] as const;

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrl(loc: string): string {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
}

export function buildSitemap(options: SitemapBuilderOptions = {}): string {
  const { brands = [], categories = [], productIds = [] } = options;

  const urls: string[] = [];

  for (const route of PUBLIC_ROUTES) {
    urls.push(buildUrl(`${ORIGIN}${route}`));
  }

  for (const category of categories) {
    const loc = `${ORIGIN}/shop?category=${encodeURIComponent(category)}`;
    urls.push(buildUrl(loc));
  }

  for (const brand of brands) {
    const loc = `${ORIGIN}/brands/${encodeURIComponent(brand.toLowerCase())}`;
    urls.push(buildUrl(loc));
  }

  for (const productId of productIds) {
    const loc = `${ORIGIN}/products/${encodeURIComponent(String(productId))}`;
    urls.push(buildUrl(loc));
  }

  const urlSet = urls.join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet}\n</urlset>`;
}
