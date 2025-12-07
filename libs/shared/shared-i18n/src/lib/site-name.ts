/**
 * Centralized site name configuration
 * Change the site name here to update it across the entire application
 */
export const SITE_NAME = {
  en: "Master's Key",
  fa: 'مسترز کی',
} as const;

export type SiteNameLocale = keyof typeof SITE_NAME;
