export const CUSTOMER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/home',
  LOGIN: '/login',
  CART: '/cart',
  CONTACT: '/contact',
  LANGUAGE_SETTINGS: '/language-settings',
  UNAUTHORIZED: '/unauthorized',
} as const;

export type CustomerRouteKey = keyof typeof CUSTOMER_ROUTES;
