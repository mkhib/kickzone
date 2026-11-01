import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { CustomerShoppingCart } from './customer-shopping-cart';
import type { CartItem } from '@kickzone-workspace/customer-cart-store';
import type { ShippingMethod } from '@kickzone-workspace/customer-checkout-store';

// Module-level shared mocks for consistent references across tests
const mockCreateOrderMutation = vi.fn().mockResolvedValue({ id: 'order-1', orderNumber: 'ORD-1001' });
const mockRequestPayment = vi.fn().mockResolvedValue('AUTH123456');
const mockRedirectToGateway = vi.fn();
const mockCancelPendingOrder = vi.fn().mockResolvedValue(true);
const mockUpdateCartItem = vi.fn();
const mockRemoveFromCart = vi.fn().mockResolvedValue({});
const mockClearCartMutation = vi.fn().mockResolvedValue({});

// Polyfill canvas getContext before any lottie imports
if (typeof window !== 'undefined' && window.HTMLCanvasElement) {
  (window.HTMLCanvasElement.prototype as unknown as { getContext: unknown }).getContext = vi
    .fn()
    .mockReturnValue({
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: [] })),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
    });
}

vi.mock('lottie-web', () => ({
  default: {
    loadAnimation: vi.fn(),
  },
}));
vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));
vi.mock('@kickzone-workspace/lottie-empty-cart', () => ({
  LottieEmptyCart: () => <div data-testid="empty-cart-lottie" />,
}));

// Track test state
const VALID_SHIPPING = {
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  customerPhone: '09121234567',
  shippingAddress: 'Tehran, Valiasr St, No 123',
  city: 'Tehran',
  state: 'Tehran',
  zipCode: '1234567890',
  country: 'Iran',
  notes: '',
};
let mockShippingInfo: Record<string, string> = { ...VALID_SHIPPING };
let mockLocale = 'en';
let mockUser: { id: string; name: string; email: string } | null = null;
let mockCartItems: CartItem[] = [];
let mockShippingMethod: ShippingMethod = 'vip';
let mockIsCheckoutDialogOpen = false;
let mockIsAuthDialogOpen = false;
let mockActiveStep = 0;
const mockRemoveItem = vi.fn((id: string) => {
  mockCartItems = mockCartItems.filter((item) => item.id !== id);
});
const mockUpdateItemQuantity = vi.fn((id: string, q: number) => {
  mockCartItems = mockCartItems.map((item) =>
    item.id === id
      ? { ...item, quantity: q, totalPrice: item.unitPrice * q }
      : item
  );
});
const mockClearCart = vi.fn(() => {
  mockCartItems = [];
});
const mockSetShippingMethod = vi.fn((method: ShippingMethod) => {
  mockShippingMethod = method;
});
const mockOpenCheckoutDialog = vi.fn(() => {
  mockIsCheckoutDialogOpen = true;
});
const mockCloseCheckoutDialog = vi.fn(() => {
  mockIsCheckoutDialogOpen = false;
});
const mockOpenAuthDialog = vi.fn(() => {
  mockIsAuthDialogOpen = true;
});
const mockCloseAuthDialog = vi.fn(() => {
  mockIsAuthDialogOpen = false;
});
const mockNextStep = vi.fn(() => {
  mockActiveStep += 1;
});
const mockPrevStep = vi.fn(() => {
  mockActiveStep -= 1;
});
const mockSetCheckoutStep = vi.fn((step: number) => {
  mockActiveStep = step;
});
const mockSetShippingInfo = vi.fn();
const mockUpdateShippingField = vi.fn();
const mockSetValidationErrors = vi.fn();
const mockClearAllValidationErrors = vi.fn();
const mockShowSnackbar = vi.fn();

