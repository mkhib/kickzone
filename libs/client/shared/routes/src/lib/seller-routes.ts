export const SELLER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  MANAGE_PRODUCT: '/manage-product',
  LOGIN: '/login',
  SETUP_PASSWORD: '/setup-password/:token',
} as const;

export type SellerRouteKey = keyof typeof SELLER_ROUTES;
