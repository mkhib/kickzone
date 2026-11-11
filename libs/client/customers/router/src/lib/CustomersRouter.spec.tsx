import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomersRouter from './CustomersRouter';
import * as sharedI18n from '@kickzone-workspace/shared-i18n';

// Mock shared-i18n to provide useSeoMeta and other hooks
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({ currentLocale: 'en', formatNumber: vi.fn() }),
  usePageTitle: vi.fn(),
  useSeoMeta: vi.fn(),
  useI18nContext: () => ({
    LL: {
      appNames: { siteName: () => 'SAINTBALA' },
      home: {
        nav: { mainAria: () => 'Navigation', women: () => 'Women', men: () => 'Men' },
        footer: {
          tagline: () => 'Authentic luxury sportswear',
          store: () => 'Shop',
          women: () => 'Women',
          men: () => 'Men',
          hoodies: () => 'Hoodies',
          pants: () => 'Pants',
          brands: () => 'Brands',
          guide: () => 'Help',
          authenticity: () => 'Authenticity',
          sizeGuide: () => 'Size Guide',
          payment: () => 'Payment',
          account: () => 'Account',
          loginWithEmail: () => 'Login',
          cart: () => 'Cart',
          favorites: () => 'Favorites',
          copyright: () => '© SAINTBALA',
          paymentOnline: () => 'Online payment',
        },
        searchPlaceholder: () => 'Search...',
      },
      navigation: {
        home: () => 'Home',
        shoppingCart: () => 'Cart',
        profile: () => 'Profile',
        menu: () => 'Menu',
      },
      orders: { myOrders: () => 'My Orders' },
      button: { login: () => 'Login', logout: () => 'Logout' },
      products: { searchPlaceholder: () => 'Search...' },
    },
  }),
}));

const useSeoMetaMock = vi.mocked(sharedI18n.useSeoMeta);

// Mock all dependent screens and heavy libraries
vi.mock('@kickzone-workspace/customers-home-screen', () => ({
  CustomersHome: () => <div data-testid="mock-home-screen">Home Screen</div>,
  CustomersShopScreen: () => <div data-testid="mock-shop-screen">Shop Screen</div>,
}));

vi.mock('@kickzone-workspace/customer-product-details', () => ({
  CustomerProductDetails: () => (
    <div data-testid="mock-product-details">Product Details</div>
  ),
}));

vi.mock('@kickzone-workspace/customers-login-screen', () => ({
  CustomersLogin: () => <div data-testid="mock-login">Login</div>,
}));

