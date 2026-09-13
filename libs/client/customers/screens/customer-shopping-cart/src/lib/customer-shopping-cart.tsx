import {
  useCartError,
  useCartItems,
  useCartLoading,
  useCartTotal,
  useClearCart,
  useRemoveItem,
  useUpdateItemQuantity,
} from '@kickzone-workspace/customer-cart-store';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCustomersCartMutations } from '@kickzone-workspace/customers-cart-hook';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
  CALCULATE_SHIPPING_COST_QUERY,
} from '@kickzone-workspace/customers-graphql';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import {
  validateShippingInfo,
  type ShippingInfoFormData,
} from '@kickzone-workspace/shipping-validation';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Remove from '@mui/icons-material/Remove';
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LottieEmptyCart } from '@kickzone-workspace/lottie-empty-cart';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { useZarinPalPayment } from '@kickzone-workspace/customer-payment';
import { useConvertPrice } from '@kickzone-workspace/currency-hook';

// Import types from cart store
import type { CartItem } from '@kickzone-workspace/customer-cart-store';

// Utility to convert numbers to locale format (supports Farsi digits)
const formatNumber = (num: number | string, locale: string): string => {
  return Number(num).toLocaleString(locale);
};

const CTA_FILL_LIGHT = '#1a1a19';
const CTA_TEXT_LIGHT = '#faf9f7';
const CTA_FILL_DARK = '#c5b89a';
const CTA_TEXT_DARK = '#121210';
const ACCENT_TEXT = '#8f8468';

const isItemRecommended = (
  item: CartItem & { isRecommended?: boolean; recommended?: boolean }
): boolean => {
  return Boolean(item.isRecommended ?? item.recommended);
};

