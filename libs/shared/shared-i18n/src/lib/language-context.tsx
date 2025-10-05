import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { loadLocaleAsync } from './locales/i18n-util.async';
import { detectLocale } from './locales/i18n-util';
import { navigatorDetector } from './locales/navigator-detector';
import type { Locales } from './locales/i18n-types';
import { I18nContext } from './locales/i18n-react';

interface LanguageContextType {
  currentLocale: Locales;
  setLocale: (locale: Locales) => void;
  availableLocales: { code: Locales; name: string; nativeName: string }[];
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = 'kickzone-language-preference';

// Available languages with their display names
const AVAILABLE_LOCALES = [
  { code: 'en' as Locales, name: 'English', nativeName: 'English' },
  { code: 'fa' as Locales, name: 'Farsi', nativeName: 'فارسی' },
];

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<Locales>('en'); // Default to English
  const [isLoading, setIsLoading] = useState(true);
  const i18nContext = useContext(I18nContext);

  // Initialize language from localStorage or browser detection
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Check localStorage first
        const storedLanguage = localStorage.getItem(
          LANGUAGE_STORAGE_KEY
        ) as Locales;

        let localeToUse: Locales;

        if (
          storedLanguage &&
          AVAILABLE_LOCALES.some((l) => l.code === storedLanguage)
        ) {
          localeToUse = storedLanguage;
        } else {
          // Detect browser language, fallback to English if not supported
          const detectedLocale = detectLocale(navigatorDetector);
          localeToUse = AVAILABLE_LOCALES.some((l) => l.code === detectedLocale)
            ? detectedLocale
            : 'en'; // Default to English
        }

        // Load the locale
        await loadLocaleAsync(localeToUse);
        setCurrentLocale(localeToUse);

        // Store in localStorage if not already stored
        if (!storedLanguage) {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, localeToUse);
        }
      } catch (error) {
        console.error('Failed to initialize language:', error);
        // Fallback to English
        setCurrentLocale('en');
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

  const value: LanguageContextType = {
    currentLocale,
    setLocale,
    availableLocales: AVAILABLE_LOCALES,
    isLoading,
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
