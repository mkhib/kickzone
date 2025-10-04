export const SELLER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  MANAGE_PRODUCT: '/manage-product',
  ORDERS: '/orders',
  LOGIN: '/login',
  SETUP_PASSWORD: '/setup-password/:token',
  CONTACT: '/contact',
} as const;

export type SellerRouteKey = keyof typeof SELLER_ROUTES;