export function CustomerShoppingCart() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const ctaFill = isDark ? CTA_FILL_DARK : CTA_FILL_LIGHT;
  const ctaText = isDark ? CTA_TEXT_DARK : CTA_TEXT_LIGHT;
  // Initialize cart service to sync server cart with local store
  // This ensures shipping fees are fetched and synced when user is logged in
  useCustomersCartService();

  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.shoppingCart());
  const { currentLocale } = useLanguageContext();
  const steps = [
    LL.checkout.reviewCart(),
    LL.checkout.shippingInformation(),
    LL.checkout.orderSummary(),
    LL.checkout.payment(),
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    orderNumber: string;
  } | null>(null);
  const [paymentAuthority, setPaymentAuthority] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<
    Partial<ShippingInfoFormData>
  >({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Use cart store
  const cartItems = useCartItems();
  const cartLoading = useCartLoading();
  const cartError = useCartError();
  const cartTotal = useCartTotal();
  const removeItem = useRemoveItem();
  const updateItemQuantity = useUpdateItemQuantity();
  const clearCartAction = useClearCart();

  // Calculate shipping costs using smart shipping logic
  const sellerShippingFees = useMemo(() => {
    const sellerMap = new Map<string, { fee: number }>();
    cartItems.forEach((item) => {
      if (!sellerMap.has(item.sellerId)) {
        // Use ?? instead of || to handle 0 values correctly
        const fee = item.sellerShippingFee ?? 0;
        sellerMap.set(item.sellerId, {
          fee,
        });
      }
    });
    return Array.from(sellerMap.entries()).map(([sellerId, info]) => ({
      sellerId,
      shippingFee: info.fee,
    }));
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  // Type for shipping calculation query result
  type ShippingCalculationData = {
    calculateShippingCost?: {
      totalShippingCost: number;
      freeShippingApplied: boolean;
      strategyUsed: string;
      shippingBreakdown: Array<{
        sellerId: string;
        originalFee: number;
        appliedFee: number;
      }>;
    };
  };

  // Query shipping calculation
  const { data: shippingData } = useQuery<ShippingCalculationData>(
    CALCULATE_SHIPPING_COST_QUERY,
    {
      variables: {
        cartSubtotal,
        sellerShippingFees,
      },
      skip: sellerShippingFees.length === 0 || cartItems.length === 0,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Get calculated shipping costs
  const totalShippingCost = useMemo(() => {
    const fallbackTotal = sellerShippingFees.reduce(
      (sum, seller) => sum + seller.shippingFee,
      0
    );

    if (shippingData?.calculateShippingCost) {
      const queryTotal =
        shippingData.calculateShippingCost.totalShippingCost ?? 0;
      // Use query result if it's valid (> 0), otherwise use fallback
      return queryTotal > 0 ? queryTotal : fallbackTotal;
    }

    // Fallback: sum all shipping fees (old behavior)
    return fallbackTotal;
  }, [shippingData, sellerShippingFees]);

  // Create a map of sellerId -> calculated shipping cost for order creation
  const shippingCostsBySeller = useMemo(() => {
    const breakdown =
      shippingData?.calculateShippingCost?.shippingBreakdown || [];
    const map: Record<string, number> = {};
    breakdown.forEach((item) => {
      map[String(item.sellerId)] = item.appliedFee || 0;
    });
    // Fallback: use original fees if breakdown not available
    sellerShippingFees.forEach((seller) => {
      if (!(seller.sellerId in map)) {
        map[seller.sellerId] = seller.shippingFee;
      }
    });
    return map;
  }, [shippingData, sellerShippingFees]);

  const grandTotal = cartTotal + totalShippingCost;

  // Convert total to Toman (IRT) for ZarinPal payment
  const { convertedAmount: totalInToman, loading: conversionLoading } =
    useConvertPrice({
      amount: grandTotal,
      fromCurrency: 'USD',
      toCurrency: 'IRR', // ZarinPal uses Toman (IRT), but we store as IRR
    });

  // Payment hook
  const { requestPayment, redirectToGateway } = useZarinPalPayment({
    onError: (error) => {
      showSnackbar(`خطا در پرداخت: ${error}`, { severity: 'error' });
    },
  });

  // Use snackbar for notifications
  const { showSnackbar } = useSnackbar();

  // Use auth context and navigation
  const { user } = useCustomersAuth();
  const navigate = useNavigate();

  // Use custom cart mutations hook
  const {
    updateCartItem: updateCartItemMutation,
    removeFromCart: removeFromCartMutation,
    clearCart: clearCartMutation,
    createOrder: createOrderMutation,
  } = useCustomersCartMutations();

  // Load customer profile
  const { data: profileData } = useQuery<{
    myProfile: {
      id: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  }>(GET_MY_PROFILE, {
    skip: !user,
  });

  const [updateProfileMutation] = useMutation<
    {
      updateMyProfile: {
        id: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
    },
    {
      input: {
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
    }
  >(UPDATE_MY_PROFILE);

  // Load profile data into shipping form when available
  useEffect(() => {
    if (profileData?.myProfile && user) {
      setShippingInfo((prev) => ({
        customerName: user.name || prev.customerName,
        customerEmail: user.email || prev.customerEmail,
        customerPhone: profileData.myProfile.phone || prev.customerPhone,
        shippingAddress: profileData.myProfile.address || prev.shippingAddress,
        city: profileData.myProfile.city || prev.city,
        state: profileData.myProfile.state || prev.state,
        zipCode: profileData.myProfile.zipCode || prev.zipCode,
        country: profileData.myProfile.country || prev.country,
        notes: prev.notes,
      }));
    }
  }, [profileData, user]);

  const handleQuantityChange = async (
    itemId: string,
    newQuantity: number,
    availableStock: number
  ) => {
    // Validate positive quantity
    if (newQuantity <= 0) {
      try {
        // Only call server mutation if user is logged in
        if (user) {
          await removeFromCartMutation(itemId);
        }
        removeItem(itemId);
        showSnackbar(LL.checkout.itemRemovedMessage(), {
          severity: 'success',
        });
      } catch {
        showSnackbar(LL.checkout.removeFailedMessage(), { severity: 'error' });
      }
      return;
    }

    // Validate stock limit
    if (newQuantity > availableStock) {
      showSnackbar(
        `Only ${formatNumber(
          availableStock,
          currentLocale
        )} items available in stock`,
        { severity: 'error' }
      );
      return;
    }

    try {
      // Update local store first for immediate UI feedback
      updateItemQuantity(itemId, newQuantity);

      // Then sync with server if logged in
      if (user) {
        await updateCartItemMutation(itemId, { quantity: newQuantity });
      }

      showSnackbar(LL.checkout.quantityUpdatedMessage(), {
        severity: 'success',
      });
    } catch {
      showSnackbar(LL.checkout.updateFailedMessage(), { severity: 'error' });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Only call server mutation if user is logged in
      if (user) {
        await removeFromCartMutation(itemId);
      }
      removeItem(itemId);
      showSnackbar(LL.checkout.itemRemovedMessage(), {
        severity: 'success',
      });
    } catch {
      showSnackbar(LL.checkout.removeFailedMessage(), { severity: 'error' });
    }
  };

  const handleClearCart = async () => {
    try {
      // Clear server first if logged in
      if (user) {
        await clearCartMutation();
      }

      // Then clear local
      clearCartAction();

      showSnackbar(LL.checkout.cartClearedMessage(), {
        severity: 'success',
      });
    } catch (error) {
      console.error('Clear cart error:', error);
      showSnackbar(LL.checkout.clearFailedMessage(), { severity: 'error' });
    }
  };

  const handleCheckout = () => {
    // Check if user is authenticated
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    setCheckoutDialogOpen(true);
  };

  const handleShippingInfoChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = async () => {
    // If moving from step 1 (shipping info) to step 2 (order summary), validate the form
    if (activeStep === 1) {
      // Validate shipping information using Zod
      const validation = validateShippingInfo(shippingInfo, LL);

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        showSnackbar(LL.errors.missingShippingInfo(), {
          severity: 'error',
        });
        return;
      }

      // Clear any previous validation errors
      setValidationErrors({});
    }

    // If moving from step 2 (order summary) to step 3 (payment), create order and initiate payment
    if (activeStep === 2) {
      await handleCreateOrderAndInitiatePayment();
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleCreateOrderAndInitiatePayment = async () => {
    try {
      console.log('[Checkout] 🛒 Starting order creation and payment process');
      setIsCreatingOrder(true);

      // Validate shipping information
      const validation = validateShippingInfo(shippingInfo, LL);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        showSnackbar(LL.errors.missingShippingInfo(), {
          severity: 'error',
        });
        setIsCreatingOrder(false);
        return;
      }

      // Validate cart items have valid sellerProductId (UUID format)
      const invalidItems = cartItems.filter(
        (item) =>
          !item.sellerProductId ||
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            item.sellerProductId
          )
      );

      if (invalidItems.length > 0) {
        showSnackbar(LL.errors.outdatedCartItems(), {
          severity: 'error',
        });
        setIsCreatingOrder(false);
        return;
      }

      // Save customer profile for future orders
      if (user) {
        await updateProfileMutation({
          variables: {
            input: {
              phone: shippingInfo.customerPhone,
              address: shippingInfo.shippingAddress,
              city: shippingInfo.city,
              state: shippingInfo.state,
              zipCode: shippingInfo.zipCode,
              country: shippingInfo.country,
            },
          },
        });
      }

      // Group items by seller
      const itemsBySeller = cartItems.reduce(
        (acc: Record<string, CartItem[]>, item: CartItem) => {
          if (!acc[item.sellerId]) {
            acc[item.sellerId] = [];
          }
          acc[item.sellerId].push(item);
          return acc;
        },
        {} as Record<string, CartItem[]>
      );

      // Create orders for each seller with calculated shipping costs
      console.log(
        `[Checkout] 📦 Creating ${
          Object.keys(itemsBySeller).length
        } order(s) for ${cartItems.length} item(s)`
      );

      const orderPromises = Object.entries(itemsBySeller || {}).map(
        ([sellerId, items]) => {
          console.log(
            `[Checkout] 📝 Creating order for seller ${sellerId} with ${items.length} item(s)`
          );
          return createOrderMutation({
            customerName: shippingInfo.customerName || '',
            customerEmail: shippingInfo.customerEmail || '',
            customerPhone: shippingInfo.customerPhone || '',
            shippingAddress: shippingInfo.shippingAddress || '',
            city: shippingInfo.city || '',
            state: shippingInfo.state || '',
            zipCode: shippingInfo.zipCode || '',
            country: shippingInfo.country || '',
            notes: shippingInfo.notes || '',
            sellerId: parseInt(sellerId, 10),
            // Pass calculated shipping cost (from smart shipping logic)
            shippingCost: shippingCostsBySeller[sellerId] || 0,
            // Map cart items to order items
            items: items.map((item) => ({
              productId: item.productId,
              sellerProductId: item.sellerProductId,
              productName: item.productName,
              productImage: item.productImage,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
              color: item.color,
              size: item.size,
            })),
          });
        }
      );

      const orderResults = await Promise.all(orderPromises);

      // Get the first order for payment
      const firstOrder = orderResults[0];
      if (!firstOrder) {
        throw new Error('No order was created');
      }

      console.log(`[Checkout] ✅ Order created successfully:`, {
        orderId: firstOrder.id,
        orderNumber: firstOrder.orderNumber,
        totalOrders: orderResults.length,
      });

      setCreatedOrder({
        id: firstOrder.id,
        orderNumber: firstOrder.orderNumber,
      });

      // Wait for currency conversion if still loading
      if (conversionLoading) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Calculate total amount in Toman (IRT) - ZarinPal expects Toman
      // Note: totalInToman is actually in Rials (IRR) from the conversion
      // ZarinPal expects Toman (IRT), where 1 Toman = 10 Rials
      // So we need to divide by 10 to convert Rials to Toman
      const amountInToman = Math.round(totalInToman / 10);

      console.log(`[Checkout] 💱 Currency conversion:`, {
        amountInUSD: grandTotal,
        amountInRials: totalInToman,
        amountInToman, // Final amount for ZarinPal
        conversionRate: totalInToman / grandTotal,
      });

      // Validate amount is reasonable (not too large or too small)
      if (amountInToman <= 0) {
        throw new Error(
          'Invalid payment amount: amount must be greater than 0'
        );
      }

      if (amountInToman > 100000000) {
        // 100 million Toman = ~$2000 USD (at 50k rate)
        console.warn(
          `[Checkout] ⚠️  Very large payment amount: ${amountInToman} Toman (${grandTotal} USD)`
        );
      }

      // Build callback URL with order ID
      const callbackUrl = `${window.location.origin}${CUSTOMER_ROUTES.PAYMENT_CALLBACK}?orderId=${firstOrder.id}`;

      console.log(`[Checkout] 💳 Requesting payment from ZarinPal:`, {
        orderId: firstOrder.id,
        orderNumber: firstOrder.orderNumber,
        amountInToman,
        amountInUSD: grandTotal,
        callbackUrl,
      });

      // Request payment from ZarinPal
      const authority = await requestPayment({
        amount: amountInToman,
        callback_url: callbackUrl,
        description: `پرداخت سفارش ${firstOrder.orderNumber}`,
        currency: 'IRT', // Toman
        metadata: {
          mobile: shippingInfo.customerPhone || undefined,
          email: shippingInfo.customerEmail || undefined,
          order_id: firstOrder.id,
        },
      });

      if (!authority) {
        console.error(
          '[Checkout] ❌ Payment request failed - no authority returned'
        );
        // Error already handled by hook
        setIsCreatingOrder(false);
        return;
      }

      console.log(
        `[Checkout] ✅ Payment authority received: ${authority.substring(
          0,
          20
        )}...`
      );

      setPaymentAuthority(authority);

      // Store order data in sessionStorage for callback
      sessionStorage.setItem(
        `order_${firstOrder.id}`,
        JSON.stringify({
          orderId: firstOrder.id,
          orderNumber: firstOrder.orderNumber,
          amount: amountInToman,
        })
      );

      // NOTE: Cart is NOT cleared here - it will be cleared only after successful payment verification
      // This prevents items from disappearing if payment fails
      // Cart clearing happens in the payment callback after successful verification

      // Move to payment step
      setActiveStep(3);
      setIsCreatingOrder(false);

      // Auto-redirect to payment gateway after a short delay
      console.log('[Checkout] 🔄 Redirecting to payment gateway in 1.5s...');
      setTimeout(() => {
        console.log(
          `[Checkout] 🌐 Redirecting to ZarinPal gateway with authority: ${authority}`
        );
        redirectToGateway(authority);
      }, 1500);
    } catch (error: unknown) {
      console.error('Error creating order:', error);
      const errorMessage = (error as Error).message;

      // Check for authentication errors
      const graphQLErrors =
        typeof error === 'object' && error !== null && 'graphQLErrors' in error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any).graphQLErrors
          : undefined;

      const isAuthGraphQlError =
        Array.isArray(graphQLErrors) &&
        graphQLErrors.some((err: { message?: string }) => {
          const msg = err?.message?.toLowerCase?.() || '';
          return (
            msg.includes('not authenticated') || msg.includes('unauthorized')
          );
        });

      if (
        errorMessage.includes('not authenticated') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('User not authenticated') ||
        isAuthGraphQlError
      ) {
        showSnackbar(
          LL.errors.unauthorized?.() || 'Please log in to proceed with payment',
          {
            severity: 'error',
          }
        );
        setAuthDialogOpen(true);
        setIsCreatingOrder(false);
        return;
      }

      // Check for payment gateway errors (403 from ZarinPal)
      if (
        errorMessage.includes('HTTP error! status: 403') ||
        errorMessage.includes('403')
      ) {
        showSnackbar(
          'Payment gateway error: Please check your payment configuration or try again later',
          {
            severity: 'error',
          }
        );
        setIsCreatingOrder(false);
        return;
      }

      // Check for other specific errors
      if (errorMessage.includes('not found')) {
        showSnackbar(LL.errors.productsNotAvailable(), {
          severity: 'error',
        });
      } else if (errorMessage.includes('Insufficient stock')) {
        showSnackbar(LL.errors.insufficientStock(), {
          severity: 'error',
        });
      } else {
        showSnackbar(
          errorMessage || LL.errors.orderFailed?.() || 'Failed to create order',
          {
            severity: 'error',
          }
        );
      }
      setIsCreatingOrder(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (cartLoading) {
    return (
      <CustomersLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </CustomersLayout>
    );
  }

  if (cartError) {
    return (
      <CustomersLayout>
        <Alert severity="error">Error loading cart: {cartError}</Alert>
      </CustomersLayout>
    );
  }

  const hasItems = cartItems.length > 0;

  return (
    <CustomersLayout>
      <Box
        sx={{
          py: 2,
          px: { xs: 1, md: 2 },
        }}
      >
        <Typography variant="h4" gutterBottom>
          {LL.checkout.shoppingCart()}
        </Typography>

        {!hasItems ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <LottieEmptyCart width={240} height={240} loop />
            <Typography variant="h6" color="text.secondary">
              {LL.checkout.yourCartIsEmpty()}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
              onClick={() => navigate(CUSTOMER_ROUTES.PRODUCTS)}
            >
              {LL.checkout.continueShopping()}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  sx={(theme) => ({
                    mb: 2,
                    borderRadius: 3,
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 8px 20px rgba(0,0,0,0.45)'
                        : '0 4px 12px rgba(0,0,0,0.08)',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, #0e0e12 0%, #14141a 100%)'
                        : 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
                    border:
                      theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 10px 26px rgba(0,0,0,0.55)'
                          : '0 6px 20px rgba(0,0,0,0.12)',
                    },
                  })}
                >
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                        {item.productImage && (
                          <CardMedia
                            component="img"
                            height="100"
                            image={item.productImage}
                            alt={item.productName}
                            sx={{
                              objectFit: 'cover',
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, sm: 9, md: 10 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color:
                                theme.palette.mode === 'dark'
                                  ? '#ffffff'
                                  : '#0f0f0f',
                            }}
                          >
                            {item.productName}
                          </Typography>

                          {(item.color || item.size) && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flexWrap: 'wrap',
                              }}
                            >
                              {item.color && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? '#b8b8b8'
                                          : '#666',
                                      fontWeight: 600,
                                      textTransform: 'uppercase',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {LL.products.color()}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      backgroundColor: item.color,
                                      borderRadius: '50%',
                                      border: '2px solid white',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                  />
                                </Box>
                              )}
                              {item.size && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? '#b8b8b8'
                                          : '#666',
                                      fontWeight: 600,
                                      textTransform: 'uppercase',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {LL.products.size()}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? '#ffffff'
                                          : '#1a1a1a',
                                    }}
                                  >
                                    {formatNumber(item.size, currentLocale)}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: isItemRecommended(item)
                                  ? ACCENT_TEXT
                                  : theme.palette.mode === 'dark'
                                  ? '#ffffff'
                                  : '#0f0f0f',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={item.unitPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>

                            {item.availableStock < 10 && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    item.availableStock < 5
                                      ? '#f5576c'
                                      : '#ff9800',
                                  fontWeight: 600,
                                }}
                              >
                                {formatNumber(
                                  item.availableStock,
                                  currentLocale
                                )}{' '}
                                {LL.products.left()}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                            mt: 2,
                            pt: 2,
                            borderTop: '1px solid rgba(0,0,0,0.08)',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              background:
                                theme.palette.mode === 'dark'
                                  ? '#111114'
                                  : '#111114',
                              borderRadius: 3,
                              p: 0.5,
                              border:
                                theme.palette.mode === 'dark'
                                  ? '1px solid rgba(255,255,255,0.12)'
                                  : '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.quantity - 1,
                                  item.availableStock
                                )
                              }
                              sx={{
                                background: 'transparent',
                                color: '#ffffff',
                                boxShadow: 'none',
                                '&:hover': {
                                  background: 'rgba(255,255,255,0.08)',
                                },
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                minWidth: 40,
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                color: '#ffffff',
                              }}
                            >
                              {formatNumber(item.quantity, currentLocale)}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.quantity + 1,
                                  item.availableStock
                                )
                              }
                              disabled={item.quantity >= item.availableStock}
                              sx={{
                                background: 'transparent',
                                color: '#ffffff',
                                boxShadow: 'none',
                                '&:hover': {
                                  background: 'rgba(255,255,255,0.08)',
                                },
                                '&.Mui-disabled': {
                                  background: 'rgba(255,255,255,0.05)',
                                  opacity: 0.4,
                                },
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 800,
                                color: isItemRecommended(item)
                                  ? ACCENT_TEXT
                                  : theme.palette.mode === 'dark'
                                  ? '#ffffff'
                                  : '#0f0f0f',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={item.totalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>

                            <IconButton
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: '#b45542',
                                '&:hover': {
                                  background: 'rgba(180, 85, 66, 0.12)',
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              ))}

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClearCart}
                  sx={{
                    borderRadius: 3,
                    borderColor: '#f5576c',
                    color: '#f5576c',
                    fontWeight: 600,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#f5576c',
                      background: 'rgba(245, 87, 108, 0.08)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {LL.checkout.clearCart()}
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: ACCENT_TEXT,
                    fontSize: '0.95rem',
                  }}
                >
                  {formatNumber(cartItems.length, currentLocale)}{' '}
                  {LL.table.product()}
                </Typography>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: 'sticky',
                  top: 20,
                  p: 3,
                  borderRadius: 3,
                  border:
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.12)'
                      : '1px solid rgba(0,0,0,0.08)',
                  background: 'transparent',
                  boxShadow: 'none',
                  backdropFilter: 'none',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                  }}
                >
                  {LL.checkout.orderSummary()}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={cartTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                {/* Shipping fee */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {LL.checkout.shipping()}:
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={totalShippingCost}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: ctaFill,
                    color: ctaText,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: ctaText,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: ctaText,
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={grandTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCartCheckout />}
                  onClick={handleCheckout}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: 'none',
                    backgroundColor: ctaFill,
                    color: ctaText,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: isDark ? '#d4c9b0' : '#2e2e2c',
                      boxShadow: 'none',
                      color: ctaText,
                    },
                  }}
                >
                  {LL.checkout.proceedToCheckout()}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Checkout Dialog */}
        <Dialog
          open={checkoutDialogOpen}
          onClose={() => setCheckoutDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{LL.checkout.orderSummary()}</DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.reviewCart()}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {cartItems.map((item: CartItem) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        py: 2,
                        borderBottom: '1px solid #e0e0e0',
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                        {item.productImage && (
                          <Box
                            component="img"
                            src={item.productImage}
                            alt={item.productName}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: 'cover',
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{
                              mb: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {item.productName}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              flexWrap: 'wrap',
                              mt: 0.5,
                            }}
                          >
                            {item.color && (
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: item.color,
                                  borderRadius: '50%',
                                  border: '2px solid white',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                  flexShrink: 0,
                                }}
                              />
                            )}
                            {item.size && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 500,
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  backgroundColor: 'rgba(0,0,0,0.04)',
                                }}
                              >
                                {LL.products.size()}:{' '}
                                {formatNumber(item.size, currentLocale)}
                              </Typography>
                            )}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {LL.table.quantity()}:{' '}
                              {formatNumber(item.quantity, currentLocale)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', ml: 2, flexShrink: 0 }}>
                        <PriceDisplay
                          priceInUSD={item.totalPrice}
                          showSymbol={true}
                          showOriginal={false}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={cartTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                {/* Shipping fee */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {LL.checkout.shipping()}:
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={totalShippingCost}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={grandTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 3,
                  }}
                >
                  {LL.checkout.shippingInformation()}
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.fullName()}
                      value={shippingInfo.customerName || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('customerName', e.target.value)
                      }
                      error={!!validationErrors.customerName}
                      helperText={validationErrors.customerName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.email()}
                      type="email"
                      value={shippingInfo.customerEmail || ''}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerEmail',
                          e.target.value
                        )
                      }
                      error={!!validationErrors.customerEmail}
                      helperText={validationErrors.customerEmail}
                      {...getLtrTextFieldProps({
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.phone()}
                      value={shippingInfo.customerPhone || ''}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerPhone',
                          e.target.value
                        )
                      }
                      error={!!validationErrors.customerPhone}
                      helperText={validationErrors.customerPhone}
                      {...getLtrTextFieldProps({
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.country()}
                      value={shippingInfo.country || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('country', e.target.value)
                      }
                      error={!!validationErrors.country}
                      helperText={validationErrors.country}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.address()}
                      value={shippingInfo.shippingAddress || ''}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'shippingAddress',
                          e.target.value
                        )
                      }
                      error={!!validationErrors.shippingAddress}
                      helperText={validationErrors.shippingAddress}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.city()}
                      value={shippingInfo.city || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('city', e.target.value)
                      }
                      error={!!validationErrors.city}
                      helperText={validationErrors.city}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.state()}
                      value={shippingInfo.state || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('state', e.target.value)
                      }
                      error={!!validationErrors.state}
                      helperText={validationErrors.state}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.zipCode()}
                      value={shippingInfo.zipCode || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('zipCode', e.target.value)
                      }
                      error={!!validationErrors.zipCode}
                      helperText={validationErrors.zipCode}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label={LL.form.notes()}
                      multiline
                      rows={3}
                      value={shippingInfo.notes || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('notes', e.target.value)
                      }
                      error={!!validationErrors.notes}
                      helperText={validationErrors.notes}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.orderSummary()}
                </Typography>

                {/* Display cart items */}
                <Box sx={{ mb: 3 }}>
                  {cartItems.map((item: CartItem) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {item.productName}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mt: 0.5,
                          }}
                        >
                          {item.color && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {LL.products.color()}:
                              </Typography>
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  backgroundColor: item.color,
                                  borderRadius: '50%',
                                  border: '1px solid #ccc',
                                }}
                              />
                            </Box>
                          )}
                          {item.size && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {LL.products.size()}:
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight={500}
                              >
                                {formatNumber(item.size, currentLocale)}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {LL.table.quantity()}:{' '}
                          {formatNumber(item.quantity, currentLocale)}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: isItemRecommended(item)
                              ? ACCENT_TEXT
                              : theme.palette.mode === 'dark'
                              ? '#ffffff'
                              : '#0f0f0f',
                          }}
                        >
                          <PriceDisplay
                            priceInUSD={item.totalPrice}
                            showSymbol={true}
                            showOriginal={false}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Order totals */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={cartTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                {/* Shipping fee */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {LL.checkout.shipping()}:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={totalShippingCost}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 2,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    <PriceDisplay
                      priceInUSD={grandTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.payment()}
                </Typography>
                {isCreatingOrder ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 4,
                    }}
                  >
                    <CircularProgress sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      {LL.checkout.processingOrder()}
                    </Typography>
                  </Box>
                ) : paymentAuthority ? (
                  <Box>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {LL.checkout.orderCreatedRedirecting()}
                    </Alert>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        py: 2,
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        {LL.checkout.orderNumberLabel()}:{' '}
                        {createdOrder?.orderNumber}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {LL.checkout.totalAmountLabel()}:{' '}
                        <PriceDisplay
                          priceInUSD={grandTotal}
                          showSymbol={true}
                          showOriginal={false}
                        />
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => redirectToGateway(paymentAuthority)}
                        sx={{
                          mt: 2,
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {LL.checkout.continueToPaymentGateway()}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Alert severity="error">
                    {LL.checkout.paymentInitializationFailed()}
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCheckoutDialogOpen(false)}>
              {LL.button.cancel()}
            </Button>
            {activeStep > 0 && activeStep < 3 && (
              <Button onClick={handleBack}>{LL.button.back()}</Button>
            )}
            {activeStep < 2 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                {LL.button.next()}
              </Button>
            ) : activeStep === 2 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                loading={isCreatingOrder}
                sx={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                {LL.checkout.proceedToPayment()}
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>

        {/* Authentication Required Dialog */}
        <Dialog
          open={authDialogOpen}
          onClose={() => setAuthDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{LL.checkout.authenticationRequired()}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {LL.checkout.authenticationMessage()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAuthDialogOpen(false)}>
              {LL.button.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setAuthDialogOpen(false);
                navigate(CUSTOMER_ROUTES.LOGIN, {
                  state: { from: CUSTOMER_ROUTES.CART },
                });
              }}
              sx={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              {LL.checkout.loginRegister()}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerShoppingCart;
