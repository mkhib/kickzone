export const CUSTOMER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/home',
  PRODUCT_DETAILS: '/products/:id',
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
  PAYMENT_CALLBACK: '/payment-callback',
} as const;

export type CustomerRouteKey = keyof typeof CUSTOMER_ROUTES;

export const getCustomerProductDetailsRoute = (id: string | number) =>
  `/products/${id}`;
