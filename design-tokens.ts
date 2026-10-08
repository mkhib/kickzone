// Design Token System for Kickzone Customer Interface
// Provides centralized design tokens for consistent styling across all screens

// Color Palette - Inspired by premium/luxury aesthetic with warm neutrals and brass accents
export const colors = {
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',

  // Backgrounds
  bgPageLight: '#F8F7F5',
  bgPageDark: '#0E0E0D',
  bgCardLight: 'rgba(255, 255, 255, 0.65)',
  bgCardDark: 'rgba(28, 28, 25, 0.6)',

  // Primary Accents - Warm Brass/Copper tones
  brassLight: '#D4C7A5',
  brass: '#8F8362',
  brassDark: '#6B624A',

  // Secondary Accents
  goldLight: '#E6DFD1',
  gold: '#C5B89A',
  goldDark: '#7C6D48',

  // Text
  textPrimaryLight: '#181816',
  textPrimaryDark: '#F5F5F2',
  textSecondaryLight: '#6B6962',
  textSecondaryDark: '#9C9A92',
  textMutedLight: '#9C9A92',
  textMutedDark: '#6B6962',

  // Borders & Dividers
  borderLight: 'rgba(0, 0, 0, 0.06)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
  borderSubtleLight: 'rgba(0, 0, 0, 0.04)',
  borderSubtleDark: 'rgba(255, 255, 255, 0.05)',

  // Interactive States
  hoverOverlayLight: 'rgba(0, 0, 0, 0.04)',
  hoverOverlayDark: 'rgba(255, 255, 255, 0.04)',
  pressedOverlayLight: 'rgba(0, 0, 0, 0.08)',
  pressedOverlayDark: 'rgba(255, 255, 255, 0.08)',
};

// Typography Scale - Based on Manrope (primary) with Vazirmatn for RTL support
export const typography = {
  fontFamily: '"Manrope", "Segoe UI", system-ui, sans-serif',
  fontFamilyRtl: '"Vazirmatn", "Manrope", sans-serif',

  // Font Weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,

  // Font Sizes (px)
  fontSizexs: 10,
  fontSizesm: 12,
  fontSizemd: 14,
  fontSizelg: 16,
  fontSizexl: 18,
  fontSize2xl: 20,
  fontSize3xl: 24,
  fontSize4xl: 30,
  fontSize5xl: 36,

  // Line Heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.7,

  // Letter Spacing
  letterSpacingTight: '-0.02em',
  letterSpacingNormal: '0',
  letterSpacingWide: '0.02em',
  letterSpacingUppercase: '0.24em',
};

// Spacing System - 4px grid based
export const spacing = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 20,   // 20px
  '2xl': 24, // 24px
  '3xl': 32, // 32px
  '4xl': 40, // 40px
  '5xl': 48, // 48px
  '6xl': 56, // 56px
  '7xl': 64, // 64px
  '8xl': 72, // 72px
};

// Border Radius Scale
export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  '4xl': '28px',
  pill: '9999px',
  circle: '50%',
};

// Shadow Elevations
export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -3px rgba(0, 0, 0, 0.05)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  innerSm: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  innerMd: 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Glassmorphism Variants
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.65)',
    backgroundImage: 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.80) 50%, rgba(245, 242, 236, 0.88) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(28px) saturate(190%)',
    WebkitBackdropFilter: 'blur(28px) saturate(190%)',
    boxShadow: '0 24px 60px -12px rgba(180, 165, 140, 0.25), 0 0 0 1px rgba(143, 132, 104, 0.1), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(143, 132, 104, 0.08)',
  },
  dark: {
    background: 'rgba(24, 24, 22, 0.82)',
    backgroundImage: 'linear-gradient(145deg, rgba(28, 28, 24, 0.85) 0%, rgba(20, 20, 18, 0.75) 50%, rgba(15, 15, 14, 0.85) 100%)',
    border: '1px solid rgba(240, 239, 235, 0.12)',
    backdropFilter: 'blur(28px) saturate(190%)',
    WebkitBackdropFilter: 'blur(28px) saturate(190%)',
    boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 2px 0 rgba(255, 255, 255, 0.14), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)',
  },
};

// Animation Durations & Easing
export const animation = {
  duration: {
    fastest: 50,
    faster: 100,
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 400,
    slowest: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
    easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 0)',
    easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Z-index Levels
export const zIndex = {
  tooltip: 1000,
  floatingNav: 1100,
  modal: 1200,
  popup: 1300,
  drawer: 1400,
};

// Helper functions for theme-aware values
export const getBgColor = (isDark: boolean) => isDark ? colors.bgPageDark : colors.bgPageLight;
export const getBgCard = (isDark: boolean) => isDark ? colors.bgCardDark : colors.bgCardLight;
export const getTextPrimary = (isDark: boolean) => isDark ? colors.textPrimaryDark : colors.textPrimaryLight;
export const getTextSecondary = (isDark: boolean) => isDark ? colors.textSecondaryDark : colors.textSecondaryLight;
export const getTextMuted = (isDark: boolean) => isDark ? colors.textMutedDark : colors.textMutedLight;
export const getBorder = (isDark: boolean) => isDark ? colors.borderDark : colors.borderLight;
export const getBorderSubtle = (isDark: boolean) => isDark ? colors.borderSubtleDark : colors.borderSubtleLight;
export const getHoverOverlay = (isDark: boolean) => isDark ? colors.hoverOverlayDark : colors.hoverOverlayLight;
export const getPressedOverlay = (isDark: boolean) => isDark ? colors.pressedOverlayDark : colors.pressedOverlayLight;
export const getGlassmorphism = (isDark: boolean) => isDark ? glassmorphism.dark : glassmorphism.light;