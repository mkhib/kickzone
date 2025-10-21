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

  // Create theme with RTL support and glassmorphism styles
  const theme = createTheme({
    direction,
    typography: {
      fontFamily: isRTL
        ? '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      background: {
        default: '#f5f7fa',
        paper: 'rgba(255, 255, 255, 0.7)',
      },
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            // Glassmorphism effect for app bar
            backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.75) !important',
            backdropFilter: 'blur(10px) saturate(180%) !important',
            WebkitBackdropFilter: 'blur(10px) saturate(180%) !important',
            borderRadius: '16px !important',
            border: '1px solid rgba(255, 255, 255, 0.3) !important',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1) !important',
            transition:
              'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(255, 255, 255, 0.85) !important',
            backdropFilter: 'blur(20px) saturate(180%) !important',
            WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
            borderRight: '1px solid rgba(255, 255, 255, 0.3)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(255, 255, 255, 0.9) !important',
            backdropFilter: 'blur(20px) saturate(180%) !important',
            WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: false,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 500,
          },
          contained: {
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px 0 rgba(31, 38, 135, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            '&:hover': {
              borderWidth: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
              },
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(255, 255, 255, 0.9) !important',
            backdropFilter: 'blur(20px) saturate(180%) !important',
            WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
            backdropFilter: 'blur(10px) saturate(180%) !important',
            WebkitBackdropFilter: 'blur(10px) saturate(180%) !important',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
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
