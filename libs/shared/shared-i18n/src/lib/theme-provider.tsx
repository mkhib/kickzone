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
    background: '#f6f5f2',
    paper: '#fbfaf8',
    text: '#1d1d1f',
    textSecondary: '#424245',
    primary: '#8a6a3d',
    primaryLight: '#b08a52',
    primaryDark: '#5e4420',
    secondary: '#1d1d1f',
    divider: 'rgba(0, 0, 0, 0.09)',
    ctaBg: '#1d1d1f',
    ctaFg: '#f6f5f2',
    ctaHover: '#2e2e2c',
    ctaDisabledBg: 'rgba(29, 29, 31, 0.38)',
    ctaDisabledFg: 'rgba(251, 250, 248, 0.72)',
  },
  dark: {
    background: '#000000',
    paper: '#0b0b0c',
    text: '#f5f5f7',
    textSecondary: '#d2d2d7',
    primary: '#c9a774',
    primaryLight: '#d8bc8c',
    primaryDark: '#8a6a3d',
    secondary: '#f5f5f7',
    divider: 'rgba(255, 255, 255, 0.12)',
    ctaBg: '#c9a774',
    ctaFg: '#000000',
    ctaHover: '#d8bc8c',
    ctaDisabledBg: 'rgba(201, 167, 116, 0.42)',
    ctaDisabledFg: 'rgba(0, 0, 0, 0.72)',
  },
  /** Soft brass accent for inline highlights (home, badges) */
  accent: '#8a6a3d',
  accentSoft: '#c9a774',
} as const;

const FONT_LINK_ID = 'saintbala-fonts';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=El+Messiri:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap';

const latinStack = '"Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif';
const farsiStack =
  '"Vazirmatn", "Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif';
/** Display face for Farsi slogan accents (e.g. باش) */
export const farsiDisplayStack =
  '"El Messiri", "Vazirmatn", "Manrope", sans-serif';

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
    document.documentElement.setAttribute('lang', currentLocale);
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.setAttribute(
      'data-locale',
      currentLocale === 'fa' ? 'fa' : 'en'
    );
    // One sans stack per locale: Vazirmatn (FA) / Manrope (EN). Serif only for SAINTBALA.
    document.documentElement.style.setProperty('--font-sans', fontFamily);

    // Load Cormorant + Manrope (EN) + Vazirmatn (FA) + El Messiri (FA display) together.
    let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = FONT_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.href !== FONT_HREF) {
      link.href = FONT_HREF;
    }
  }, [direction, mode, currentLocale, fontFamily]);

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
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.45) !important'
                  : 'rgba(26, 26, 25, 0.2) !important',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            invisible: {
              backgroundColor: 'transparent !important',
              backdropFilter: 'none !important',
              WebkitBackdropFilter: 'none !important',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              // Liquid glass — promote to own compositor layer
              isolation: 'isolate',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              contain: 'paint',
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(14, 14, 16, 0.52) !important'
                  : 'rgba(255, 255, 255, 0.42) !important',
              backgroundImage:
                mode === 'dark'
                  ? [
                      'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, transparent 28%)',
                      'linear-gradient(155deg, rgba(201, 167, 116, 0.08) 0%, transparent 42%, rgba(0, 0, 0, 0.22) 100%)',
                    ].join(', ') + ' !important'
                  : [
                      'linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, transparent 32%)',
                      'linear-gradient(155deg, rgba(255, 255, 255, 0.55) 0%, rgba(246, 245, 242, 0.18) 45%, rgba(255, 255, 255, 0.35) 100%)',
                    ].join(', ') + ' !important',
              // Slightly softer blur = smoother item hover over glass
              backdropFilter: 'blur(24px) saturate(180%) !important',
              WebkitBackdropFilter: 'blur(24px) saturate(180%) !important',
              color: `${brand.text} !important`,
              borderRight:
                mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.12) !important'
                  : '1px solid rgba(255, 255, 255, 0.72) !important',
              borderLeft: 'none !important',
              boxShadow:
                mode === 'dark'
                  ? [
                      '0 28px 64px rgba(0, 0, 0, 0.55)',
                      'inset 0 1px 0 0 rgba(255, 255, 255, 0.14)',
                      'inset 0 -1px 0 0 rgba(0, 0, 0, 0.25)',
                      'inset -1px 0 0 0 rgba(255, 255, 255, 0.06)',
                    ].join(', ') + ' !important'
                  : [
                      '0 24px 56px rgba(29, 29, 31, 0.08)',
                      'inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      'inset 0 -1px 0 0 rgba(143, 132, 104, 0.06)',
                      'inset -1px 0 0 0 rgba(255, 255, 255, 0.55)',
                    ].join(', ') + ' !important',
              transition:
                'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
              '& .MuiDivider-root': {
                borderColor:
                  mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
              },
              // Hover lag fix: never animate backdrop-filter on items
              '& .MuiListItemButton-root': {
                borderRadius: '12px',
                margin: '3px 8px',
                transition:
                  'background-color 0.15s ease, transform 0.15s ease',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                '&:hover': {
                  backgroundColor:
                    mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(29, 29, 31, 0.05)',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                },
                '&.Mui-selected': {
                  backgroundColor:
                    mode === 'dark'
                      ? 'rgba(201, 167, 116, 0.18)'
                      : 'rgba(138, 106, 61, 0.12)',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                  '&:hover': {
                    backgroundColor:
                      mode === 'dark'
                        ? 'rgba(201, 167, 116, 0.24)'
                        : 'rgba(138, 106, 61, 0.16)',
                  },
                },
              },
              '& .MuiListItemIcon-root': {
                minWidth: 48,
                color: 'inherit',
              },
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
