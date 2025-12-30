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
import { useUIStore } from '@kickzone-workspace/shared-ui-store';

interface ThemeContextType {
  direction: 'ltr' | 'rtl';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface RTLThemeProviderProps {
  children: ReactNode;
}

export function RTLThemeProvider({ children }: RTLThemeProviderProps) {
  const { currentLocale } = useLanguageContext();
  const themeState = useUIStore((s) => s.theme);
  const mode = themeState.mode;

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

  // Create theme with RTL support and glassmorphism styles
  const theme = useMemo(() => {
    const palette =
      mode === 'dark'
        ? {
            mode: 'dark' as const,
            primary: {
              main: '#d8c58a',
              light: '#e8dbb3',
              dark: '#9f884f',
            },
            secondary: {
              main: '#f5f5f5',
              light: '#ffffff',
              dark: '#cfcfcf',
            },
            background: {
              default: '#0c0c10',
              paper: '#14141a',
            },
            text: {
              primary: '#f5f5f5',
              secondary: '#d5d5d5',
            },
          }
        : {
            mode: 'light' as const,
            primary: {
              main: '#c8b37a',
              light: '#e6d9ad',
              dark: '#8f7845',
            },
            secondary: {
              main: '#0f0f0f',
              light: '#3a3a3a',
              dark: '#000000',
            },
            background: {
              default: '#f6f6f8',
              paper: '#ffffff',
            },
            text: {
              primary: '#0f0f0f',
              secondary: '#3c3c3c',
            },
          };

    return createTheme({
      direction,
      typography: {
        fontFamily: isRTL
          ? '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif'
          : '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      palette,
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: isRTL
                ? '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif'
                : '"Roboto", "Helvetica", "Arial", sans-serif',
              backgroundColor: palette.background.default,
              color: palette.text.primary,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(14, 14, 18, 0.7) !important'
                  : 'rgba(255, 255, 255, 0.1) !important',
              color: mode === 'dark' ? '#f5f5f5' : undefined,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow:
                mode === 'dark'
                  ? '0 8px 28px 0 rgba(0, 0, 0, 0.45)'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0 !important',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              // Glassmorphism effect for all paper components
              backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
              backdropFilter: 'blur(10px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(10px) saturate(180%) !important',
              borderRadius: '16px !important',
              border: '1px solid rgba(255, 255, 255, 0.3) !important',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1) !important',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            elevation1: {
              boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
            },
            elevation2: {
              boxShadow: '0 8px 24px 0 rgba(31, 38, 135, 0.12)',
            },
            elevation3: {
              boxShadow: '0 12px 32px 0 rgba(31, 38, 135, 0.15)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(20, 20, 26, 0.75) !important'
                  : 'rgba(255, 255, 255, 0.75) !important',
              backdropFilter: 'blur(10px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(10px) saturate(180%) !important',
              borderRadius: '16px !important',
              border:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08) !important'
                  : '1px solid rgba(255, 255, 255, 0.3) !important',
              boxShadow:
                mode === 'dark'
                  ? '0 12px 36px 0 rgba(0, 0, 0, 0.35) !important'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.1) !important',
              transition:
                'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow:
                  mode === 'dark'
                    ? '0 16px 46px 0 rgba(0, 0, 0, 0.45)'
                    : '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
              },
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(16, 16, 22, 0.9) !important'
                  : 'rgba(255, 255, 255, 0.85) !important',
              backdropFilter: 'blur(20px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
              borderRight:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
              borderLeft:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow:
                mode === 'dark'
                  ? '0 10px 32px 0 rgba(0, 0, 0, 0.45)'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(18, 18, 24, 0.92) !important'
                  : 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(20px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
              borderRadius: '20px',
              border:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(20, 20, 26, 0.9) !important'
                  : 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(20px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
              borderRadius: '12px',
              border:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow:
                mode === 'dark'
                  ? '0 10px 30px 0 rgba(0, 0, 0, 0.45)'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(22, 22, 28, 0.8) !important'
                  : 'rgba(255, 255, 255, 0.7) !important',
              backdropFilter: 'blur(10px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(10px) saturate(180%) !important',
              borderRadius: '16px',
              border:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 10,
              fontWeight: 700,
            },
            containedPrimary: {
              background:
                'linear-gradient(135deg, #e6d9ad 0%, #c8b37a 60%, #b6974f 100%)',
              color: '#0f0f0f',
              boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, #f2e7bd 0%, #d6c28c 60%, #c39d55 100%)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
              },
            },
          },
        },
      },
    });
  }, [direction, isRTL, mode]);

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