// Default shipping data for tests
let mockShippingData = {
  calculateShippingCost: {
    totalShippingCost: 1.2,
    freeShippingApplied: false,
    strategyUsed: 'TIERED_DISCOUNT',
    shippingBreakdown: [
      { sellerId: '1', originalFee: 1.2, appliedFee: 1.2 },
    ],
  },
};

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({ currentLocale: mockLocale }),
  usePageTitle: vi.fn(),
  useI18nContext: () => ({
    LL: {
      pageTitles: { shoppingCart: () => 'Shopping Cart' },
      checkout: {
        shoppingCart: () => 'Shopping Cart',
        yourCartIsEmpty: () => 'Your cart is empty',
        continueShopping: () => 'Continue Shopping',
        proceedToCheckout: () => 'Proceed to Checkout',
        clearCart: () => 'Clear Cart',
        orderSummary: () => 'Order Summary',
        subtotal: () => 'Subtotal',
        shipping: () => 'Shipping',
        total: () => 'Total',
        reviewCart: () => 'Review Cart',
        shippingInformation: () => 'Shipping Information',
        payment: () => 'Payment',
        itemRemovedMessage: () => 'Item removed',
        removeFailedMessage: () => 'Failed to remove item',
        quantityUpdatedMessage: () => 'Quantity updated',
        updateFailedMessage: () => 'Failed to update quantity',
        cartClearedMessage: () => 'Cart cleared',
        clearFailedMessage: () => 'Failed to clear cart',
        demoCheckout: () => 'Demo Checkout Completed',
        authenticationRequired: () => 'Authentication Required',
        authenticationMessage: () => 'Please sign in to proceed',
        loginRegister: () => 'Sign In / Register',
        proceedToPayment: () => 'Proceed to Payment',
        orderCreatedRedirecting: () => 'Order created',
        orderNumberLabel: () => 'Order Number',
        totalAmountLabel: () => 'Total Amount',
        continueToPaymentGateway: () => 'Pay via Gateway',
        paymentInitializationFailed: () => 'Payment failed',
        processingOrder: () => 'Processing...',
        orderProcessed: () => 'Order processed',
      },
      products: {
        color: () => 'Color',
        size: () => 'Size',
        left: () => 'left',
      },
      table: {
        product: () => 'product(s)',
        quantity: () => 'Qty',
      },
      form: {
        fullName: () => 'Full Name',
        email: () => 'Email',
        phone: () => 'Phone Number',
        country: () => 'Country',
        address: () => 'Shipping Address',
        city: () => 'City',
        state: () => 'State',
        zipCode: () => 'Postal Code',
        notes: () => 'Order Notes',
        optional: () => 'Optional',
      },
      button: {
        cancel: () => 'Cancel',
        back: () => 'Back',
        next: () => 'Next',
        edit: () => 'Edit',
      },
      errors: {
        missingShippingInfo: () => 'Please fill in required fields',
        outdatedCartItems: () => 'Some items are invalid',
        productsNotAvailable: () => 'Product not available',
        insufficientStock: () => 'Insufficient stock',
        orderFailed: () => 'Order creation failed',
        unauthorized: () => 'Unauthorized',
      },
      validation: {
        name: {
          required: () => 'Name is required',
          minLength: () => 'Name must be at least 2 characters',
          maxLength: () => 'Name cannot exceed 100 characters',
          invalidCharacters: () => 'Name can only contain letters, spaces, hyphens, and apostrophes',
        },
        email: {
          required: () => 'Email is required',
          maxLength: () => 'Email cannot exceed 255 characters',
          invalid: () => 'Please enter a valid email address',
        },
        phone: {
          required: () => 'Phone number is required',
          invalid: () => 'Please enter a valid phone number',
        },
        address: {
          required: () => 'Address is required',
          minLength: () => 'Address must be at least 3 characters',
          maxLength: () => 'Address cannot exceed 200 characters',
        },
        city: {
          required: () => 'City is required',
          minLength: () => 'City must be at least 2 characters',
          maxLength: () => 'City cannot exceed 100 characters',
          invalidCharacters: () => 'City can only contain letters, spaces, hyphens, and apostrophes',
        },
        state: {
          required: () => 'State/Province is required',
          minLength: () => 'State/Province must be at least 2 characters',
          maxLength: () => 'State/Province cannot exceed 100 characters',
          invalidCharacters: () => 'State/Province can only contain letters, spaces, hyphens, and apostrophes',
        },
        zipCode: {
          required: () => 'ZIP/Postal code is required',
          minLength: () => 'ZIP/Postal code must be at least 3 characters',
          maxLength: () => 'ZIP/Postal code cannot exceed 20 characters',
          invalidCharacters: () => 'ZIP/Postal code can only contain letters, numbers, spaces, and hyphens',
        },
        country: {
          required: () => 'Country is required',
          minLength: () => 'Country must be at least 2 characters',
          maxLength: () => 'Country cannot exceed 100 characters',
          invalidCharacters: () => 'Country can only contain letters, spaces, hyphens, and apostrophes',
        },
        notes: {
          maxLength: () => 'Notes cannot exceed 500 characters',
        },
        general: {
          error: () => 'An unexpected validation error occurred',
        },
      },
    },
  }),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({ user: mockUser }),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItems: () => mockCartItems,
  useCartLoading: () => false,
  useCartError: () => null,
  useCartTotal: () =>
    mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0),
  useRemoveItem: () => mockRemoveItem,
  useUpdateItemQuantity: () => mockUpdateItemQuantity,
  useClearCart: () => mockClearCart,
}));

