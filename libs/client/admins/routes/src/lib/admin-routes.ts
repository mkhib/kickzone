export const ADMIN_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCTS_NEW: '/products/new',
  PRODUCTS_EDIT: '/products/edit/:id',
  SELLERS: '/sellers',
  ORDERS: '/orders',
  CURRENCY: '/currency',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  CONTACT: '/contact',
  TRANSLATIONS: '/translations',
  LANGUAGE_SETTINGS: '/language-settings',
} as const;

export type AdminRouteKey = keyof typeof ADMIN_ROUTES;
