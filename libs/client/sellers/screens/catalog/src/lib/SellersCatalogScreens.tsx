import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { AdminProducts } from '@kickzone-workspace/admin-products';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { Navigate, Outlet } from 'react-router-dom';

export function SellersCatalogRoute() {
  const { canManageCatalog } = useSellersAuthContext();

  if (!canManageCatalog) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export function SellersCatalogProducts() {
  return (
    <AdminProducts
      LayoutComponent={SellersLayout}
      productsNewPath={SELLER_ROUTES.CATALOG_NEW}
      productsEditPath={(id) => SELLER_ROUTES.CATALOG_EDIT.replace(':id', String(id))}
    />
  );
}

export function SellersCatalogEditor() {
  return <AdminProductEditor LayoutComponent={SellersLayout} />;
}