vi.mock('@kickzone-workspace/customer-checkout-store', () => ({
  useIsCheckoutDialogOpen: () => mockIsCheckoutDialogOpen,
  useIsAuthDialogOpen: () => mockIsAuthDialogOpen,
  useCheckoutActiveStep: () => mockActiveStep,
  useCheckoutShippingMethod: () => mockShippingMethod,
  useCheckoutShippingInfo: () => mockShippingInfo,
  useCheckoutValidationErrors: () => ({}),
  useIsCreatingOrder: () => false,
  useCreatedOrder: () => null,
  usePaymentAuthority: () => null,
  useOpenCheckoutDialog: () => mockOpenCheckoutDialog,
  useCloseCheckoutDialog: () => mockCloseCheckoutDialog,
  useOpenAuthDialog: () => mockOpenAuthDialog,
  useCloseAuthDialog: () => mockCloseAuthDialog,
  useSetCheckoutStep: () => mockSetCheckoutStep,
  useNextCheckoutStep: () => mockNextStep,
  usePrevCheckoutStep: () => mockPrevStep,
  useSetShippingMethod: () => mockSetShippingMethod,
  useSetShippingInfo: () => mockSetShippingInfo,
  useUpdateShippingField: () => mockUpdateShippingField,
  useSetValidationErrors: () => mockSetValidationErrors,
  useClearAllValidationErrors: () => mockClearAllValidationErrors,
  useSetIsCreatingOrder: () => vi.fn(),
  useSetCreatedOrder: () => vi.fn(),
  useSetPaymentAuthority: () => vi.fn(),
  useResetCheckout: () => vi.fn(),
}));

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: vi.fn(),
  useCustomersCartMutations: () => ({
    updateCartItem: mockUpdateCartItem,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCartMutation,
    createOrder: mockCreateOrderMutation,
  }),
}));

vi.mock('@kickzone-workspace/customer-payment', () => ({
  useZarinPalPayment: () => ({
    requestPayment: mockRequestPayment,
    redirectToGateway: mockRedirectToGateway,
    cancelPendingOrder: mockCancelPendingOrder,
  }),
}));

vi.mock('@kickzone-workspace/currency-hook', () => ({
  useConvertPrice: ({ amount }: { amount: number }) => ({
    originalAmount: amount,
    convertedAmount: amount * 300000,
    loading: false,
    rate: 300000,
  }),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

vi.mock('@apollo/client/react', () => ({
  useQuery: () => ({
    data: mockShippingData,
    loading: false,
  }),
  useMutation: () => [vi.fn().mockResolvedValue({}), { loading: false }],
}));

vi.mock('@kickzone-workspace/lottie-empty-cart', () => ({
  LottieEmptyCart: () => <div data-testid="empty-cart-lottie" />,
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span data-testid="price-display">${Number(priceInUSD).toFixed(2)}</span>
  ),
}));

vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c5b89a' },
  },
});

function renderWithProviders() {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CustomerShoppingCart />
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Helper to set shipping data for a test
function setShippingData(data: typeof mockShippingData) {
  mockShippingData = data;
}

describe('CustomerShoppingCart - shipping step uses react-hook-form + shared Zod schema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
    mockUser = null;
    mockShippingMethod = 'vip';
    mockIsCheckoutDialogOpen = true;
    mockIsAuthDialogOpen = false;
    mockActiveStep = 1;
    mockShippingInfo = { ...VALID_SHIPPING };
    mockCartItems = [
      {
        id: 'cart-item-1',
        productId: 'prod-1',
        productInfoId: 'pi-1',
        sellerProductId: '11111111-1111-1111-1111-111111111111',
        sellerId: '1',
        sellerName: 'SAINTBALA',
        sellerShippingFee: 1.2,
        productName: 'SAINTBALA Monogram Hoodie',
        productImage: '/hoodie.jpg',
        quantity: 1,
        unitPrice: 150,
        totalPrice: 150,
        availableStock: 5,
        color: '#121212',
        size: 'L',
      },
    ];
  });

  const clickNext = async () => {
    const next = screen.getAllByRole('button', { name: /^next$/i }).at(-1);
    if (!next) throw new Error('Next button not found');
    await act(async () => {
      fireEvent.click(next);
    });
  };

  it('blocks the step and shows localized field errors for invalid shipping info', async () => {
    mockShippingInfo = { ...VALID_SHIPPING, customerName: '', customerPhone: '12' };
    renderWithProviders();
    await clickNext();

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    expect(mockNextStep).not.toHaveBeenCalled();
    expect(mockShowSnackbar).toHaveBeenCalled();
  });

  it('advances when the shipping info is valid, accepting Persian digits in phone and postal code', async () => {
    mockShippingInfo = {
      ...VALID_SHIPPING,
      customerPhone: '۰۹۱۲۱۲۳۴۵۶۷',
      zipCode: '۱۲۳۴۵۶۷۸۹۰',
    };
    renderWithProviders();
    await clickNext();

    await waitFor(() => expect(mockNextStep).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('allows guest checkout with an empty email', async () => {
    mockShippingInfo = { ...VALID_SHIPPING, customerEmail: '' };
    renderWithProviders();
    await clickNext();

    await waitFor(() => expect(mockNextStep).toHaveBeenCalledTimes(1));
  });
});
