import { useEffect } from 'react';

export interface SeoMetaOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'product';
  ogImage?: string;
  noindex?: boolean;
}

export const CANONICAL_ORIGIN = 'https://saintbala.com' as const;
const DEFAULT_OG_IMAGE = 'https://saintbala.com/assets/hero/hero-center-jordan.jpg';
const SITE_NAME = 'SAINTBALA' as const;

function upsertMetaTag(name: string, content: string, isProperty = false): void {
  if (typeof document === 'undefined') return;
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

function upsertLinkTag(rel: string, href: string): void {
  if (typeof document === 'undefined') return;
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function normalizeCanonicalPath(path?: string): string {
  if (!path) {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  }
  let normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function buildCanonicalUrl(canonicalPath?: string): string {
  const path = normalizeCanonicalPath(canonicalPath);
  return `${CANONICAL_ORIGIN}${path}`;
}

export function useSeoMeta(options: SeoMetaOptions): void {
  const {
    title,
    description,
    canonicalPath,
    ogType = 'website',
    ogImage,
    noindex = false,
  } = options;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canonicalUrl = buildCanonicalUrl(canonicalPath);
    const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
    const finalTitle = title || document.title || SITE_NAME;
    const finalDescription = description || '';

    // Canonical link
    upsertLinkTag('canonical', canonicalUrl);

    // Meta description
    if (finalDescription) {
      upsertMetaTag('description', finalDescription);
    }

    // Open Graph tags
    upsertMetaTag('og:site_name', SITE_NAME, true);
    upsertMetaTag('og:type', ogType, true);
    upsertMetaTag('og:title', finalTitle, true);
    if (finalDescription) {
      upsertMetaTag('og:description', finalDescription, true);
    }
    upsertMetaTag('og:url', canonicalUrl, true);
    upsertMetaTag('og:image', finalOgImage, true);

    // Twitter Card tags
    upsertMetaTag('twitter:card', 'summary_large_image');
    upsertMetaTag('twitter:title', finalTitle);
    if (finalDescription) {
      upsertMetaTag('twitter:description', finalDescription);
    }
    upsertMetaTag('twitter:image', finalOgImage);

    // Robots meta tag
    upsertMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

  }, [title, description, canonicalPath, ogType, ogImage, noindex]);
}
