import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { AdminProducts } from '@kickzone-workspace/admin-products';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Outlet, useParams } from 'react-router-dom';

export function SellersCatalogRoute() {
  const { canManageCatalog, sellerInfoLoading } = useSellersAuthContext();

  if (sellerInfoLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!canManageCatalog) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export function SellersCatalogProducts() {
  const { LL } = useI18nContext();

  return (
    <AdminProducts
      LayoutComponent={SellersLayout}
      productsNewPath={`${SELLER_ROUTES.MANAGE_PRODUCT}?define=1`}
      productsEditPath={(id) =>
        SELLER_ROUTES.CATALOG_EDIT.replace(':id', String(id))
      }
      showSellerListings={false}
      title={LL.navigation.catalogManagement()}
    />
  );
}

export function SellersCatalogEditor() {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return (
      <Navigate to={`${SELLER_ROUTES.MANAGE_PRODUCT}?define=1`} replace />
    );
  }

  return <AdminProductEditor LayoutComponent={SellersLayout} />;
}
