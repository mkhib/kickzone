import { LocaleDetector } from 'typesafe-i18n/detectors';

const LANGUAGE_STORAGE_KEY = 'kickzone-language-preference';

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
