/**
 * Resolves a product image path/URL for safe display in the browser across all environments
 * (local Vite dev server with HTTPS, and production with Nginx reverse proxy).
 *
 * Handles:
 * - relative paths like `/uploads/products/xyz.jpg`
 * - relative paths missing leading slash like `uploads/products/xyz.jpg`
 * - localhost:4000 / 127.0.0.1:4000 URLs: strips the origin so requests route via the current origin
 *   over HTTPS (through Vite proxy in dev or Nginx in prod), avoiding mixed-content and SSL errors.
 * - absolute external URLs (https://, http://, //): preserved as-is.
 */
export function resolveProductImageUrl(img?: string | null): string {
  if (!img) return '';
  const trimmed = img.trim();
  if (!trimmed) return '';

  // Strip localhost / 127.0.0.1:4000 backend origin so requests route via same-origin proxy (HTTPS)
  const localhostMatch = trimmed.match(
    /^https?:\/\/(?:127\.0\.0\.1|localhost):4000(\/.*)$/i
  );
  if (localhostMatch) {
    return localhostMatch[1];
  }

  // Already a full external URL (http, https, //)
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('//')
  ) {
    return trimmed;
  }

  // Absolute path from origin
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Relative path missing leading slash (e.g. "uploads/products/...")
  return `/${trimmed}`;
}

/**
 * Extracts the first available product image from productInfos or sellerProducts.
 */
export function getProductPrimaryImage(
  product?: {
    productInfos?: Array<{ images?: string[] | null }> | null;
    sellerProducts?: Array<{
      productInfo?: { images?: string[] | null } | null;
    }> | null;
  } | null
): string | null {
  if (!product) return null;
  return (
    product.productInfos?.find(
      (pi) => pi.images && pi.images.length > 0 && !!pi.images[0]
    )?.images?.[0] ||
    product.productInfos?.[0]?.images?.[0] ||
    product.sellerProducts?.find(
      (sp) =>
        sp.productInfo?.images &&
        sp.productInfo.images.length > 0 &&
        !!sp.productInfo.images[0]
    )?.productInfo?.images?.[0] ||
    null
  );
}
