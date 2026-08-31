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
  const [currentLocale, setCurrentLocale] = useState<Locales>(DEFAULT_LOCALE);
  const [isLoading, setIsLoading] = useState(true);
  const i18nContext = useContext(I18nContext);

  // Initialize language from localStorage or browser detection
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const localeToUse = getInitialLocale();
        const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

        await loadLocaleAsync(localeToUse);
        setCurrentLocale(localeToUse);

        if (!storedLanguage) {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, localeToUse);
        }
      } catch (error) {
        console.error('Failed to initialize language:', error);
        // Fallback to Farsi
        setCurrentLocale(DEFAULT_LOCALE);
      } finally {
        setIsLoading(false);
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
