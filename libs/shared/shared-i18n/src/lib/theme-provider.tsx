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

/**
 * Quiet-luxury tokens for SAINTBALA.
 * Warm stone neutrals + muted brass — premium without shouting.
 * Accent is for highlights only; CTAs use high-contrast charcoal / champagne.
 */
export const saintbalaBrand = {
  light: {
    background: '#f2f1ef',
    paper: '#faf9f7',
    text: '#1a1a19',
    textSecondary: '#5c5b57',
    primary: '#8f8468',
    primaryLight: '#b5ab93',
    primaryDark: '#6e6550',
    secondary: '#1a1a19',
    divider: 'rgba(26, 26, 25, 0.08)',
    ctaBg: '#1a1a19',
    ctaFg: '#faf9f7',
    ctaHover: '#2e2e2c',
    ctaDisabledBg: 'rgba(26, 26, 25, 0.38)',
    ctaDisabledFg: 'rgba(250, 249, 247, 0.72)',
  },
  dark: {
    background: '#0f0f0e',
    paper: '#181816',
    text: '#f0efeb',
    textSecondary: '#a8a69f',
    primary: '#c5b89a',
    primaryLight: '#ddd4bf',
    primaryDark: '#9a8d70',
    secondary: '#f0efeb',
    divider: 'rgba(240, 239, 235, 0.08)',
    ctaBg: '#c5b89a',
    ctaFg: '#121210',
    ctaHover: '#d4c9b0',
    ctaDisabledBg: 'rgba(197, 184, 154, 0.42)',
    ctaDisabledFg: 'rgba(18, 18, 16, 0.72)',
  },
  /** Soft brass accent for inline highlights (home, badges) */
  accent: '#a89870',
  accentSoft: '#c5b89a',
} as const;

const FONT_LINK_ID = 'saintbala-fonts';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap';

const latinStack = '"Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif';
const farsiStack =
  '"Vazirmatn", "Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif';

