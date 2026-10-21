import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { CustomersFooter } from './customers-footer';

let mockLocale = 'en';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({ currentLocale: mockLocale }),
  useI18nContext: () => ({
    LL: {
      appNames: {
        siteName: () => 'SAINTBALA',
      },
      home: {
        footer: {
          tagline: () => 'Authentic luxury sportswear for women and men.',
          store: () => 'Shop',
          women: () => 'Women',
          men: () => 'Men',
          hoodies: () => 'Hoodies',
          pants: () => 'Pants',
          brands: () => 'Brands',
          guide: () => 'Help',
          authenticity: () => 'Authenticity Verification',
          sizeGuide: () => 'Size Guide',
          payment: () => 'Payment Guide',
          account: () => 'Account',
          loginWithEmail: () => 'Sign In with Email',
          cart: () => 'Cart',
          favorites: () => 'Favorites',
          copyright: ({ year }: { year: string }) => `© ${year} SAINTBALA`,
          paymentOnline: () => 'Online Payment Guaranteed',
        },
      },
      navigation: {
        home: () => 'Home',
      },
    },
  }),
}));

describe('CustomersFooter Component', () => {
  it('renders brand wordmark, contact details, and social links in default variant', () => {
    mockLocale = 'en';
    render(
      <BrowserRouter>
        <CustomersFooter />
      </BrowserRouter>
    );

    expect(screen.getByText('SAINTBALA')).toBeInTheDocument();
    expect(screen.getByTestId('footer-contact-phone')).toHaveAttribute(
      'href',
      'tel:+982191008888'
    );
    expect(screen.getByTestId('footer-contact-email')).toHaveAttribute(
      'href',
      'mailto:concierge@saintbala.com'
    );
    expect(screen.getByTestId('footer-social-links')).toBeInTheDocument();
  });

  it('renders all required policy and guide navigation links', () => {
    render(
      <BrowserRouter>
        <CustomersFooter />
      </BrowserRouter>
    );

    expect(screen.getByTestId('footer-link-contact')).toHaveAttribute(
      'href',
      '/contact'
    );
    expect(
      screen.getByTestId('footer-link-shipping-returns')
    ).toHaveAttribute('href', '/shipping-returns');
    expect(screen.getByTestId('footer-link-privacy-policy')).toHaveAttribute(
      'href',
      '/privacy-policy'
    );
    expect(screen.getByTestId('footer-link-authenticity')).toHaveAttribute(
      'href',
      '/guide/authenticity'
    );
    expect(screen.getByTestId('footer-link-payment')).toHaveAttribute(
      'href',
      '/guide/payment'
    );
  });

  it('renders all 4 payment and security trust badges', () => {
    render(
      <BrowserRouter>
        <CustomersFooter />
      </BrowserRouter>
    );

    expect(screen.getByTestId('footer-trust-badges')).toBeInTheDocument();
    expect(screen.getByTestId('badge-shetab')).toBeInTheDocument();
    expect(screen.getByTestId('badge-shaparak')).toBeInTheDocument();
    expect(screen.getByTestId('badge-ssl')).toBeInTheDocument();
    expect(screen.getByTestId('badge-authenticity')).toBeInTheDocument();
  });

  it('renders in glass variant and supports Persian (fa)', () => {
    mockLocale = 'fa';
    render(
      <BrowserRouter>
        <CustomersFooter variant="glass" />
      </BrowserRouter>
    );

    expect(screen.getByText('شبکه کارت‌های شتاب')).toBeInTheDocument();
    expect(screen.getByText('درگاه رسمی شاپرک')).toBeInTheDocument();
    expect(screen.getByText('رمزنگاری ۲۵۶ بیتی SSL')).toBeInTheDocument();
    expect(screen.getByText('ضمانت قطعی اصالت')).toBeInTheDocument();
  });
});
