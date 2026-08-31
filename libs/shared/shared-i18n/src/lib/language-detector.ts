import { LocaleDetector } from 'typesafe-i18n/detectors';
import type { Locales } from './locales/i18n-types';

export const LANGUAGE_STORAGE_KEY = 'kickzone-language-preference';
export const DEFAULT_LOCALE: Locales = 'fa';

const SUPPORTED_LOCALES: Locales[] = ['en', 'fa'];

/** First-visit default is Farsi; only a saved preference overrides it. */
export function getInitialLocale(): Locales {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Locales | null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }

  return DEFAULT_LOCALE;
}

export const localStorageDetector: LocaleDetector = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage ? [storedLanguage] : [];
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
    return [];
  }
};
