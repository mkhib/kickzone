import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CustomerProfile from './customer-profile';

vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

const mockAuthState: {
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  logout: () => void;
} = {
  user: {
    id: '89210-alb',
    name: 'آرشام',
    lastName: 'پارسا',
    email: 'arsham.parsa@saintbala.com',
    role: 'CUSTOMER',
  },
  logout: vi.fn(),
};

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => mockAuthState,
}));

const mockProfileData = {
  myProfile: {
    id: 'prof-1',
    userId: '89210-alb',
    phone: '09128884422',
    address: 'خیابان ولیعصر، برج نگین، طبقه ۱۲',
    city: 'تهران',
    state: 'تهران',
    zipCode: '1987654321',
    country: 'ایران',
  },
  myOrders: [
    {
      id: 'ord-1',
      orderNumber: 'KZ-1001',
      status: 'PROCESSING',
      total: 18500000,
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'item-1',
          productId: 'prod-1',
          productName: 'کتونی نایکی جردن',
          quantity: 1,
          unitPrice: 18500000,
          totalPrice: 18500000,
        },
      ],
    },
  ],
};

const mockMutationFn = vi.fn().mockResolvedValue({ data: {} });

vi.mock('@apollo/client/react', () => ({
  useQuery: () => ({
    data: mockAuthState.user ? mockProfileData : null,
    loading: false,
    refetch: vi.fn(),
  }),
  useMutation: () => [mockMutationFn, { loading: false }],
}));

vi.mock('@kickzone-workspace/order-status-chip', () => ({
  OrderStatusChip: ({ status }: { status: string }) => (
    <div data-testid="order-status-chip">{status}</div>
  ),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span data-testid="price-display">{priceInUSD} تومان</span>
  ),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      customerProfile: {
        pageTitle: () => 'پروفایل کاربری | SAINTBALA',
        editInformation: () => 'ویرایش اطلاعات',
        tabProfileAndAddresses: () => 'مشخصات و نشانی',
        tabMyOrders: () => 'سفارش‌های من',
        tabSettingsAndSecurity: () => 'امنیت حساب',
        orderBannerTitle: () => 'پیگیری سریع سفارش‌ها',
        orderBannerTextDefault: () => 'سفارش‌های گذشته خود را بررسی کرده یا آخرین وضعیت ارسال را پیگیری نمایید.',
        goToOrders: () => 'مشاهده تمام سفارش‌ها',
        identityCardTitle: () => 'اطلاعات کاربری',
        identityCardSubtitle: () => 'User Account Details',
        fullName: () => 'نام و نام خانوادگی',
        phone: () => 'شماره تماس',
        email: () => 'آدرس ایمیل',
        username: () => 'نام کاربری',
        accountType: () => 'نوع حساب',
        customerAccount: () => 'حساب مشتری',
        guestAccount: () => 'مهمان',
        copyEmail: () => 'کپی ایمیل',
        emailCopied: () => 'آدرس ایمیل با موفقیت کپی شد',
        preferencesCardTitle: () => 'سایز انتخابی برای خرید',
        edit: () => 'ویرایش',
        preferredClothingSize: () => 'سایز لباس',
        standardShoeSize: () => 'سایز کفش',
        shippingCenterTitle: () => 'نشانی تحویل سفارش',
        shippingCenterSubtitle: () => 'Shipping Address',
        addNewAddress: () => 'ثبت نشانی جدید',
        editAddress: () => 'ویرایش نشانی',
        primaryAddressBadge: () => 'نشانی پیش‌فرض تحویل',
        noAddressTitle: () => 'هنوز نشانی ثبت نشده است',
        noAddressSubtitle: () => 'برای ارسال سفارش‌های خود، نشانی پستی را وارد کنید.',
        guestNoAddress: () => 'برای ثبت نشانی تحویل، ابتدا وارد حساب کاربری شوید.',
        guestNoOrders: () => 'برای مشاهده سوابق خرید، وارد حساب کاربری خود شوید.',
        guestNoSecurity: () => 'برای مدیریت امنیت، ابتدا وارد حساب کاربری خود شوید.',
        loginToEditTooltip: () => 'برای ویرایش، ابتدا وارد حساب کاربری خود شوید.',
        province: () => 'استان',
        city: () => 'شهر',
        postalCode: () => 'کد پستی:',
        country: () => 'کشور',
        recipient: () => 'گیرنده:',
        editProfileDialogTitle: () => 'ویرایش اطلاعات کاربری',
        editAddressDialogTitle: () => 'ویرایش نشانی تحویل',
        editPreferencesDialogTitle: () => 'ویرایش سایزهای انتخابی',
        firstName: () => 'نام',
        lastName: () => 'نام خانوادگی',
        addressLine: () => 'نشانی دقیق پستی',
        saveChanges: () => 'ذخیره تغییرات',
        cancel: () => 'انصراف',
        saveSuccess: () => 'اطلاعات با موفقیت ذخیره شد',
        saveError: () => 'خطا در ذخیره اطلاعات',
        noUserWarning: () => 'لطفاً ابتدا وارد حساب کاربری خود شوید.',
        loginButton: () => 'ورود به حساب کاربری',
        securityTitle: () => 'امنیت و تنظیمات حساب',
        changePassword: () => 'تغییر گذرواژه',
        changePasswordDesc: () => 'جهت تغییر رمز عبور، لینک بازیابی به ایمیل شما ارسال می‌شود.',
        logout: () => 'خروج از حساب کاربری',
        logoutDesc: () => 'خروج امن از حساب در این مرورگر',
        noOrdersFound: () => 'هنوز سفارشی ثبت نشده است.',
        startShopping: () => 'مشاهده و خرید محصولات',
      },
    },
  }),
  useLanguageContext: () => ({ currentLocale: 'fa' }),
  usePageTitle: vi.fn(),
  farsiDisplayStack: '"El Messiri", "Vazirmatn", "Manrope", sans-serif',
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({ showSnackbar: vi.fn() }),
}));

