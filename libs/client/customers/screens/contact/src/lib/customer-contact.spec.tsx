import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerContact from './customer-contact';

let mockLocale = 'en';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({ currentLocale: mockLocale }),
  usePageTitle: vi.fn(),
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

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItemCount: () => 0,
}));

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector: (s: { theme: { mode: string } }) => unknown) =>
    selector({ theme: { mode: 'dark' } }),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    open: false,
    message: '',
    severity: 'info',
    progress: 0,
    handleClose: vi.fn(),
  }),
}));

describe('CustomerContact Screen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
  });

  const renderComponent = () => {
    const theme = createTheme({ palette: { mode: 'dark' } });
    return render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CustomerContact />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders contact channels, phone, email, and concierge header in English', () => {
    renderComponent();

    expect(screen.getByText(/Connect with the/i)).toBeInTheDocument();
    expect(screen.getByText('VIP Concierge Hotline')).toBeInTheDocument();
    expect(
      screen.getAllByText('+98 21 9100 8888').length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText('concierge@saintbala.com').length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId('contact-input-name')).toBeInTheDocument();
    expect(screen.getByTestId('contact-input-email')).toBeInTheDocument();
  });

  it('renders in Persian (fa) with proper RTL branding and Persian texts', () => {
    mockLocale = 'fa';
    renderComponent();

    expect(
      screen.getByText(/ارتباط مستقیم با تیم تشریفات/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText('خط اختصاصی پشتیبانی و کنسیرژ')
    ).toBeInTheDocument();
    expect(screen.getByText('۰۲۱-۹۱۰۰۸۸۸۸')).toBeInTheDocument();
    expect(
      screen.getByText('ثبت درخواست پیام یا استعلام مستقیم')
    ).toBeInTheDocument();
  });

  it('validates required fields on submission', () => {
    renderComponent();

    const submitBtn = screen.getByTestId('contact-submit-btn');
    fireEvent.click(submitBtn);

    expect(
      screen.getByText('Please enter your full name')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your email address')
    ).toBeInTheDocument();
    expect(screen.getByText('Please enter a subject')).toBeInTheDocument();
    expect(
      screen.getByText('Please write your message or inquiry')
    ).toBeInTheDocument();
  });

  it('submits form successfully when valid', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('contact-input-name'), {
      target: { value: 'Ali Rezaei' },
    });
    fireEvent.change(screen.getByTestId('contact-input-email'), {
      target: { value: 'ali@example.com' },
    });
    fireEvent.change(screen.getByTestId('contact-input-subject'), {
      target: { value: 'Authenticity Verification Inquiry' },
    });
    fireEvent.change(screen.getByTestId('contact-input-message'), {
      target: { value: 'I would like to verify serial tag #SB-98421.' },
    });

    const submitBtn = screen.getByTestId('contact-submit-btn');
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Thank you\. Your inquiry has been routed/i)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