export function RTLThemeProvider({ children }: RTLThemeProviderProps) {
  const { currentLocale } = useLanguageContext();
  const themeState = useUIStore((s) => s.theme);
  const mode = themeState.mode;

  const isRTL = currentLocale === 'fa';
  const direction = isRTL ? 'rtl' : 'ltr';
  const fontFamily = isRTL ? farsiStack : latinStack;

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

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.setAttribute('dir', direction);

    // Load Manrope (EN) + Vazirmatn (FA) together so mixed Latin brand text matches.
    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement('link');
      link.id = FONT_LINK_ID;
      link.href = FONT_HREF;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [direction]);

  const theme = useMemo(() => {
    const brand = mode === 'dark' ? saintbalaBrand.dark : saintbalaBrand.light;

    const palette =
      mode === 'dark'
        ? {
            mode: 'dark' as const,
            primary: {
              main: brand.primary,
              light: brand.primaryLight,
              dark: brand.primaryDark,
              contrastText: brand.ctaFg,
            },
            secondary: {
              main: brand.secondary,
              light: '#ffffff',
              dark: '#cfcfcf',
              contrastText: brand.background,
            },
            background: {
              default: brand.background,
              paper: brand.paper,
            },
            text: {
              primary: brand.text,
              secondary: brand.textSecondary,
            },
            divider: brand.divider,
            action: {
              disabled: 'rgba(240, 239, 235, 0.38)',
              disabledBackground: 'rgba(240, 239, 235, 0.08)',
            },
          }
        : {
            mode: 'light' as const,
            primary: {
              main: brand.primary,
              light: brand.primaryLight,
              dark: brand.primaryDark,
              contrastText: '#faf9f7',
            },
            secondary: {
              main: brand.secondary,
              light: '#3a3a38',
              dark: '#000000',
              contrastText: '#faf9f7',
            },
            background: {
              default: brand.background,
              paper: brand.paper,
            },
            text: {
              primary: brand.text,
              secondary: brand.textSecondary,
            },
            divider: brand.divider,
            action: {
              disabled: 'rgba(26, 26, 25, 0.38)',
              disabledBackground: 'rgba(26, 26, 25, 0.08)',
            },
          };

    return createTheme({
      direction,
      typography: {
        fontFamily,
        // Optical balance: Manrope at 400–600 matches Vazirmatn better than Roboto 700.
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
          fontWeight: 600,
          letterSpacing: isRTL ? 0 : '-0.02em',
        },
        h2: {
          fontWeight: 600,
          letterSpacing: isRTL ? 0 : '-0.02em',
        },
        h3: {
          fontWeight: 600,
          letterSpacing: isRTL ? 0 : '-0.015em',
        },
        h4: {
          fontWeight: 600,
          letterSpacing: isRTL ? 0 : '-0.01em',
        },
        h5: {
          fontWeight: 500,
          letterSpacing: isRTL ? 0 : '-0.01em',
        },
        h6: {
          fontWeight: 500,
          letterSpacing: isRTL ? 0 : '-0.005em',
        },
        subtitle1: {
          fontWeight: 500,
        },
        subtitle2: {
          fontWeight: 500,
        },
        body1: {
          fontWeight: 400,
          letterSpacing: isRTL ? 0 : '0.01em',
          lineHeight: 1.65,
        },
        body2: {
          fontWeight: 400,
          letterSpacing: isRTL ? 0 : '0.01em',
          lineHeight: 1.6,
        },
        button: {
          fontWeight: 600,
          letterSpacing: isRTL ? 0 : '0.02em',
        },
        caption: {
          fontWeight: 400,
          letterSpacing: isRTL ? 0 : '0.02em',
        },
      },
      palette,
      shape: {
        borderRadius: 10,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily,
              backgroundColor: palette.background.default,
              color: palette.text.primary,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(15, 15, 14, 0.78) !important'
                  : 'rgba(250, 249, 247, 0.78) !important',
              color: brand.text,
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              borderBottom: `1px solid ${brand.divider} !important`,
              borderLeft: 'none !important',
              boxShadow: 'none !important',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0 !important',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(24, 24, 22, 0.88) !important'
                  : 'rgba(250, 249, 247, 0.88) !important',
              backdropFilter: 'blur(12px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(12px) saturate(160%) !important',
              borderRadius: '12px !important',
              border: `1px solid ${brand.divider} !important`,
              boxShadow:
                mode === 'dark'
                  ? '0 8px 28px 0 rgba(0, 0, 0, 0.4) !important'
                  : '0 8px 28px 0 rgba(26, 26, 25, 0.06) !important',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            elevation1: {
              boxShadow: '0 4px 16px 0 rgba(26, 26, 25, 0.06)',
            },
            elevation2: {
              boxShadow: '0 8px 24px 0 rgba(26, 26, 25, 0.08)',
            },
            elevation3: {
              boxShadow: '0 12px 32px 0 rgba(26, 26, 25, 0.1)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(24, 24, 22, 0.88) !important'
                  : 'rgba(250, 249, 247, 0.9) !important',
              backdropFilter: 'blur(12px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(12px) saturate(160%) !important',
              borderRadius: '12px !important',
              border: `1px solid ${brand.divider} !important`,
              boxShadow:
                mode === 'dark'
                  ? '0 12px 32px 0 rgba(0, 0, 0, 0.4) !important'
                  : '0 8px 28px 0 rgba(26, 26, 25, 0.06) !important',
              transition:
                'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow:
                  mode === 'dark'
                    ? '0 16px 40px 0 rgba(0, 0, 0, 0.5)'
                    : '0 12px 36px 0 rgba(26, 26, 25, 0.1)',
              },
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(15, 15, 14, 0.94) !important'
                  : 'rgba(250, 249, 247, 0.94) !important',
              backdropFilter: 'blur(20px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(160%) !important',
              borderRight: `1px solid ${brand.divider}`,
              borderLeft: 'none',
              boxShadow:
                mode === 'dark'
                  ? '0 10px 32px 0 rgba(0, 0, 0, 0.5)'
                  : '0 8px 28px 0 rgba(26, 26, 25, 0.08)',
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(24, 24, 22, 0.96) !important'
                  : 'rgba(250, 249, 247, 0.96) !important',
              backdropFilter: 'blur(20px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(160%) !important',
              borderRadius: '16px',
              border: `1px solid ${brand.divider}`,
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            paper: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(24, 24, 22, 0.96) !important'
                  : 'rgba(250, 249, 247, 0.96) !important',
              backdropFilter: 'blur(20px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(20px) saturate(160%) !important',
              borderRadius: '10px',
              border: `1px solid ${brand.divider}`,
              boxShadow:
                mode === 'dark'
                  ? '0 10px 28px 0 rgba(0, 0, 0, 0.5)'
                  : '0 8px 28px 0 rgba(26, 26, 25, 0.1)',
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(24, 24, 22, 0.88) !important'
                  : 'rgba(250, 249, 247, 0.88) !important',
              backdropFilter: 'blur(10px) saturate(160%) !important',
              WebkitBackdropFilter: 'blur(10px) saturate(160%) !important',
              borderRadius: '12px',
              border: `1px solid ${brand.divider}`,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 8,
              fontWeight: 600,
              letterSpacing: isRTL ? 0 : '0.02em',
            },
            containedPrimary: {
              backgroundColor: brand.ctaBg,
              backgroundImage: 'none',
              color: brand.ctaFg,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: brand.ctaHover,
                backgroundImage: 'none',
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: brand.ctaDisabledBg,
                backgroundImage: 'none',
                color: brand.ctaDisabledFg,
                opacity: 1,
              },
              '&.MuiButton-loading': {
                color: brand.ctaFg,
              },
            },
            outlinedPrimary: {
              borderColor:
                mode === 'dark'
                  ? 'rgba(197, 184, 154, 0.45)'
                  : 'rgba(143, 132, 104, 0.45)',
              color: brand.primary,
              '&:hover': {
                borderColor: brand.primary,
                backgroundColor:
                  mode === 'dark'
                    ? 'rgba(197, 184, 154, 0.08)'
                    : 'rgba(143, 132, 104, 0.06)',
              },
            },
          },
        },
        MuiToggleButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
              borderColor: brand.divider,
              color: brand.textSecondary,
              '&.Mui-selected': {
                backgroundColor:
                  mode === 'dark'
                    ? 'rgba(197, 184, 154, 0.18)'
                    : 'rgba(26, 26, 25, 0.08)',
                color: brand.text,
                borderColor:
                  mode === 'dark'
                    ? 'rgba(197, 184, 154, 0.4)'
                    : 'rgba(26, 26, 25, 0.2)',
                '&:hover': {
                  backgroundColor:
                    mode === 'dark'
                      ? 'rgba(197, 184, 154, 0.24)'
                      : 'rgba(26, 26, 25, 0.12)',
                },
              },
            },
          },
        },
      },
    });
  }, [direction, isRTL, mode, fontFamily]);

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
