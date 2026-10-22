import {
  useCartError,
  useCartItems,
  useCartLoading,
  useCartTotal,
  useClearCart,
  useRemoveItem,
  useUpdateItemQuantity,
} from '@kickzone-workspace/customer-cart-store';
import {
  useIsCheckoutDialogOpen,
  useIsAuthDialogOpen,
  useCheckoutActiveStep,
  useCheckoutShippingMethod,
  useCheckoutShippingInfo,
  useCheckoutValidationErrors,
  useIsCreatingOrder,
  useCreatedOrder,
  usePaymentAuthority,
  useOpenCheckoutDialog,
  useCloseCheckoutDialog,
  useOpenAuthDialog,
  useCloseAuthDialog,
  useSetCheckoutStep,
  useNextCheckoutStep,
  usePrevCheckoutStep,
  useSetShippingMethod,
  useSetShippingInfo,
  useUpdateShippingField,
  useSetValidationErrors,
  useClearAllValidationErrors,
  useSetIsCreatingOrder,
  useSetCreatedOrder,
  useSetPaymentAuthority,
  useResetCheckout,
  type ShippingInfo,
  type ShippingMethod,
} from '@kickzone-workspace/customer-checkout-store';
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
import { parseColorHexes } from '@kickzone-workspace/client-shared-graphql';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import {
  validateShippingInfo,
  toEnglishDigits,
} from '@kickzone-workspace/shipping-validation';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Remove from '@mui/icons-material/Remove';
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LottieEmptyCart } from '@kickzone-workspace/lottie-empty-cart';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import Skeleton from '@mui/material/Skeleton';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import { useEffect, useMemo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { useZarinPalPayment } from '@kickzone-workspace/customer-payment';
import { useConvertPrice } from '@kickzone-workspace/currency-hook';

// Import types from cart store
import type { CartItem } from '@kickzone-workspace/customer-cart-store';

// Utility to convert numbers to locale format (supports Farsi digits while preserving non-numeric strings like apparel sizes)
const formatNumber = (num: number | string, locale: string): string => {
  const n = Number(num);
  if (Number.isNaN(n)) {
    return String(num);
  }
  return n.toLocaleString(locale);
};

const isItemRecommended = (
  item: CartItem & { isRecommended?: boolean; recommended?: boolean }
): boolean => {
  return Boolean(item.isRecommended ?? item.recommended);
};

interface ShippingMethodSelectorProps {
  currentMethod: ShippingMethod;
  onSelect: (method: ShippingMethod) => void;
  vipCost: number;
  expressCost: number;
  pickupCost: number;
  locale: string;
  isDark: boolean;
}

function ShippingMethodSelector({
  currentMethod,
  onSelect,
  vipCost,
  expressCost,
  pickupCost,
  locale,
  isDark,
}: ShippingMethodSelectorProps) {
  const isRTL = locale === 'fa';
  const options: Array<{
    id: ShippingMethod;
    title: string;
    badge?: string;
    description: React.ReactNode;
    cost: number;
  }> = [
    {
      id: 'vip',
      title: isRTL
        ? 'پیک اختصاصی و بیمه مرسوله (VIP)'
        : 'VIP & Insured Courier',
      badge: isRTL ? 'پیشنهادی' : 'RECOMMENDED',
      description: isRTL
        ? 'تحویل اکسپرس در بسته‌بندی لوکس اختصاصی با پوشش کامل خسارت و بیمه'
        : 'White-glove fast delivery, signature luxury packaging & full insurance',
      cost: vipCost,
    },
    {
      id: 'express',
      title: isRTL ? 'ارسال پیشتاز سراسری' : 'Standard Express',
      description: isRTL
        ? 'تحویل مطمئن با پست پیشتاز سراسری طی ۲ الی ۴ روز کاری'
        : 'Reliable nationwide courier delivery within 2–4 business days',
      cost: expressCost,
    },
    {
      id: 'pickup',
      title: isRTL ? 'تحویل حضوری در بوتیک' : 'Showroom Pickup',
      badge: isRTL ? 'رایگان' : 'FREE',
      description: isRTL ? (
        <>
          تحویل حضوری و مستقیم در بوتیک مرکزی <bdi>SAINTBALA</bdi>
        </>
      ) : (
        'Complimentary collection at the SAINTBALA Flagship Boutique'
      ),
      cost: pickupCost,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {options.map((option) => {
        const isSelected = currentMethod === option.id;
        return (
          <Box
            key={option.id}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => onSelect(option.id)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onSelect(option.id);
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.25,
              p: 1.5,
              borderRadius: '16px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              background: isSelected
                ? isDark
                  ? 'linear-gradient(145deg, rgba(197, 184, 154, 0.16) 0%, rgba(181, 171, 147, 0.08) 100%)'
                  : 'linear-gradient(145deg, rgba(230, 215, 185, 0.35) 0%, rgba(245, 238, 222, 0.25) 100%)'
                : isDark
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(0, 0, 0, 0.02)',
              border: isSelected
                ? isDark
                  ? '1.5px solid #c5b89a'
                  : '1.5px solid #7c6d48'
                : '1px solid',
              borderColor: isSelected
                ? isDark
                  ? '#c5b89a'
                  : '#7c6d48'
                : 'divider',
              boxShadow: isSelected
                ? isDark
                  ? '0 6px 18px -4px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 6px 16px -4px rgba(180, 165, 140, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.8)'
                : 'none',
              '&:hover': {
                transform: 'translateY(-1px)',
                borderColor: isDark
                  ? 'rgba(197, 184, 154, 0.6)'
                  : 'rgba(124, 109, 72, 0.6)',
              },
            }}
          >
            <Radio
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              value={option.id}
              size="small"
              sx={{
                p: 0.5,
                color: isDark ? 'rgba(197, 184, 154, 0.6)' : 'rgba(124, 109, 72, 0.6)',
                '&.Mui-checked': {
                  color: isDark ? '#c5b89a' : '#7c6d48',
                },
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  flexWrap: 'wrap',
                  mb: 0.25,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: isDark ? '#f4f4f2' : '#181816',
                    }}
                  >
                    {option.title}
                  </Typography>
                  {option.badge && (
                    <Chip
                      size="small"
                      label={option.badge}
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        borderRadius: '6px',
                        background:
                          option.id === 'vip'
                            ? isDark
                              ? 'rgba(197, 184, 154, 0.25)'
                              : 'rgba(124, 109, 72, 0.2)'
                            : isDark
                            ? 'rgba(76, 175, 80, 0.2)'
                            : 'rgba(56, 142, 60, 0.15)',
                        color:
                          option.id === 'vip'
                            ? isDark
                              ? '#f0e6d2'
                              : '#5a4d2e'
                            : isDark
                            ? '#a5d6a7'
                            : '#2e7d32',
                      }}
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#c5b89a' : '#7c6d48',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {option.cost === 0 ? (
                    locale === 'fa' ? 'رایگان' : 'Free'
                  ) : (
                    <PriceDisplay
                      priceInUSD={option.cost}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  )}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: '0.78rem',
                  lineHeight: 1.4,
                }}
              >
                {option.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export function CustomerShoppingCart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  // Initialize cart service to sync server cart with local store
  // This ensures shipping fees are fetched and synced when user is logged in
  useCustomersCartService();

  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.shoppingCart());
  const { currentLocale } = useLanguageContext();
  const isRTL = currentLocale === 'fa';
  // ZarinPal is Iran-only; use it for Farsi checkout. Other locales place a
  // pending order and are contacted for payment (see checkout.demoCheckout).
  const usesZarinPal = currentLocale === 'fa';
  const steps = [
    LL.checkout.reviewCart(),
    LL.checkout.shippingInformation(),
    LL.checkout.orderSummary(),
    LL.checkout.payment(),
  ];

  // Use checkout store (Zustand)
  const activeStep = useCheckoutActiveStep();
  const shippingMethod = useCheckoutShippingMethod();
  const createdOrder = useCreatedOrder();
  const paymentAuthority = usePaymentAuthority();
  const isCreatingOrder = useIsCreatingOrder();
  const shippingInfo = useCheckoutShippingInfo();
  const validationErrors = useCheckoutValidationErrors();
  const checkoutDialogOpen = useIsCheckoutDialogOpen();
  const authDialogOpen = useIsAuthDialogOpen();

  const openCheckoutDialog = useOpenCheckoutDialog();
  const closeCheckoutDialog = useCloseCheckoutDialog();
  const openAuthDialog = useOpenAuthDialog();
  const closeAuthDialog = useCloseAuthDialog();
  const setActiveStep = useSetCheckoutStep();
  const nextStep = useNextCheckoutStep();
  const prevStep = usePrevCheckoutStep();
  const setShippingMethod = useSetShippingMethod();
  const setShippingInfo = useSetShippingInfo();
  const updateShippingField = useUpdateShippingField();
  const setValidationErrors = useSetValidationErrors();
  const clearAllValidationErrors = useClearAllValidationErrors();
  const setIsCreatingOrder = useSetIsCreatingOrder();
  const setCreatedOrder = useSetCreatedOrder();
  const setPaymentAuthority = useSetPaymentAuthority();
  const resetCheckout = useResetCheckout();

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

  // Base calculated shipping costs (VIP Courier)
  const baseShippingCost = useMemo(() => {
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

    // Fallback: sum all shipping fees
    return fallbackTotal;
  }, [shippingData, sellerShippingFees]);

  const vipShippingCost = baseShippingCost > 0 ? baseShippingCost : 1.2;
  const expressShippingCost = Math.round(vipShippingCost * 0.45 * 100) / 100;
  const pickupShippingCost = 0;

  const totalShippingCost = useMemo(() => {
    if (shippingMethod === 'pickup') {
      return pickupShippingCost;
    }
    if (shippingMethod === 'express') {
      return expressShippingCost;
    }
    return vipShippingCost;
  }, [shippingMethod, pickupShippingCost, expressShippingCost, vipShippingCost]);

  // Create a map of sellerId -> calculated shipping cost for order creation
  const shippingCostsBySeller = useMemo(() => {
    const breakdown =
      shippingData?.calculateShippingCost?.shippingBreakdown || [];
    const map: Record<string, number> = {};
    breakdown.forEach((item) => {
      const baseFee = item.appliedFee || 0;
      map[String(item.sellerId)] =
        shippingMethod === 'pickup'
          ? 0
          : shippingMethod === 'express'
          ? Math.round(baseFee * 0.45 * 100) / 100
          : baseFee;
    });
    // Fallback: use original fees if breakdown not available
    sellerShippingFees.forEach((seller) => {
      if (!(seller.sellerId in map)) {
        const baseFee = seller.shippingFee;
        map[seller.sellerId] =
          shippingMethod === 'pickup'
            ? 0
            : shippingMethod === 'express'
            ? Math.round(baseFee * 0.45 * 100) / 100
            : baseFee;
      }
    });
    return map;
  }, [shippingData, sellerShippingFees, shippingMethod]);

  const grandTotal = cartTotal + totalShippingCost;

  // Convert USD → IRR. Our IRR rates/symbol are stored as Toman (تومان),
  // matching ZarinPal IRT — do not divide by 10 when sending to the gateway.
  const { convertedAmount: totalInToman, loading: conversionLoading } =
    useConvertPrice({
      amount: grandTotal,
      fromCurrency: 'USD',
      toCurrency: 'IRR',
    });

  // Payment hook (Farsi / ZarinPal only)
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
  }, [profileData, user, setShippingInfo]);

  const handleQuantityChange = async (
    itemId: string,
    newQuantity: number,
    availableStock: number
  ) => {
    // Validate positive quantity
    if (newQuantity <= 0) {
      try {
        if (user) {
          await removeFromCartMutation(itemId).catch((err) => {
            console.warn('[Cart] Server removeFromCart failed:', err);
          });
        }
      } catch (err) {
        console.warn('[Cart] Server update failed:', err);
      } finally {
        removeItem(itemId);
        showSnackbar(LL.checkout.itemRemovedMessage(), {
          severity: 'success',
        });
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

  const handleRemoveItem = async (itemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    try {
      // Only call server mutation if user is logged in
      if (user) {
        await removeFromCartMutation(itemId).catch((err) => {
          console.warn('[Cart] Server removeFromCart failed:', err);
        });
      }
    } catch (err) {
      console.warn('[Cart] Server removeFromCart threw:', err);
    } finally {
      removeItem(itemId);
      showSnackbar(LL.checkout.itemRemovedMessage(), {
        severity: 'success',
      });
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
    // Both authenticated users and guests can proceed to checkout
    openCheckoutDialog();
  };

  const handleShippingInfoChange = (field: string, value: string) => {
    const finalValue = field === 'zipCode' ? toEnglishDigits(value) : value;
    updateShippingField(field as keyof ShippingInfo, finalValue);
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
      clearAllValidationErrors();
    }

    // If moving from step 2 (order summary) to step 3 (payment), create order and initiate payment
    if (activeStep === 2) {
      await handleCreateOrderAndInitiatePayment();
      return;
    }

    nextStep();
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
              phone: toEnglishDigits(shippingInfo.customerPhone || ''),
              address: shippingInfo.shippingAddress,
              city: shippingInfo.city,
              state: shippingInfo.state,
              zipCode: toEnglishDigits(shippingInfo.zipCode || ''),
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

      // Process shipping information with a guest session / temporary guest checkout token
      let guestToken =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('guest_checkout_token')
          : null;
      if (!user && !guestToken) {
        guestToken = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('guest_checkout_token', guestToken);
        }
      }

      const orderPromises = Object.entries(itemsBySeller || {}).map(
        ([sellerId, items]) => {
          console.log(
            `[Checkout] 📝 Creating order for seller ${sellerId} with ${items.length} item(s)`
          );
          const orderNotes = shippingInfo.notes
            ? `${shippingInfo.notes}${guestToken ? ` [GuestToken: ${guestToken}]` : ''}`
            : guestToken
            ? `[GuestToken: ${guestToken}]`
            : '';

          return createOrderMutation({
            customerName: shippingInfo.customerName || '',
            customerEmail: shippingInfo.customerEmail || '',
            customerPhone: toEnglishDigits(shippingInfo.customerPhone || ''),
            shippingAddress: shippingInfo.shippingAddress || '',
            city: shippingInfo.city || '',
            state: shippingInfo.state || '',
            zipCode: toEnglishDigits(shippingInfo.zipCode || ''),
            country: shippingInfo.country || '',
            notes: orderNotes,
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

      // Non-Farsi: place pending order and contact customer for payment (no ZarinPal)
      if (!usesZarinPal) {
        try {
          await clearCartMutation();
          clearCartAction();
        } catch (cartError) {
          console.error(
            '[Checkout] Failed to clear cart after order creation:',
            cartError
          );
        }

        setActiveStep(3);
        setIsCreatingOrder(false);
        showSnackbar(LL.checkout.demoCheckout(), { severity: 'success' });
        return;
      }

      // Wait for currency conversion if still loading
      if (conversionLoading) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // IRR amounts in our currency system are already Toman (تومان).
      // ZarinPal `currency: IRT` expects Toman — send the converted amount as-is.
      // Official docs: https://www.zarinpal.com/docs/paymentGateway/moreFeatures/currency.html
      const amountInToman = Math.round(totalInToman);

      console.log(`[Checkout] 💱 Currency conversion:`, {
        amountInUSD: grandTotal,
        amountInToman,
        conversionRate: grandTotal > 0 ? totalInToman / grandTotal : 0,
      });

      // Validate amount is reasonable (not too large or too small)
      if (amountInToman <= 0) {
        throw new Error(
          'Invalid payment amount: amount must be greater than 0'
        );
      }

      if (amountInToman > 100000000) {
        // 100 million Toman
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

      // Request payment from ZarinPal (v4 request.json)
      const authority = await requestPayment({
        amount: amountInToman,
        callback_url: callbackUrl,
        description: `پرداخت سفارش ${firstOrder.orderNumber}`,
        currency: 'IRT', // Toman per ZarinPal currency docs
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
          isGuest: !user,
          guestEmail: shippingInfo.customerEmail || '',
          guestName: shippingInfo.customerName || '',
          guestPhone: shippingInfo.customerPhone || '',
          guestToken: guestToken || undefined,
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

      // Only trigger auth dialog for logged-in user session expiration; never block guest checkout
      if (
        user &&
        (errorMessage.includes('not authenticated') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('User not authenticated') ||
          isAuthGraphQlError)
      ) {
        showSnackbar(
          LL.errors.unauthorized?.() || 'Please log in to proceed with payment',
          {
            severity: 'error',
          }
        );
        openAuthDialog();
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
    prevStep();
  };

  if (cartLoading) {
    return (
      <CustomersLayout>
        <Box
          data-testid="cart-skeleton-loading"
          sx={{
            minHeight: '80vh',
            width: '100%',
            py: { xs: 3, md: 5 },
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          <Skeleton
            variant="text"
            width={220}
            height={48}
            animation="wave"
            sx={{ mb: 4, borderRadius: 2 }}
          />
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, lg: 8 }}>
              {[1, 2].map((key) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    mb: 2.5,
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={110}
                    height={110}
                    animation="wave"
                    sx={{ borderRadius: '16px', flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={28} animation="wave" />
                    <Skeleton variant="text" width="40%" height={22} animation="wave" sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="25%" height={22} animation="wave" sx={{ mt: 2 }} />
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                <Skeleton variant="text" width="50%" height={32} animation="wave" sx={{ mb: 3 }} />
                <Skeleton variant="text" width="100%" height={24} animation="wave" sx={{ mb: 1.5 }} />
                <Skeleton variant="text" width="100%" height={24} animation="wave" sx={{ mb: 1.5 }} />
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="text" width="100%" height={36} animation="wave" sx={{ mb: 3 }} />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={48}
                  animation="wave"
                  sx={{ borderRadius: '9999px' }}
                />
              </Box>
            </Grid>
          </Grid>
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
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '2%', md: '5%' },
            right: { xs: '-8%', md: '10%' },
            width: { xs: 280, sm: 420, md: 500 },
            height: { xs: 280, sm: 420, md: 500 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.15) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.55) 0%, rgba(240, 230, 205, 0.2) 60%, transparent 70%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb 15s ease-in-out infinite alternate',
            '@keyframes floatOrb': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-30px, 35px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '5%', md: '10%' },
            left: { xs: '-8%', md: '8%' },
            width: { xs: 260, sm: 400, md: 460 },
            height: { xs: 260, sm: 400, md: 460 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.12) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.5) 0%, rgba(240, 220, 200, 0.18) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 17s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(35px, -25px) scale(1.06)' },
            },
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1280, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontWeight: 700,
                fontSize: '0.74rem',
                color: isDark ? '#c5b89a' : '#7c6d48',
                mb: 0.5,
              }}
            >
              {isRTL ? <bdi>SAINTBALA</bdi> : 'SAINTBALA'}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.2rem' },
                color: isDark ? '#f4f4f2' : '#181816',
                letterSpacing: '-0.02em',
              }}
            >
              {LL.checkout.shoppingCart()}
            </Typography>
          </Box>

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
              component={RouterLink}
              to={CUSTOMER_ROUTES.SHOP}
              sx={{
                mt: 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
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
                  sx={{
                    mb: 2.5,
                    borderRadius: '24px',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.78) 0%, rgba(20, 20, 18, 0.82) 100%)'
                      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.82) 100%)',
                    border: isDark
                      ? '1px solid rgba(240, 239, 235, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: isDark
                      ? '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
                      : '0 14px 34px -10px rgba(180, 165, 140, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? '0 20px 48px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.18)'
                        : '0 18px 40px -10px rgba(180, 165, 140, 0.28), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
                    },
                  }}
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
                              color: 'text.primary',
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
                                      color: 'text.secondary',
                                      fontWeight: 600,
                                      textTransform: 'uppercase',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {LL.products.color()}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.5,
                                    }}
                                  >
                                    {parseColorHexes(item.color).map((hex) => (
                                      <Box
                                        key={hex}
                                        sx={{
                                          width: 16,
                                          height: 16,
                                          backgroundColor: hex,
                                          borderRadius: '50%',
                                          border: '2px solid white',
                                          boxShadow:
                                            '0 2px 4px rgba(0,0,0,0.2)',
                                        }}
                                      />
                                    ))}
                                  </Box>
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
                                      color: 'text.secondary',
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
                                      color: 'text.primary',
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
                                  ? theme.palette.primary.main
                                  : 'text.primary',
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
                                      ? 'error.main'
                                      : 'warning.main',
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
                            borderTop: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              bgcolor: isDark
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(0,0,0,0.04)',
                              borderRadius: 3,
                              p: 0.5,
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <IconButton
                              size="small"
                              aria-label="Decrease quantity"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleQuantityChange(
                                  item.id,
                                  item.quantity - 1,
                                  item.availableStock
                                );
                              }}
                              sx={{
                                minWidth: 44,
                                minHeight: 44,
                                width: 44,
                                height: 44,
                                color: 'text.primary',
                                '&:hover': {
                                  background: 'action.hover',
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
                                color: 'text.primary',
                              }}
                            >
                              {formatNumber(item.quantity, currentLocale)}
                            </Typography>
                            <IconButton
                              size="small"
                              aria-label="Increase quantity"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleQuantityChange(
                                  item.id,
                                  item.quantity + 1,
                                  item.availableStock
                                );
                              }}
                              disabled={item.quantity >= item.availableStock}
                              sx={{
                                minWidth: 44,
                                minHeight: 44,
                                width: 44,
                                height: 44,
                                color: 'text.primary',
                                '&:hover': {
                                  background: 'action.hover',
                                },
                                '&.Mui-disabled': {
                                  color: 'text.disabled',
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
                                  ? theme.palette.primary.main
                                  : 'text.primary',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={item.totalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>

                            <IconButton
                              aria-label="Remove item"
                              onClick={(e) => handleRemoveItem(item.id, e)}
                              sx={{
                                minWidth: 44,
                                minHeight: 44,
                                width: 44,
                                height: 44,
                                color: 'error.main',
                                '&:hover': {
                                  background: 'action.hover',
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
                  color="error"
                  onClick={handleClearCart}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
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
                    color: 'primary.main',
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
                  top: 24,
                  p: { xs: 2.5, sm: 3.5 },
                  borderRadius: '28px',
                  backdropFilter: 'blur(28px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                  background: isDark
                    ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.85) 0%, rgba(20, 20, 18, 0.88) 100%)'
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.88) 100%)',
                  border: isDark
                    ? '1px solid rgba(240, 239, 235, 0.14)'
                    : '1px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: isDark
                    ? '0 24px 60px -12px rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.14)'
                    : '0 20px 50px -12px rgba(180, 165, 140, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    color: isDark ? '#c5b89a' : '#7c6d48',
                    mb: 0.5,
                  }}
                >
                  CHECKOUT
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.35rem', sm: '1.5rem' },
                    color: isDark ? '#f4f4f2' : '#181816',
                    mb: 2,
                  }}
                >
                  {LL.checkout.orderSummary()}
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Shipping Method Selector */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      color: isDark ? '#c5b89a' : '#7c6d48',
                      mb: 1.25,
                    }}
                  >
                    {currentLocale === 'fa' ? 'انتخاب روش ارسال' : 'SHIPPING METHOD'}
                  </Typography>
                  <ShippingMethodSelector
                    currentMethod={shippingMethod}
                    onSelect={setShippingMethod}
                    vipCost={vipShippingCost}
                    expressCost={expressShippingCost}
                    pickupCost={pickupShippingCost}
                    locale={currentLocale}
                    isDark={isDark}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 1.5,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0, color: 'text.secondary' }}>
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      fontWeight: 600,
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
                    mb: 1.5,
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ whiteSpace: 'nowrap', flexShrink: 0, color: 'text.secondary' }}>
                      {LL.checkout.shipping()}:
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? '#c5b89a' : '#7c6d48',
                        fontWeight: 600,
                      }}
                    >
                      {shippingMethod === 'vip'
                        ? currentLocale === 'fa'
                          ? 'پیک اختصاصی و بیمه (VIP)'
                          : 'VIP Courier & Insurance'
                        : shippingMethod === 'express'
                        ? currentLocale === 'fa'
                          ? 'پیشتاز استاندارد'
                          : 'Standard Express'
                        : currentLocale === 'fa'
                        ? 'تحویل حضوری در بوتیک'
                        : 'Showroom Pickup'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', lg: 'right' },
                      minWidth: 0,
                      fontWeight: 600,
                      flex: { xs: 'none', lg: '1 1 auto' },
                    }}
                  >
                    {totalShippingCost === 0 ? (
                      currentLocale === 'fa' ? 'رایگان' : 'Free'
                    ) : (
                      <PriceDisplay
                        priceInUSD={totalShippingCost}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    )}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Total Grand Box */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: { xs: 'flex-start', lg: 'space-between' },
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    mb: 3,
                    p: 2,
                    borderRadius: '18px',
                    background: isDark
                      ? 'rgba(197, 184, 154, 0.12)'
                      : 'rgba(143, 132, 104, 0.1)',
                    border: isDark
                      ? '1px solid rgba(197, 184, 154, 0.25)'
                      : '1px solid rgba(143, 132, 104, 0.2)',
                    gap: { xs: 0.5, lg: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? '#f4f4f2' : '#181816',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: isDark ? '#c5b89a' : '#7c6d48',
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
                    borderRadius: '9999px',
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px) saturate(190%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                    transition:
                      'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    ...(isDark
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(197, 184, 154, 0.96) 0%, rgba(181, 171, 147, 0.94) 100%)',
                          color: '#121210',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          boxShadow:
                            '0 10px 28px -4px rgba(197, 184, 154, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.6)',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #ffffff 0%, rgba(210, 198, 170, 0.98) 100%)',
                            transform: 'translateY(-2px) scale(1.01)',
                            boxShadow:
                              '0 14px 34px -4px rgba(197, 184, 154, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
                          },
                        }
                      : {
                          background:
                            'linear-gradient(135deg, #1f1f1d 0%, #121210 100%)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          boxShadow:
                            '0 10px 24px -4px rgba(0, 0, 0, 0.28), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #2c2c28 0%, #050505 100%)',
                            transform: 'translateY(-2px) scale(1.01)',
                            boxShadow:
                              '0 14px 30px -4px rgba(0, 0, 0, 0.38), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.5)',
                          },
                        }),
                  }}
                >
                  {LL.checkout.proceedToCheckout()}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        </Box>

        {/* Checkout Dialog */}
        <Dialog
          open={checkoutDialogOpen}
          onClose={closeCheckoutDialog}
          maxWidth="sm"
          fullWidth
          scroll="paper"
          PaperProps={{
            sx: {
              borderRadius: { xs: 3, sm: '28px' },
              m: { xs: 1.5, sm: 2, md: 3 },
              width: { xs: 'calc(100% - 24px)', sm: '100%' },
              maxWidth: { xs: '100%', sm: 560, md: 620 },
              maxHeight: { xs: 'calc(100% - 24px)', sm: 'calc(100% - 64px)' },
              display: 'flex',
              flexDirection: 'column',
              overflowX: 'hidden',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              background: isDark
                ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.94) 0%, rgba(20, 20, 18, 0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 244, 0.92) 100%)',
              border: isDark
                ? '1px solid rgba(240, 239, 235, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: isDark
                ? '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.08)'
                : '0 24px 60px -12px rgba(0, 0, 0, 0.12), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.05rem', sm: '1.25rem' },
              }}
            >
              {steps[activeStep]}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={closeCheckoutDialog}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              px: { xs: 1.5, sm: 3 },
              py: { xs: 1.5, sm: 2.5 },
              overflowX: 'hidden',
            }}
          >
            {/* Guest Checkout Notice / Sign In Trigger */}
            {!user && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  mb: 2.5,
                  borderRadius: 2.5,
                  backgroundColor: isDark
                    ? 'rgba(197, 184, 154, 0.08)'
                    : 'rgba(143, 132, 104, 0.08)',
                  border: '1px solid',
                  borderColor: isDark
                    ? 'rgba(197, 184, 154, 0.25)'
                    : 'rgba(143, 132, 104, 0.2)',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  {currentLocale === 'fa'
                    ? 'حساب کاربری دارید؟ برای دسترسی به آدرس‌های ذخیره‌شده وارد شوید.'
                    : 'Already have an account? Sign in to use saved addresses.'}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    closeCheckoutDialog();
                    navigate(CUSTOMER_ROUTES.LOGIN, {
                      state: { from: CUSTOMER_ROUTES.CART },
                    });
                  }}
                  sx={{
                    ml: 1.5,
                    whiteSpace: 'nowrap',
                    fontWeight: 700,
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    borderColor: isDark ? '#c5b89a' : '#7c6d48',
                    color: isDark ? '#c5b89a' : '#7c6d48',
                    '&:hover': {
                      borderColor: isDark ? '#e2d7be' : '#5d5134',
                      backgroundColor: isDark
                        ? 'rgba(197, 184, 154, 0.1)'
                        : 'rgba(143, 132, 104, 0.08)',
                    },
                  }}
                >
                  {currentLocale === 'fa' ? 'ورود به حساب' : 'Sign In'}
                </Button>
              </Box>
            )}

            {/* Desktop / tablet Stepper */}
            <Stepper
              activeStep={activeStep}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                mb: 3,
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Mobile progress indicator */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="primary.main"
                  sx={{ fontSize: '0.85rem' }}
                >
                  {steps[activeStep]}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {formatNumber(activeStep + 1, currentLocale)} /{' '}
                  {formatNumber(steps.length, currentLocale)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.75, width: '100%' }}>
                {steps.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor:
                        idx <= activeStep
                          ? 'primary.main'
                          : isDark
                          ? 'rgba(255,255,255,0.15)'
                          : 'rgba(0,0,0,0.1)',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                ))}
              </Box>
            </Box>

            {activeStep === 0 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: { xs: 1.5, sm: 2 },
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {LL.checkout.reviewCart()}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item: CartItem) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: { xs: 1.25, sm: 1.75 },
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        gap: 1.5,
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          flex: 1,
                          minWidth: 0,
                          alignItems: 'center',
                        }}
                      >
                        {item.productImage && (
                          <Box
                            component="img"
                            src={item.productImage}
                            alt={item.productName}
                            sx={{
                              width: { xs: 48, sm: 56 },
                              height: { xs: 48, sm: 56 },
                              objectFit: 'cover',
                              borderRadius: 1.5,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.productName}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              flexWrap: 'wrap',
                              mt: 0.25,
                            }}
                          >
                            {item.color && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                  flexShrink: 0,
                                }}
                              >
                                {parseColorHexes(item.color).map((hex) => (
                                  <Box
                                    key={hex}
                                    sx={{
                                      width: 14,
                                      height: 14,
                                      backgroundColor: hex,
                                      borderRadius: '50%',
                                      border: '1.5px solid white',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                    }}
                                  />
                                ))}
                              </Box>
                            )}
                            {item.size && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 500,
                                  px: 0.75,
                                  py: 0.1,
                                  borderRadius: 1,
                                  backgroundColor: isDark
                                    ? 'rgba(255,255,255,0.06)'
                                    : 'rgba(0,0,0,0.04)',
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
                      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                        <Typography variant="body2" fontWeight={700}>
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
                <Divider sx={{ my: 1.5 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {LL.checkout.shipping()} (
                    {shippingMethod === 'vip'
                      ? currentLocale === 'fa'
                        ? 'پیک VIP'
                        : 'VIP Courier'
                      : shippingMethod === 'express'
                      ? currentLocale === 'fa'
                        ? 'پیشتاز'
                        : 'Express'
                      : currentLocale === 'fa'
                      ? 'حضوری'
                      : 'Pickup'}
                    ):
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {totalShippingCost === 0 ? (
                      currentLocale === 'fa' ? 'رایگان' : 'Free'
                    ) : (
                      <PriceDisplay
                        priceInUSD={totalShippingCost}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    )}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="primary.main"
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
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: { xs: 1.5, sm: 2 },
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {LL.checkout.shippingInformation()}
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      size={isMobile ? 'small' : 'medium'}
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
                      required={false}
                      size={isMobile ? 'small' : 'medium'}
                      label={
                        currentLocale === 'fa'
                          ? `${LL.form.email()} (اختیاری)`
                          : `${LL.form.email()} (Optional)`
                      }
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
                      size={isMobile ? 'small' : 'medium'}
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
                      size={isMobile ? 'small' : 'medium'}
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
                      size={isMobile ? 'small' : 'medium'}
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
                      size={isMobile ? 'small' : 'medium'}
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
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      size={isMobile ? 'small' : 'medium'}
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
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      size={isMobile ? 'small' : 'medium'}
                      label={LL.form.zipCode()}
                      value={shippingInfo.zipCode || ''}
                      onChange={(e) =>
                        handleShippingInfoChange('zipCode', toEnglishDigits(e.target.value))
                      }
                      error={!!validationErrors.zipCode}
                      helperText={validationErrors.zipCode}
                      slotProps={{ htmlInput: { dir: 'ltr' } }}
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
                      size={isMobile ? 'small' : 'medium'}
                      label={LL.form.notes()}
                      multiline
                      rows={isMobile ? 2 : 3}
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
                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        color: isDark ? '#c5b89a' : '#7c6d48',
                        mb: 1.25,
                      }}
                    >
                      {currentLocale === 'fa' ? 'انتخاب روش ارسال' : 'SHIPPING METHOD'}
                    </Typography>
                    <ShippingMethodSelector
                      currentMethod={shippingMethod}
                      onSelect={setShippingMethod}
                      vipCost={vipShippingCost}
                      expressCost={expressShippingCost}
                      pickupCost={pickupShippingCost}
                      locale={currentLocale}
                      isDark={isDark}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: { xs: 1.5, sm: 2 },
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {LL.checkout.orderSummary()}
                </Typography>

                {/* Shipping address review card */}
                {shippingInfo.shippingAddress && (
                  <Box
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      mb: 2,
                      borderRadius: 2,
                      backgroundColor: isDark
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(0,0,0,0.02)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.75,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={700}>
                        {LL.checkout.shippingInformation()}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<Edit sx={{ fontSize: '0.9rem !important' }} />}
                        onClick={() => setActiveStep(1)}
                        sx={{
                          minWidth: 'auto',
                          py: 0.25,
                          px: 1,
                          fontSize: '0.8rem',
                        }}
                      >
                        {LL.button.edit()}
                      </Button>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {shippingInfo.customerName} - {shippingInfo.customerPhone}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.25 }}
                    >
                      {[
                        shippingInfo.shippingAddress,
                        shippingInfo.city,
                        shippingInfo.state,
                        shippingInfo.zipCode,
                        shippingInfo.country,
                      ]
                        .filter(Boolean)
                        .join('، ')}
                    </Typography>
                  </Box>
                )}

                {/* Display cart items */}
                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item: CartItem) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        gap: 1.5,
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.productName}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mt: 0.25,
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
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                }}
                              >
                                {parseColorHexes(item.color).map((hex) => (
                                  <Box
                                    key={hex}
                                    sx={{
                                      width: 14,
                                      height: 14,
                                      backgroundColor: hex,
                                      borderRadius: '50%',
                                      border: '1px solid #ccc',
                                    }}
                                  />
                                ))}
                              </Box>
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
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {LL.table.quantity()}:{' '}
                            {formatNumber(item.quantity, currentLocale)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: isItemRecommended(item)
                              ? theme.palette.primary.main
                              : 'text.primary',
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {LL.checkout.subtotal()}:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {LL.checkout.shipping()} (
                    {shippingMethod === 'vip'
                      ? currentLocale === 'fa'
                        ? 'پیک VIP'
                        : 'VIP Courier'
                      : shippingMethod === 'express'
                      ? currentLocale === 'fa'
                        ? 'پیشتاز'
                        : 'Express'
                      : currentLocale === 'fa'
                      ? 'حضوری'
                      : 'Pickup'}
                    ):
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {totalShippingCost === 0 ? (
                      currentLocale === 'fa' ? 'رایگان' : 'Free'
                    ) : (
                      <PriceDisplay
                        priceInUSD={totalShippingCost}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    )}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                  >
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="primary.main"
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
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: { xs: 1.5, sm: 2 },
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
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
                ) : !usesZarinPal && createdOrder ? (
                  <Box>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {LL.checkout.demoCheckout()}
                    </Alert>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {LL.checkout.orderProcessed()}
                    </Alert>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {LL.checkout.orderNumberLabel()}:{' '}
                      {createdOrder.orderNumber}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth={isMobile}
                      size={isMobile ? 'medium' : 'large'}
                      onClick={() => {
                        closeCheckoutDialog();
                        resetCheckout();
                        navigate(CUSTOMER_ROUTES.ORDER_CONFIRMATION, {
                          state: { orderId: createdOrder.id },
                        });
                      }}
                    >
                      {LL.orderConfirmation.viewOrders()}
                    </Button>
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
                      <Typography variant="body2" color="text.secondary">
                        {LL.checkout.orderNumberLabel()}:{' '}
                        {createdOrder?.orderNumber}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
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
                        fullWidth={isMobile}
                        size="large"
                        onClick={() => redirectToGateway(paymentAuthority)}
                        sx={{
                          mt: 1,
                          px: 4,
                          py: 1.25,
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
          <DialogActions
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1.25, sm: 2 },
              borderTop: '1px solid',
              borderColor: 'divider',
              gap: 1,
            }}
          >
            <Button
              size={isMobile ? 'small' : 'medium'}
              onClick={closeCheckoutDialog}
            >
              {LL.button.cancel()}
            </Button>
            {activeStep > 0 && activeStep < 3 && (
              <Button
                size={isMobile ? 'small' : 'medium'}
                onClick={handleBack}
              >
                {LL.button.back()}
              </Button>
            )}
            {activeStep < 2 ? (
              <Button
                variant="contained"
                size={isMobile ? 'small' : 'medium'}
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
                size={isMobile ? 'small' : 'medium'}
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
          onClose={closeAuthDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: { xs: 3, sm: '24px' },
              m: { xs: 1.5, sm: 2 },
              width: { xs: 'calc(100% - 24px)', sm: '100%' },
              maxWidth: 440,
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              background: isDark
                ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.94) 0%, rgba(20, 20, 18, 0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 244, 0.92) 100%)',
              border: isDark
                ? '1px solid rgba(240, 239, 235, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: isDark
                ? '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.08)'
                : '0 24px 60px -12px rgba(0, 0, 0, 0.12), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
            },
          }}
        >
          <DialogTitle
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.05rem', sm: '1.25rem' },
              fontWeight: 700,
            }}
          >
            {LL.checkout.authenticationRequired()}
          </DialogTitle>
          <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {LL.checkout.authenticationMessage()}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
            <Button
              size={isMobile ? 'small' : 'medium'}
              onClick={closeAuthDialog}
            >
              {LL.button.cancel()}
            </Button>
            <Button
              variant="contained"
              size={isMobile ? 'small' : 'medium'}
              onClick={() => {
                closeAuthDialog();
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
