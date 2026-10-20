export const CUSTOMER_ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  BRAND: '/brands/:brandSlug',
  PRODUCTS: '/home',
  PRODUCT_DETAILS: '/products/:id',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  CART: '/cart',
  ORDERS: '/orders',
  PROFILE: '/profile',
  CONTACT: '/contact',
  LANGUAGE_SETTINGS: '/language-settings',
  UNAUTHORIZED: '/unauthorized',
  ORDER_CONFIRMATION: '/order-confirmation',
  PAYMENT_CALLBACK: '/payment-callback',
  FAVORITES: '/favorites',
  GUIDE_AUTHENTICITY: '/guide/authenticity',
  GUIDE_PAYMENT: '/guide/payment',
} as const;

export type CustomerRouteKey = keyof typeof CUSTOMER_ROUTES;

export const getCustomerProductDetailsRoute = (id: string | number) =>
  `/products/${id}`;

export const getCustomerBrandRoute = (brandSlug: string) =>
  `/brands/${encodeURIComponent(brandSlug.toLowerCase())}`;

export const getCustomerShopRoute = (opts?: {
  category?: string;
  search?: string;
  sort?: string;
  brand?: string;
}) => {
  if (opts?.brand) {
    const params = new URLSearchParams();
    if (opts.category) params.set('category', opts.category);
    if (opts.search) params.set('search', opts.search);
    if (opts.sort && opts.sort !== 'newest') params.set('sort', opts.sort);
    const qs = params.toString();
    return `${getCustomerBrandRoute(opts.brand)}${qs ? `?${qs}` : ''}`;
  }
  const params = new URLSearchParams();
  if (opts?.category) params.set('category', opts.category);
  if (opts?.search) params.set('search', opts.search);
  if (opts?.sort && opts.sort !== 'newest') params.set('sort', opts.sort);
  const qs = params.toString();
  return `${CUSTOMER_ROUTES.SHOP}${qs ? `?${qs}` : ''}`;
};
