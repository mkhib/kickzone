import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { AdminProducts } from '@kickzone-workspace/admin-products';
import { ADMIN_ROUTES } from '@kickzone-workspace/admins-routes';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { AdminsLogin } from '@kickzone-workspace/admins-login';
import { AdminsUnauthorizedScreen } from '@kickzone-workspace/admins-unauthorized-screen';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SellerManagement } from '@kickzone-workspace/admin-seller-management';
import { AdminCustomerManagement } from '@kickzone-workspace/admin-customer-management';
import { LanguageComponents } from '@kickzone-workspace/language-components';
import { AdminTranslationManagement } from '@kickzone-workspace/translation-management';
import { AdminSellerOrders } from '@kickzone-workspace/admin-seller-orders';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { CurrencyManagement } from '@kickzone-workspace/currency-management';

export function AdminsRouter() {
  const { admin } = useAdminsAuthContext();

  const AdminRoute = createPrivateRoute(['ADMIN'], admin);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path={ADMIN_ROUTES.HOME} element={<AdminProductEditor />} />
          <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProducts />} />
          <Route
            path={ADMIN_ROUTES.PRODUCTS_NEW}
            element={<AdminProductEditor />}
          />
          <Route
            path={ADMIN_ROUTES.PRODUCTS_EDIT}
            element={<AdminProductEditor />}
          />
          <Route path={ADMIN_ROUTES.SELLERS} element={<SellerManagement />} />
          <Route
            path={ADMIN_ROUTES.CUSTOMERS}
            element={<AdminCustomerManagement />}
          />
          <Route path={ADMIN_ROUTES.ORDERS} element={<AdminSellerOrders />} />
          <Route
            path={ADMIN_ROUTES.CURRENCY}
            element={<CurrencyManagement />}
          />
          <Route
            path={ADMIN_ROUTES.TRANSLATIONS}
            element={<AdminTranslationManagement />}
          />
        </Route>
        <Route path={ADMIN_ROUTES.LOGIN} element={<AdminsLogin />} />
        <Route
          path={ADMIN_ROUTES.LANGUAGE_SETTINGS}
          element={<LanguageComponents LayoutComponent={AdminsLayout} />}
        />
        <Route
          path={ADMIN_ROUTES.UNAUTHORIZED}
          element={<AdminsUnauthorizedScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminsRouter;
