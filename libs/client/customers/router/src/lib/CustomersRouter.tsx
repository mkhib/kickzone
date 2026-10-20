import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  CustomersHome,
  CustomersShopScreen,
} from '@kickzone-workspace/customers-home-screen';
import { CustomerProductDetails } from '@kickzone-workspace/customer-product-details';
import { CustomersLogin } from '@kickzone-workspace/customers-login-screen';
import { CustomersUnauthorizedScreen } from '@kickzone-workspace/customers-unauthorized-screen';
import { CustomerShoppingCart } from '@kickzone-workspace/customer-shopping-cart';
import { CustomerSignup } from '@kickzone-workspace/customer-signup';
import { CustomerForgotPassword } from '@kickzone-workspace/customer-forgot-password';
import { CustomerResetPassword } from '@kickzone-workspace/customer-reset-password';
import { CustomerOrders } from '@kickzone-workspace/customer-orders';
import { CustomerProfile } from '@kickzone-workspace/customer-profile';
import { CustomerOrderConfirmation } from '@kickzone-workspace/customer-order-confirmation';
import { CustomerPaymentCallback } from '@kickzone-workspace/customer-payment';
import { LanguageComponents } from '@kickzone-workspace/language-components';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { CustomerFavorites } from '@kickzone-workspace/customer-favorites';
import { CustomerGuideAuthenticity } from '@kickzone-workspace/customer-guide-authenticity';
import { CustomerGuidePayment } from '@kickzone-workspace/customer-guide-payment';
import { CustomerNotFound } from '@kickzone-workspace/customer-not-found';
import { ErrorBoundary } from '@kickzone-workspace/error-boundary';
import { ScrollToTop } from './ScrollToTop';

export function CustomersRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={CUSTOMER_ROUTES.HOME} element={<CustomersHome />} />
          <Route
            path={CUSTOMER_ROUTES.PRODUCTS}
            element={<Navigate to={CUSTOMER_ROUTES.HOME} replace />}
          />
          <Route path={CUSTOMER_ROUTES.SHOP} element={<CustomersShopScreen />} />
          <Route path={CUSTOMER_ROUTES.BRAND} element={<CustomersShopScreen />} />
          <Route
            path={CUSTOMER_ROUTES.PRODUCT_DETAILS}
            element={<CustomerProductDetails />}
          />
          <Route path="/product/:id" element={<CustomerProductDetails />} />
          <Route path={CUSTOMER_ROUTES.LOGIN} element={<CustomersLogin />} />
          <Route path={CUSTOMER_ROUTES.SIGNUP} element={<CustomerSignup />} />
          <Route
            path={CUSTOMER_ROUTES.FORGOT_PASSWORD}
            element={<CustomerForgotPassword />}
          />
          <Route
            path={CUSTOMER_ROUTES.RESET_PASSWORD}
            element={<CustomerResetPassword />}
          />
          <Route path={CUSTOMER_ROUTES.CART} element={<CustomerShoppingCart />} />
          <Route path={CUSTOMER_ROUTES.ORDERS} element={<CustomerOrders />} />
          <Route path={CUSTOMER_ROUTES.PROFILE} element={<CustomerProfile />} />
          <Route
            path={CUSTOMER_ROUTES.ORDER_CONFIRMATION}
            element={<CustomerOrderConfirmation />}
          />
          <Route
            path={CUSTOMER_ROUTES.PAYMENT_CALLBACK}
            element={<CustomerPaymentCallback />}
          />
          <Route
            path={CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
            element={<LanguageComponents LayoutComponent={CustomersLayout} />}
          />
          <Route
            path={CUSTOMER_ROUTES.UNAUTHORIZED}
            element={<CustomersUnauthorizedScreen />}
          />

          {/* New Verified Guide & Favorites Routes */}
          <Route
            path={CUSTOMER_ROUTES.FAVORITES}
            element={<CustomerFavorites />}
          />
          <Route
            path={CUSTOMER_ROUTES.GUIDE_AUTHENTICITY}
            element={<CustomerGuideAuthenticity />}
          />
          <Route
            path={CUSTOMER_ROUTES.GUIDE_PAYMENT}
            element={<CustomerGuidePayment />}
          />

          {/* Wildcard 404 Route */}
          <Route path="*" element={<CustomerNotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default CustomersRouter;
