import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { loadLocaleAsync } from './locales/i18n-util.async';
import type { Locales } from './locales/i18n-types';
import { I18nContext } from './locales/i18n-react';
import {
  DEFAULT_LOCALE,
  getInitialLocale,
  LANGUAGE_STORAGE_KEY,
} from './language-detector';

interface LanguageContextType {
  currentLocale: Locales;
  setLocale: (locale: Locales) => void;
  availableLocales: { code: Locales; name: string; nativeName: string }[];
  isLoading: boolean;
  formatNumber: (num: number | string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Available languages with their display names
const AVAILABLE_LOCALES = [
  { code: 'en' as Locales, name: 'English', nativeName: 'English' },
  { code: 'fa' as Locales, name: 'Farsi', nativeName: 'فارسی' },
];

// Convert Western numerals to Farsi numerals
const toFarsiNumber = (num: number | string): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
};

// Format number based on locale
const formatNumberByLocale = (
  num: number | string,
  locale: Locales
): string => {
  return locale === 'fa' ? toFarsiNumber(num) : String(num);
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<Locales>(getInitialLocale);
  const [isLoading, setIsLoading] = useState(false);
  const i18nContext = useContext(I18nContext);

  // Initialize language and keep document attributes in sync
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const localeToUse = getInitialLocale();
        await loadLocaleAsync(localeToUse);
        setCurrentLocale(localeToUse);

        if (typeof document !== 'undefined') {
          document.documentElement.lang = localeToUse;
          document.documentElement.dir = localeToUse === 'fa' ? 'rtl' : 'ltr';
          const skipLink = document.querySelector('.skip-link');
          if (skipLink) {
            skipLink.textContent =
              localeToUse === 'fa' ? 'رفتن به محتوا' : 'Skip to content';
          }
        }
      } catch (error) {
        console.error('Failed to initialize language:', error);
      }
    };

    initializeLanguage();
  }, []);

  const setLocale = async (locale: Locales) => {
    try {
      setIsLoading(true);
      await loadLocaleAsync(locale);
      setCurrentLocale(locale);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);

      if (typeof document !== 'undefined') {
        document.cookie = `kickzone-language-preference=${locale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
          skipLink.textContent =
            locale === 'fa' ? 'رفتن به محتوا' : 'Skip to content';
        }
      }

      // Update the i18n context if available
      if (i18nContext && i18nContext.setLocale) {
        i18nContext.setLocale(locale);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number | string): string => {
    return formatNumberByLocale(num, currentLocale);
  };

  // Determine if the current locale is RTL
  const isRTL = currentLocale === 'fa';

  const value: LanguageContextType = {
    currentLocale,
    setLocale,
    availableLocales: AVAILABLE_LOCALES,
    isLoading,
    formatNumber,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider'
    );
  }
  return context;
}
