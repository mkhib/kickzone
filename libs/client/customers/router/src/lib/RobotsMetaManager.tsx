import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeoMeta } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';

/**
 * Known private routes that should always have noindex.
 * These are paths that require authentication or contain user-specific data.
 */
const PRIVATE_ROUTES: ReadonlyArray<string> = [
  CUSTOMER_ROUTES.CART,
  CUSTOMER_ROUTES.LOGIN,
  CUSTOMER_ROUTES.SIGNUP,
  CUSTOMER_ROUTES.FORGOT_PASSWORD,
  // RESET_PASSWORD is a dynamic route with a token, handle via startsWith
  `${CUSTOMER_ROUTES.RESET_PASSWORD.split('/:')[0]}/`, // /reset-password/
  CUSTOMER_ROUTES.ORDERS,
  CUSTOMER_ROUTES.PROFILE,
  CUSTOMER_ROUTES.FAVORITES,
  CUSTOMER_ROUTES.UNAUTHORIZED,
  CUSTOMER_ROUTES.LANGUAGE_SETTINGS,
  CUSTOMER_ROUTES.ORDER_CONFIRMATION,
  CUSTOMER_ROUTES.PAYMENT_CALLBACK,
] as const;

/**
 * Known public routes that should have index, follow.
 * These are publicly accessible marketing/informational pages.
 */
const PUBLIC_ROUTES: ReadonlyArray<string> = [
  CUSTOMER_ROUTES.HOME,
  CUSTOMER_ROUTES.SHOP,
  CUSTOMER_ROUTES.CONTACT,
  CUSTOMER_ROUTES.GUIDE_AUTHENTICITY,
  CUSTOMER_ROUTES.GUIDE_PAYMENT,
  CUSTOMER_ROUTES.SHIPPING_RETURNS,
  CUSTOMER_ROUTES.PRIVACY_POLICY,
] as const;

/**
 * Dynamic public route patterns (e.g., /brands/:slug).
 * These are matched via prefix checking.
 */
const PUBLIC_ROUTE_PREFIXES: ReadonlyArray<string> = [
  CUSTOMER_ROUTES.BRAND.split('/:')[0], // /brands
] as const;

/**
 * Product details route pattern - we do NOT set robots here,
 * CustomerProductDetails handles its own noindex logic based on loading/error/product state.
 */
const PRODUCT_DETAILS_PREFIX = CUSTOMER_ROUTES.PRODUCT_DETAILS.split('/:')[0]; // /products

/**
 * Checks if the given pathname matches a known private route.
 */
function isPrivateRoute(pathname: string): boolean {
  // Exact matches
  if (PRIVATE_ROUTES.includes(pathname as typeof PRIVATE_ROUTES[number])) {
    return true;
  }
  // Prefix matches for dynamic routes (e.g., /reset-password/:token)
  if (pathname.startsWith('/reset-password/')) {
    return true;
  }
  return false;
}

/**
 * Checks if the given pathname matches a known public route.
 */
function isPublicRoute(pathname: string): boolean {
  // Exact matches
  if (PUBLIC_ROUTES.includes(pathname as typeof PUBLIC_ROUTES[number])) {
    return true;
  }
  // Prefix matches for dynamic routes (e.g., /brands/:slug)
  for (const prefix of PUBLIC_ROUTE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if the given pathname is the product details route (/products/:id).
 * We don't set robots here - CustomerProductDetails handles it.
 */
function isProductDetailsRoute(pathname: string): boolean {
  return pathname === PRODUCT_DETAILS_PREFIX || pathname.startsWith(`${PRODUCT_DETAILS_PREFIX}/`);
}

/**
 * Route-aware robots meta manager.
 *
 * Effect-order trap mitigation:
 * - React 18 runs child useEffects before parent effects
 * - This component runs at the router level (parent of all screens)
 * - On private/unknown routes: set noindex=true (noindex, nofollow)
 * - On public routes: set noindex=false (index, follow)
 * - On /products/:id: DO NOT write robots at all - leave to CustomerProductDetails
 *
 * Must be rendered inside <BrowserRouter> so useLocation() works.
 */
export function RobotsMetaManager() {
  const { pathname } = useLocation();

  // Determine robots directive for the current path
  const robotsDirective = useMemo(() => {
    // Private routes -> noindex, nofollow
    if (isPrivateRoute(pathname)) {
      return 'noindex, nofollow';
    }
    // Product details route -> do NOT set robots (leave to child)
    if (isProductDetailsRoute(pathname)) {
      return null;
    }
    // Public routes -> index, follow
    if (isPublicRoute(pathname)) {
      return 'index, follow';
    }
    // Unknown routes (404) -> noindex, nofollow
    return 'noindex, nofollow';
  }, [pathname]);

  useSeoMeta({
    noindex: robotsDirective === 'noindex, nofollow',
    skipRobots: robotsDirective === null,
  });

  return null;
}

export default RobotsMetaManager;