describe('CustomerProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthState.user = {
      id: '89210-alb',
      name: 'آرشام',
      lastName: 'پارسا',
      email: 'arsham.parsa@saintbala.com',
      role: 'CUSTOMER',
    };
  });

  it('renders successfully with user details and editorial sections when authenticated', () => {
    render(
      <MemoryRouter>
        <CustomerProfile />
      </MemoryRouter>
    );

    expect(screen.getAllByText('آرشام پارسا').length).toBeGreaterThan(0);
    expect(screen.getByText('مشخصات و نشانی')).toBeTruthy();
    expect(screen.getByText('سفارش‌های من')).toBeTruthy();
    expect(screen.getByText('امنیت حساب')).toBeTruthy();
    expect(screen.getByText('اطلاعات کاربری')).toBeTruthy();
    expect(screen.getByText('نشانی تحویل سفارش')).toBeTruthy();
    expect(screen.getByText('سایز انتخابی برای خرید')).toBeTruthy();
    expect(screen.getByText('حساب مشتری')).toBeTruthy();

    // Verify edit buttons are present and not disabled
    const editInfoBtn = screen.getByRole('button', { name: 'ویرایش اطلاعات' });
    expect(editInfoBtn).not.toBeDisabled();
  });

  it('renders placeholder state and disables interactions when user is unauthenticated (guest)', () => {
    mockAuthState.user = null;

    render(
      <MemoryRouter>
        <CustomerProfile />
      </MemoryRouter>
    );

    // Displays the login prompt alert banner at the top
    expect(screen.getByText('لطفاً ابتدا وارد حساب کاربری خود شوید.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'ورود به حساب کاربری' })).toBeTruthy();

    // User details show placeholders and guest badge
    expect(screen.getByText('مهمان')).toBeTruthy();
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThan(0);

    // Edit buttons are disabled for guests
    const editInfoBtn = screen.getByRole('button', { name: 'ویرایش اطلاعات' });
    expect(editInfoBtn).toBeDisabled();

    const addAddressBtns = screen.getAllByRole('button', { name: 'ثبت نشانی جدید' });
    expect(addAddressBtns.length).toBeGreaterThan(0);
    addAddressBtns.forEach((btn) => {
      expect(btn).toBeDisabled();
    });

    const editPrefBtn = screen.getByRole('button', { name: 'ویرایش' });
    expect(editPrefBtn).toBeDisabled();
  });

  it('normalizes Persian digits to English ASCII digits when updating postal code', async () => {
    render(
      <MemoryRouter>
        <CustomerProfile />
      </MemoryRouter>
    );

    // Click edit address button
    const editAddressBtn = screen.getByRole('button', { name: 'ویرایش نشانی' });
    fireEvent.click(editAddressBtn);

    // Dialog opens with title
    expect(screen.getByText('ویرایش نشانی تحویل')).toBeTruthy();

    // Find the postal code input and type Persian digits '۱۲۳۴۵۶۷۸۹۰'
    const postalCodeInput = screen.getByLabelText('کد پستی:');
    fireEvent.change(postalCodeInput, { target: { value: '۱۲۳۴۵۶۷۸۹۰' } });

    // The value should be converted to English ASCII '1234567890'
    expect(postalCodeInput).toHaveValue('1234567890');

    // Click save changes
    const saveBtn = screen.getByRole('button', { name: 'ذخیره تغییرات' });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({
              zipCode: '1234567890',
            }),
          },
        })
      );
    });
  });
});
