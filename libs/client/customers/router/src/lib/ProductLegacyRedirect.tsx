import { useParams, useLocation, Navigate } from 'react-router-dom';
import { getCustomerProductDetailsRoute } from '@kickzone-workspace/customers-routes';

/**
 * Legacy redirect component for `/product/:id` → `/products/:id`
 * Preserves query string and hash from the original URL.
 * Uses `replace` to avoid polluting browser history.
 */
export function ProductLegacyRedirect() {
  const { id } = useParams<{ id: string }>();
  const { search, hash } = useLocation();

  if (!id) {
    // Should not happen, but fallback to home if no id
    return <Navigate to="/" replace />;
  }

  const targetPath = `${getCustomerProductDetailsRoute(id)}${search}${hash}`;
  return <Navigate to={targetPath} replace />;
}

export default ProductLegacyRedirect;