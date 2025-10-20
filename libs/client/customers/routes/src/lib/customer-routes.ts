export const CUSTOMER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  CART: '/cart',
  ORDERS: '/orders',
  CONTACT: '/contact',
  LANGUAGE_SETTINGS: '/language-settings',
  UNAUTHORIZED: '/unauthorized',
  ORDER_CONFIRMATION: '/order-confirmation',
} as const;

export type CustomerRouteKey = keyof typeof CUSTOMER_ROUTES;
