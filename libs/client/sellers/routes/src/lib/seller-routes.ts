export const SELLER_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  MANAGE_PRODUCT: '/manage-product',
  CATALOG: '/catalog',
  CATALOG_NEW: '/catalog/new',
  CATALOG_EDIT: '/catalog/edit/:id',
  ORDERS: '/orders',
  LOGIN: '/login',
  SETUP_PASSWORD: '/setup-password/:token',
  CONTACT: '/contact',
  LANGUAGE_SETTINGS: '/language-settings',
} as const;

export type SellerRouteKey = keyof typeof SELLER_ROUTES;
