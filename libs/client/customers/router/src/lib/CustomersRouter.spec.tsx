import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomersRouter from './CustomersRouter';

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

  it('routes to /favorites without crashing', () => {
    window.history.pushState({}, 'Favorites', '/favorites');
    render(<CustomersRouter />);

    expect(screen.getByTestId('mock-customer-favorites')).toBeInTheDocument();
  });

  it('routes to /guide/authenticity without crashing', () => {
    window.history.pushState({}, 'Authenticity Guide', '/guide/authenticity');
    render(<CustomersRouter />);

    expect(screen.getByTestId('mock-guide-authenticity')).toBeInTheDocument();
  });

  it('routes to /guide/payment without crashing', () => {
    window.history.pushState({}, 'Payment Guide', '/guide/payment');
    render(<CustomersRouter />);

    expect(screen.getByTestId('mock-guide-payment')).toBeInTheDocument();
  });

  it('routes unknown URLs to the wildcard CustomerNotFound 404 screen', () => {
    window.history.pushState({}, 'Unknown', '/any/completely/unknown/page-404');
    render(<CustomersRouter />);

    expect(screen.getByTestId('mock-customer-not-found')).toBeInTheDocument();
  });
});
