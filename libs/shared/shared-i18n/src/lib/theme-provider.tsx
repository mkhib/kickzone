import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { useLanguageContext } from './language-context';

interface ThemeContextType {
  direction: 'ltr' | 'rtl';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface RTLThemeProviderProps {
  children: ReactNode;
}

export function RTLThemeProvider({ children }: RTLThemeProviderProps) {
  const { currentLocale } = useLanguageContext();

  // Determine if the current locale is RTL
  const isRTL = currentLocale === 'fa';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Create emotion cache for RTL
  const cacheRtl = useMemo(() => {
    if (isRTL) {
      return createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });
    }
    return createCache({
      key: 'muiltr',
      stylisPlugins: [prefixer],
    });
  }, [isRTL]);

  // Update document direction and dir attribute
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.setAttribute('dir', direction);

    // Load Vazir font for Farsi
    if (isRTL) {
      const link = document.createElement('link');
      link.href =
        'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [direction, isRTL]);

  // Create theme with RTL support
  const theme = createTheme({
    direction,
    typography: {
      fontFamily: isRTL
        ? '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: isRTL
              ? '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif'
              : '"Roboto", "Helvetica", "Arial", sans-serif',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ direction }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a RTLThemeProvider');
  }
  return context;
}
