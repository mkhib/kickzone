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

export const getSellerProductRoute = (opts?: {
  tab?: 'manage' | 'define' | 'variants';
  search?: string;
}) => {
  const params = new URLSearchParams();
  if (opts?.search) params.set('search', opts.search);
  if (opts?.tab) params.set('tab', opts.tab);
  const qs = params.toString();
  return `${SELLER_ROUTES.PRODUCTS}${qs ? `?${qs}` : ''}`;
};
