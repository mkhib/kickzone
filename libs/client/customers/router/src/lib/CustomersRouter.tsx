import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomersHome } from '@kickzone-workspace/customers-home-screen';
import { CustomersLogin } from '@kickzone-workspace/customers-login-screen';
import { CustomersUnauthorizedScreen } from '@kickzone-workspace/customers-unauthorized-screen';
import { CustomerShoppingCart } from '@kickzone-workspace/customer-shopping-cart';
import { LanguageComponents } from '@kickzone-workspace/language-components';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CUSTOMER_ROUTES.HOME} element={<CustomersHome />} />
        <Route path={CUSTOMER_ROUTES.PRODUCTS} element={<CustomersHome />} />
        <Route path={CUSTOMER_ROUTES.LOGIN} element={<CustomersLogin />} />
        <Route path={CUSTOMER_ROUTES.CART} element={<CustomerShoppingCart />} />
        <Route
          path={CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
          element={<LanguageComponents LayoutComponent={CustomersLayout} />}
        />
        <Route
          path={CUSTOMER_ROUTES.UNAUTHORIZED}
          element={<CustomersUnauthorizedScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
