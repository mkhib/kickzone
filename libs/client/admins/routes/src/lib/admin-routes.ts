export const ADMIN_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCTS_NEW: '/products/new',
  PRODUCTS_EDIT: '/products/edit/:id',
  SELLERS: '/sellers',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  CONTACT: '/contact',
} as const;

export type AdminRouteKey = keyof typeof ADMIN_ROUTES;
