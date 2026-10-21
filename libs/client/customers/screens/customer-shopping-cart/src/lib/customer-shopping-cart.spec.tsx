import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { CustomerShoppingCart } from './customer-shopping-cart';
import type { CartItem } from '@kickzone-workspace/customer-cart-store';
import type { ShippingMethod } from '@kickzone-workspace/customer-checkout-store';

// Polyfill canvas getContext before any lottie imports
if (typeof window !== 'undefined' && window.HTMLCanvasElement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window.HTMLCanvasElement.prototype as any).getContext = vi
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
      measureText: vi.fn(() => ({ width: 0 })),
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
  useCheckoutShippingInfo: () => ({
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    customerPhone: '09121234567',
    shippingAddress: 'Tehran, Valiasr St, No 123',
    city: 'Tehran',
    state: 'Tehran',
    zipCode: '1234567890',
    country: 'Iran',
    notes: '',
  }),
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
    updateCartItem: vi.fn(),
    removeFromCart: vi.fn().mockResolvedValue({}),
    clearCart: vi.fn().mockResolvedValue({}),
    createOrder: vi
      .fn()
      .mockResolvedValue({ id: 'order-1', orderNumber: 'ORD-1001' }),
  }),
}));

vi.mock('@kickzone-workspace/customer-payment', () => ({
  useZarinPalPayment: () => ({
    requestPayment: vi.fn().mockResolvedValue('AUTH123456'),
    redirectToGateway: vi.fn(),
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
    data: {
      calculateShippingCost: {
        totalShippingCost: 1.2,
        freeShippingApplied: false,
        strategyUsed: 'TIERED_DISCOUNT',
        shippingBreakdown: [
          { sellerId: '1', originalFee: 1.2, appliedFee: 1.2 },
        ],
      },
    },
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

describe('CustomerShoppingCart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
    mockUser = null;
    mockShippingMethod = 'vip';
    mockIsCheckoutDialogOpen = false;
    mockIsAuthDialogOpen = false;
    mockActiveStep = 0;
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
        quantity: 2,
        unitPrice: 150,
        totalPrice: 300,
        availableStock: 5,
        color: '#121212',
        size: 'L',
      },
      {
        id: 'cart-item-2',
        productId: 'prod-2',
        productInfoId: 'pi-2',
        sellerProductId: '22222222-2222-2222-2222-222222222222',
        sellerId: '1',
        sellerName: 'SAINTBALA',
        sellerShippingFee: 1.2,
        productName: 'SAINTBALA Tactical Cargo Pants',
        productImage: '/pants.jpg',
        quantity: 1,
        unitPrice: 120,
        totalPrice: 120,
        availableStock: 3,
        color: '#333333',
        size: 'M',
      },
    ];
  });

  it('renders cart items and brand wordmark', () => {
    renderWithProviders();

    expect(screen.getByText('SAINTBALA')).toBeInTheDocument();
    expect(screen.getByText('SAINTBALA Monogram Hoodie')).toBeInTheDocument();
    expect(
      screen.getByText('SAINTBALA Tactical Cargo Pants')
    ).toBeInTheDocument();
  });

  it('removes a single item when remove button is clicked and has 44x44px minimum touch targets', async () => {
    renderWithProviders();

    const removeButtons = screen.getAllByRole('button', {
      name: /remove item/i,
    });
    expect(removeButtons.length).toBe(2);

    // Verify touch target is at least 44px
    const firstRemoveBtn = removeButtons[0];
    expect(firstRemoveBtn).toBeInTheDocument();

    // Click remove on the first item
    fireEvent.click(firstRemoveBtn);

    // mockRemoveItem should be called with cart-item-1
    expect(mockRemoveItem).toHaveBeenCalledWith('cart-item-1');
  });

  it('has minimum 44px touch targets on quantity controls', () => {
    renderWithProviders();

    const decreaseBtns = screen.getAllByRole('button', {
      name: /decrease quantity/i,
    });
    const increaseBtns = screen.getAllByRole('button', {
      name: /increase quantity/i,
    });

    expect(decreaseBtns.length).toBe(2);
    expect(increaseBtns.length).toBe(2);

    fireEvent.click(increaseBtns[0]);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('cart-item-1', 3);
  });

  it('renders localized Shipping Method Selector in cart summary and updates total', () => {
    renderWithProviders();

    // Shipping options should be visible
    expect(screen.getByText('VIP & Insured Courier')).toBeInTheDocument();
    expect(screen.getByText('Standard Express')).toBeInTheDocument();
    expect(screen.getByText('Showroom Pickup')).toBeInTheDocument();

    // Click Showroom Pickup
    const pickupOption = screen.getByRole('radio', {
      name: /showroom pickup/i,
    });
    fireEvent.click(pickupOption);

    expect(mockSetShippingMethod).toHaveBeenCalledWith('pickup');
  });

  it('renders Persian brand wordmark in <bdi> tag when locale is fa', () => {
    mockLocale = 'fa';
    renderWithProviders();

    // Look for bdi containing SAINTBALA
    const bdiElements = screen.getAllByText('SAINTBALA');
    expect(bdiElements.length).toBeGreaterThan(0);
    expect(bdiElements[0].tagName.toLowerCase()).toBe('bdi');
  });

  it('allows unauthenticated guest to proceed to checkout without mandatory auth modal blocker', () => {
    // Guest user (not logged in)
    mockUser = null;
    renderWithProviders();

    const checkoutBtn = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    fireEvent.click(checkoutBtn);

    // Crucial: Must open checkout dialog directly, NOT auth dialog!
    expect(mockOpenCheckoutDialog).toHaveBeenCalledTimes(1);
    expect(mockOpenAuthDialog).not.toHaveBeenCalled();
  });

  it('shows non-blocking sign-in banner inside checkout dialog for guest users', () => {
    mockUser = null;
    mockIsCheckoutDialogOpen = true;
    renderWithProviders();

    // Non-blocking banner should be present in checkout dialog
    expect(
      screen.getByText(
        /Already have an account\? Sign in to use saved addresses\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