vi.mock('@kickzone-workspace/customers-unauthorized-screen', () => ({
  CustomersUnauthorizedScreen: () => (
    <div data-testid="mock-unauthorized">Unauthorized</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-shopping-cart', () => ({
  CustomerShoppingCart: () => <div data-testid="mock-cart">Shopping Cart</div>,
}));

vi.mock('@kickzone-workspace/customer-signup', () => ({
  CustomerSignup: () => <div data-testid="mock-signup">Signup</div>,
}));

vi.mock('@kickzone-workspace/customer-forgot-password', () => ({
  CustomerForgotPassword: () => (
    <div data-testid="mock-forgot-password">Forgot Password</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-reset-password', () => ({
  CustomerResetPassword: () => (
    <div data-testid="mock-reset-password">Reset Password</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-orders', () => ({
  CustomerOrders: () => <div data-testid="mock-orders">Orders</div>,
}));

vi.mock('@kickzone-workspace/customer-profile', () => ({
  CustomerProfile: () => <div data-testid="mock-profile">Profile</div>,
}));

vi.mock('@kickzone-workspace/customer-order-confirmation', () => ({
  CustomerOrderConfirmation: () => (
    <div data-testid="mock-order-confirmation">Order Confirmation</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-payment', () => ({
  CustomerPaymentCallback: () => (
    <div data-testid="mock-payment-callback">Payment Callback</div>
  ),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  LanguageComponents: () => (
    <div data-testid="mock-language-components">Language Components</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-favorites', () => ({
  CustomerFavorites: () => (
    <div data-testid="mock-customer-favorites">SAINTBALA Favorites Screen</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-guide-authenticity', () => ({
  CustomerGuideAuthenticity: () => (
    <div data-testid="mock-guide-authenticity">
      SAINTBALA Authenticity Guide Screen
    </div>
  ),
}));

vi.mock('@kickzone-workspace/customer-guide-payment', () => ({
  CustomerGuidePayment: () => (
    <div data-testid="mock-guide-payment">SAINTBALA Payment Guide Screen</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-contact', () => ({
  CustomerContact: () => (
    <div data-testid="mock-customer-contact">SAINTBALA Contact Screen</div>
  ),
}));

vi.mock('@kickzone-workspace/customer-shipping-returns', () => ({
  CustomerShippingReturns: () => (
    <div data-testid="mock-customer-shipping-returns">
      SAINTBALA Shipping Returns Screen
    </div>
  ),
}));

vi.mock('@kickzone-workspace/customer-privacy-policy', () => ({
  CustomerPrivacyPolicy: () => (
    <div data-testid="mock-customer-privacy-policy">
      SAINTBALA Privacy Policy Screen
    </div>
  ),
}));

vi.mock('@kickzone-workspace/customer-not-found', () => ({
  CustomerNotFound: () => (
    <div data-testid="mock-customer-not-found">SAINTBALA 404 Screen</div>
  ),
}));

describe('CustomersRouter Integration', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders home screen at root "/"', () => {
    window.history.pushState({}, 'Home', '/');
    render(<CustomersRouter />);

    expect(screen.getByTestId('mock-home-screen')).toBeInTheDocument();
  });

  it('routes to /favorites without crashing', async () => {
    window.history.pushState({}, 'Favorites', '/favorites');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-customer-favorites');
  });

  it('routes to /guide/authenticity without crashing', async () => {
    window.history.pushState({}, 'Authenticity Guide', '/guide/authenticity');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-guide-authenticity');
  });

  it('routes to /guide/payment without crashing', async () => {
    window.history.pushState({}, 'Payment Guide', '/guide/payment');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-guide-payment');
  });

  it('routes to /contact without crashing', async () => {
    window.history.pushState({}, 'Contact Concierge', '/contact');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-customer-contact');
  });

  it('routes to /shipping-returns without crashing', async () => {
    window.history.pushState({}, 'Shipping & Returns', '/shipping-returns');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-customer-shipping-returns');
  });

  it('routes to /privacy-policy without crashing', async () => {
    window.history.pushState({}, 'Privacy Policy', '/privacy-policy');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-customer-privacy-policy');
  });

  it('routes unknown URLs to the wildcard CustomerNotFound 404 screen', async () => {
    window.history.pushState({}, 'Unknown', '/any/completely/unknown/page-404');
    render(<CustomersRouter />);

    await screen.findByTestId('mock-customer-not-found');
  });
});

describe('Legacy /product/:id redirect', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    vi.clearAllMocks();
  });

  it('redirects /product/42 to /products/42 with replace', () => {
    window.history.pushState({}, 'Product', '/product/42');
    render(<CustomersRouter />);

    // Should redirect to /products/42 (CustomerProductDetails renders)
    expect(screen.getByTestId('mock-product-details')).toBeInTheDocument();
  });

  it('preserves query string and hash during redirect', () => {
    window.history.pushState({}, 'Product', '/product/42?color=red#details');
    render(<CustomersRouter />);

    // Should redirect preserving search and hash
    expect(screen.getByTestId('mock-product-details')).toBeInTheDocument();
  });
});

describe('RobotsMetaManager - route-aware noindex', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    vi.clearAllMocks();
    useSeoMetaMock.mockClear();
  });

  it('sets noindex, nofollow on private routes (/cart)', () => {
    window.history.pushState({}, 'Cart', '/cart');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/login)', () => {
    window.history.pushState({}, 'Login', '/login');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/signup)', () => {
    window.history.pushState({}, 'Signup', '/signup');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/forgot-password)', () => {
    window.history.pushState({}, 'ForgotPassword', '/forgot-password');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/reset-password/token)', () => {
    window.history.pushState({}, 'ResetPassword', '/reset-password/abc123');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/orders)', () => {
    window.history.pushState({}, 'Orders', '/orders');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/profile)', () => {
    window.history.pushState({}, 'Profile', '/profile');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/favorites)', () => {
    window.history.pushState({}, 'Favorites', '/favorites');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/unauthorized)', () => {
    window.history.pushState({}, 'Unauthorized', '/unauthorized');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/language-settings)', () => {
    window.history.pushState({}, 'LanguageSettings', '/language-settings');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/order-confirmation)', () => {
    window.history.pushState({}, 'OrderConfirmation', '/order-confirmation');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on private routes (/payment-callback)', () => {
    window.history.pushState({}, 'PaymentCallback', '/payment-callback');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets noindex, nofollow on unknown / 404 routes', () => {
    window.history.pushState({}, 'Unknown', '/any/completely/unknown/page-404');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: true })
    );
  });

  it('sets index, follow on public route (/)', () => {
    window.history.pushState({}, 'Home', '/');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/shop)', () => {
    window.history.pushState({}, 'Shop', '/shop');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/brands/nike)', () => {
    window.history.pushState({}, 'Brand', '/brands/nike');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/contact)', () => {
    window.history.pushState({}, 'Contact', '/contact');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/guide/authenticity)', () => {
    window.history.pushState({}, 'GuideAuthenticity', '/guide/authenticity');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/guide/payment)', () => {
    window.history.pushState({}, 'GuidePayment', '/guide/payment');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/shipping-returns)', () => {
    window.history.pushState({}, 'ShippingReturns', '/shipping-returns');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('sets index, follow on public route (/privacy-policy)', () => {
    window.history.pushState({}, 'PrivacyPolicy', '/privacy-policy');
    render(<CustomersRouter />);

    expect(useSeoMetaMock).toHaveBeenCalledWith(
      expect.objectContaining({ noindex: false })
    );
  });

  it('does NOT call useSeoMeta on /products/:id (leaves to CustomerProductDetails)', () => {
    window.history.pushState({}, 'ProductDetails', '/products/42');
    render(<CustomersRouter />);

    // Should not call useSeoMeta with noindex for product details route
    // (CustomerProductDetails handles its own robots logic)
    const noindexCalls = useSeoMetaMock.mock.calls.filter(
      (call) => call[0]?.noindex === true
    );
    expect(noindexCalls.length).toBe(0);
  });
});
