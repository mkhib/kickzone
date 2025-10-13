import { SellersProducts } from '@kickzone-workspace/sellers-products-screen';
import { SellersManageProductScreen } from '@kickzone-workspace/sellers-manage-product-screen';
import { SellerOrdersScreen } from '@kickzone-workspace/seller-orders-screen';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SellersLogin } from '@kickzone-workspace/sellers-login-screen';
import { SellersSetupPassword } from '@kickzone-workspace/sellers-setup-password';
import { SellersUnauthorizedScreen } from '@kickzone-workspace/sellers-unauthorized-screen';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { LanguageComponents } from '@kickzone-workspace/language-components';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';

export function SellersRouter() {
  const { user } = useSellersAuthContext();

  const SellerRoute = createPrivateRoute(['SELLER'], user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SellerRoute />}>
          <Route path={SELLER_ROUTES.HOME} element={<SellersProducts />} />
          <Route path={SELLER_ROUTES.PRODUCTS} element={<SellersProducts />} />
          <Route
            path={SELLER_ROUTES.MANAGE_PRODUCT}
            element={<SellersManageProductScreen />}
          />
          <Route path={SELLER_ROUTES.ORDERS} element={<SellerOrdersScreen />} />
        </Route>
        <Route path={SELLER_ROUTES.LOGIN} element={<SellersLogin />} />
        <Route
          path={SELLER_ROUTES.SETUP_PASSWORD}
          element={<SellersSetupPassword />}
        />
        <Route
          path="/language-settings"
          element={<LanguageComponents LayoutComponent={SellersLayout} />}
        />
        <Route path="/unauthorized" element={<SellersUnauthorizedScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SellersRouter;
