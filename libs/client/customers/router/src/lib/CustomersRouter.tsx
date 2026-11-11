import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import {
  CustomersHome,
  CustomersShopScreen,
} from '@kickzone-workspace/customers-home-screen';
import { CustomerProductDetails } from '@kickzone-workspace/customer-product-details';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { ErrorBoundary } from '@kickzone-workspace/error-boundary';
import { ScrollToTop } from './ScrollToTop';
import { ProductLegacyRedirect } from './ProductLegacyRedirect';
import { RobotsMetaManager } from './RobotsMetaManager';

// Lazy-loaded secondary screens
const CustomersLogin = lazy(() =>
  import('@kickzone-workspace/customers-login-screen').then((m) => ({ default: m.CustomersLogin }))
);
const CustomersUnauthorizedScreen = lazy(() =>
  import('@kickzone-workspace/customers-unauthorized-screen').then((m) => ({ default: m.CustomersUnauthorizedScreen }))
);
const CustomerShoppingCart = lazy(() =>
  import('@kickzone-workspace/customer-shopping-cart').then((m) => ({ default: m.CustomerShoppingCart }))
);
const CustomerSignup = lazy(() =>
  import('@kickzone-workspace/customer-signup').then((m) => ({ default: m.CustomerSignup }))
);
const CustomerForgotPassword = lazy(() =>
  import('@kickzone-workspace/customer-forgot-password').then((m) => ({ default: m.CustomerForgotPassword }))
);
const CustomerResetPassword = lazy(() =>
  import('@kickzone-workspace/customer-reset-password').then((m) => ({ default: m.CustomerResetPassword }))
);
const CustomerOrders = lazy(() =>
  import('@kickzone-workspace/customer-orders').then((m) => ({ default: m.CustomerOrders }))
);
const CustomerProfile = lazy(() =>
  import('@kickzone-workspace/customer-profile').then((m) => ({ default: m.CustomerProfile }))
);
const CustomerOrderConfirmation = lazy(() =>
  import('@kickzone-workspace/customer-order-confirmation').then((m) => ({ default: m.CustomerOrderConfirmation }))
);
const CustomerPaymentCallback = lazy(() =>
  import('@kickzone-workspace/customer-payment').then((m) => ({ default: m.CustomerPaymentCallback }))
);
const LanguageComponents = lazy(() =>
  import('@kickzone-workspace/language-components').then((m) => ({ default: m.LanguageComponents }))
);
const CustomerFavorites = lazy(() =>
  import('@kickzone-workspace/customer-favorites').then((m) => ({ default: m.CustomerFavorites }))
);
const CustomerGuideAuthenticity = lazy(() =>
  import('@kickzone-workspace/customer-guide-authenticity').then((m) => ({ default: m.CustomerGuideAuthenticity }))
);
const CustomerGuidePayment = lazy(() =>
  import('@kickzone-workspace/customer-guide-payment').then((m) => ({ default: m.CustomerGuidePayment }))
);
const CustomerContact = lazy(() =>
  import('@kickzone-workspace/customer-contact').then((m) => ({ default: m.CustomerContact }))
);
const CustomerShippingReturns = lazy(() =>
  import('@kickzone-workspace/customer-shipping-returns').then((m) => ({ default: m.CustomerShippingReturns }))
);
const CustomerPrivacyPolicy = lazy(() =>
  import('@kickzone-workspace/customer-privacy-policy').then((m) => ({ default: m.CustomerPrivacyPolicy }))
);
const CustomerNotFound = lazy(() =>
  import('@kickzone-workspace/customer-not-found').then((m) => ({ default: m.CustomerNotFound }))
);

export function CustomersRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        {/* Route-aware robots meta manager - must be inside BrowserRouter for useLocation */}
        <RobotsMetaManager />
        <Suspense fallback={null}>
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
          {/* Legacy /product/:id redirect to /products/:id (preserves search/hash) */}
          <Route path="/product/:id" element={<ProductLegacyRedirect />} />
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
          <Route
            path={CUSTOMER_ROUTES.CONTACT}
            element={<CustomerContact />}
          />
          <Route
            path={CUSTOMER_ROUTES.SHIPPING_RETURNS}
            element={<CustomerShippingReturns />}
          />
          <Route
            path={CUSTOMER_ROUTES.PRIVACY_POLICY}
            element={<CustomerPrivacyPolicy />}
          />

          {/* Wildcard 404 Route */}
          <Route path="*" element={<CustomerNotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default CustomersRouter;
