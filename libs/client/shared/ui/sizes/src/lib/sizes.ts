/**
 * Shared UI sizes and dimensions
 * Centralized constants for consistent sizing across the application
 */

// Header and navigation heights
export const HEADER_HEIGHT = 64;

// Drawer dimensions
export const DRAWER_WIDTH = 300;

// Common spacing values
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Component heights
export const HEIGHTS = {
  header: HEADER_HEIGHT,
  drawer: `calc(100vh - ${HEADER_HEIGHT}px)`,
  content: `calc(100vh - ${HEADER_HEIGHT}px)`,
} as const;

// Component widths
export const WIDTHS = {
  drawer: DRAWER_WIDTH,
  sidebar: 240,
  contentMax: 1200,
} as const;

// Border radius values
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
} as const;

// Z-index values
export const Z_INDEX = {
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;
