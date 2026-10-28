import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useZarinPalPayment } from './use-zarinpal-payment';
import { useCustomersCartMutations } from '@kickzone-workspace/customers-cart-hook';
import { useCartStore } from '@kickzone-workspace/customer-cart-store';

/**
 * Payment Callback Screen
 * Handles the return from ZarinPal payment gateway
 * Verifies the payment and redirects accordingly
 *
 * Per ZarinPal docs: only call verify when Status=OK.
 * Status=NOK means the buyer cancelled or the transaction failed.
 */
export function CustomerPaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error' | 'cancelled'
  >('pending');
  const [refId, setRefId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Get payment parameters from URL
  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');
  const orderIdFromUrl = searchParams.get('orderId');
  const orderIdsFromUrl = searchParams.get('orderIds');

  // Get order data from sessionStorage
  const [orderData, setOrderData] = useState<{
    orderId: string;
    orderIds?: string[];
    orderNumber: string;
    amount: number;
  } | null>(null);

  useEffect(() => {
    if (orderIdFromUrl) {
      const stored = sessionStorage.getItem(`order_${orderIdFromUrl}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOrderData(parsed);
          // Clean up sessionStorage
          sessionStorage.removeItem(`order_${orderIdFromUrl}`);
        } catch (e) {
          console.error('Failed to parse order data:', e);
        }
      }
    }
  }, [orderIdFromUrl]);

  // Track if verification has already been attempted to prevent multiple calls
  const verificationAttemptedRef = useRef(false);
  const cartClearedRef = useRef(false);

  // Get cart mutations to clear cart after successful payment
  const { clearCart } = useCustomersCartMutations();
  const clearCartAction = useCartStore((state) => state.clearCart);

  const { verifyPayment, cancelPendingOrder: cancelPendingOrderHook } = useZarinPalPayment({
    onSuccess: async (refId) => {
      // Note: This callback is invoked when the GraphQL mutation succeeds.
      // The actual success/failure is determined by the `success` field in the response.
      // We set a preliminary refId and status here; the component will verify `result.success`
      // after `verifyPayment` returns and update accordingly.
      setRefId(refId);
      setVerificationStatus('success');
    },
    onError: (error) => {
      setErrorMessage(error);
      setVerificationStatus('error');
      // Cart is NOT cleared on error - user can retry payment with same items
    },
  });

  useEffect(() => {
    // Prevent multiple verification attempts
    if (verificationAttemptedRef.current) {
      return;
    }

    // Check if payment was cancelled — do NOT call verify (ZarinPal docs)
    if (status === 'NOK') {
      verificationAttemptedRef.current = true;
      setVerificationStatus('cancelled');
      const orderIdToCancel = orderIdFromUrl || orderData?.orderId;
      const orderIdsToCancel = orderData?.orderIds || (orderIdToCancel ? [orderIdToCancel] : []);
      // Per ZarinPal docs, when Status=NOK, the Authority param is still present
      // Pass authority so guest users without sessionStorage orderId can still cancel
      if (authority || orderIdToCancel) {
        cancelPendingOrderHook({ orderId: orderIdToCancel ?? null, authority: authority! })
          .then((success) => {
            if (!success) {
              console.error('Failed to cancel pending order after NOK - mutation returned false');
            }
            // Clean up sessionStorage for all order IDs after successful cancellation
            for (const oid of orderIdsToCancel) {
              sessionStorage.removeItem(`order_${oid}`);
            }
            if (orderIdFromUrl) {
              sessionStorage.removeItem(`order_${orderIdFromUrl}`);
            }
          })
          .catch((err) => {
            console.error('Failed to cancel pending order after NOK:', err);
            // Don't clear sessionStorage on failure so user can retry
          });
      }
      return;
    }

    // Validate required parameters
    if (!authority || status !== 'OK') {
      setErrorMessage('پارامترهای پرداخت نامعتبر است');
      setVerificationStatus('error');
      verificationAttemptedRef.current = true;
      return;
    }

    // Wait for order data to be loaded
    if (!orderData) {
      return;
    }

    // Mark verification as attempted immediately to prevent race conditions
    verificationAttemptedRef.current = true;

    // Verify payment
    const verify = async () => {
      try {
        const result = await verifyPayment({
          authority,
          amount: orderData.amount,
          order_id: orderData.orderId, // Pass order_id to confirm order and decrease stock
        });

        if (!result) {
          // Error already handled by hook
          return;
        }

        // CRITICAL: Check the `success` field from the resolver response.
        // Only clear cart and show success when `success === true`.
        // If `success === false` (e.g., gateway captured payment but stock reservation failed),
        // do NOT clear cart, show error state, and display the refId for support/refund.
        if (result.success === true) {
          // Clear cart only once after successful payment verification AND order confirmation
          if (!cartClearedRef.current) {
            cartClearedRef.current = true;
            try {
              await clearCart();
              clearCartAction();
            } catch (error) {
              // Log error but don't fail - payment was successful
              console.error('Failed to clear cart after payment:', error);
            }
          }

          // Clean up sessionStorage for all order IDs after successful payment
          if (orderData?.orderIds) {
            for (const oid of orderData.orderIds) {
              sessionStorage.removeItem(`order_${oid}`);
            }
          }
          if (orderIdFromUrl) {
            sessionStorage.removeItem(`order_${orderIdFromUrl}`);
          }

          // onSuccess callback already set status to 'success' and refId
        } else {
          // Payment was captured by gateway (refId exists) but order confirmation failed
          // Do NOT clear cart. Show error with refId for customer support.
          const errorMsg =
            result.message ||
            `Payment was captured by gateway (Ref: ${result.ref_id}), but order confirmation failed. Please contact support with this reference ID.`;
          setErrorMessage(errorMsg);
          setVerificationStatus('error');
          // Ensure refId is set for display
          if (result.ref_id) {
            setRefId(result.ref_id);
          }
        }
      } catch (err) {
        // Error already handled by hook's onError callback
        console.error('Payment verification error:', err);
      }
    };

    verify();
  }, [
    authority,
    status,
    orderData,
    orderIdFromUrl,
    verifyPayment,
    cancelPendingOrderHook,
  ]);

  const handleContinue = () => {
    if (verificationStatus === 'success' && orderData) {
      // Navigate to order confirmation with order ID
      navigate(CUSTOMER_ROUTES.ORDER_CONFIRMATION, {
        state: { orderId: orderData.orderId, refId },
      });
    } else {
      // Navigate to orders page
      navigate(CUSTOMER_ROUTES.ORDERS);
    }
  };

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <CustomersLayout>
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: { xs: 260, sm: 420 },
            height: { xs: 260, sm: 420 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.15) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.5) 0%, rgba(240, 230, 205, 0.18) 60%, transparent 70%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb 14s ease-in-out infinite alternate',
            '@keyframes floatOrb': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-30px, 35px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '12%',
            width: { xs: 240, sm: 380 },
            height: { xs: 240, sm: 380 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.12) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.45) 0%, rgba(240, 220, 200, 0.15) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 16s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(35px, -25px) scale(1.06)' },
            },
          }}
        />

        <GlassmorphismContainer
          wrapperSx={{
            width: '100%',
            maxWidth: 580,
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
            p: 0,
          }}
          containerSx={{
            p: { xs: 3.5, sm: 5 },
            textAlign: 'center',
            borderRadius: '32px !important',
            backdropFilter: 'blur(30px) saturate(190%)',
            WebkitBackdropFilter: 'blur(30px) saturate(190%)',
            background: isDark
              ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.88) 0%, rgba(20, 20, 18, 0.8) 50%, rgba(15, 15, 14, 0.88) 100%)'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(250, 248, 244, 0.85) 50%, rgba(245, 242, 236, 0.9) 100%)',
            border: isDark
              ? '1px solid rgba(240, 239, 235, 0.12)'
              : '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: isDark
              ? '0 30px 70px -15px rgba(0, 0, 0, 0.65), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.08)'
              : '0 25px 60px -15px rgba(180, 160, 130, 0.22), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
          }}
        >
          <Box sx={{ width: '100%' }}>
            {(verificationStatus === 'pending' ||
              (!orderData && status === 'OK')) && (
              <Box sx={{ py: 3 }}>
                <CircularProgress
                  size={64}
                  thickness={3}
                  sx={{
                    mb: 3,
                    color: isDark ? '#c5b89a' : '#7c6d48',
                  }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f4f4f2' : '#181816',
                    fontSize: { xs: '1.25rem', sm: '1.45rem' },
                  }}
                >
                  {!orderData
                    ? 'در حال بارگذاری اطلاعات سفارش...'
                    : 'در حال تایید پرداخت...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  لطفا چند لحظه شکیبا باشید
                </Typography>
              </Box>
            )}

            {verificationStatus === 'success' && (
              <Box>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 76,
                    height: 76,
                    borderRadius: '24px',
                    mb: 2.5,
                    backdropFilter: 'blur(16px)',
                    background: isDark
                      ? 'rgba(197, 184, 154, 0.15)'
                      : 'rgba(143, 132, 104, 0.12)',
                    border: isDark
                      ? '1px solid rgba(197, 184, 154, 0.35)'
                      : '1px solid rgba(143, 132, 104, 0.25)',
                    boxShadow: isDark
                      ? '0 10px 30px rgba(197, 184, 154, 0.25)'
                      : '0 10px 25px rgba(143, 132, 104, 0.15)',
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 44,
                      color: isDark ? '#c5b89a' : '#7c6d48',
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: isDark ? '#f4f4f2' : '#181816',
                    fontSize: { xs: '1.35rem', sm: '1.6rem' },
                    mb: 1,
                  }}
                >
                  پرداخت با موفقیت انجام شد
                </Typography>
                {refId && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 1,
                      borderRadius: '9999px',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.08)'
                        : 'rgba(143, 132, 104, 0.08)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.25)'
                        : '1px solid rgba(143, 132, 104, 0.2)',
                      mt: 1,
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        color: isDark ? '#f4f4f2' : '#181816',
                        letterSpacing: '0.05em',
                      }}
                    >
                      شماره تراکنش: {refId}
                    </Typography>
                  </Box>
                )}
                <Alert
                  severity="success"
                  sx={{
                    mb: 3.5,
                    borderRadius: '20px',
                    backdropFilter: 'blur(20px)',
                    background: isDark
                      ? 'rgba(197, 184, 154, 0.08)'
                      : 'rgba(143, 132, 104, 0.07)',
                    border: isDark
                      ? '1px solid rgba(197, 184, 154, 0.25)'
                      : '1px solid rgba(143, 132, 104, 0.2)',
                    color: isDark ? '#f4f4f2' : '#181816',
                    '& .MuiAlert-icon': {
                      color: isDark ? '#c5b89a' : '#7c6d48',
                    },
                  }}
                >
                  سفارش شما با موفقیت ثبت شد و پرداخت تایید گردید.
                </Alert>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleContinue}
                  sx={{
                    borderRadius: '9999px',
                    py: 1.5,
                    px: 5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'none',
                    ...(isDark
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(197, 184, 154, 0.96) 0%, rgba(181, 171, 147, 0.94) 100%)',
                          color: '#121210',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          boxShadow:
                            '0 10px 28px -4px rgba(197, 184, 154, 0.45)',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #ffffff 0%, rgba(210, 198, 170, 0.98) 100%)',
                            transform: 'translateY(-2px)',
                          },
                        }
                      : {
                          background:
                            'linear-gradient(135deg, #1f1f1d 0%, #121210 100%)',
                          color: '#ffffff',
                          boxShadow: '0 10px 24px -4px rgba(0, 0, 0, 0.28)',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #2c2c28 0%, #050505 100%)',
                            transform: 'translateY(-2px)',
                          },
                        }),
                  }}
                >
                  مشاهده جزییات سفارش
                </Button>
              </Box>
            )}

            {verificationStatus === 'error' && (
              <Box>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 76,
                    height: 76,
                    borderRadius: '24px',
                    mb: 2.5,
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.15)',
                  }}
                >
                  <ErrorOutline sx={{ fontSize: 44, color: '#ef4444' }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: isDark ? '#f4f4f2' : '#181816',
                    fontSize: { xs: '1.35rem', sm: '1.6rem' },
                    mb: 1.5,
                  }}
                >
                  خطا در پرداخت
                </Typography>
                {errorMessage && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2.5,
                      borderRadius: '20px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    {errorMessage}
                  </Alert>
                )}
                {refId && (
                  <Alert
                    severity="info"
                    sx={{
                      mb: 2.5,
                      borderRadius: '20px',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.08)'
                        : 'rgba(143, 132, 104, 0.08)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.25)'
                        : '1px solid rgba(143, 132, 104, 0.2)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                      شماره مرجع تراکنش: {refId}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      این شماره را برای پیگیری و استرداد وجه به پشتیبانی ارائه دهید.
                    </Typography>
                  </Alert>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3.5, lineHeight: 1.8 }}
                >
                  در صورت کسر وجه از حساب شما، مبلغ تا ۷۲ ساعت آینده به حساب شما
                  بازگردانده می‌شود.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.ORDERS}
                  sx={{
                    borderRadius: '9999px',
                    py: 1.5,
                    px: 4.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    background: isDark ? '#c5b89a' : '#1a1a19',
                    color: isDark ? '#121210' : '#ffffff',
                    '&:hover': {
                      background: isDark ? '#ddd4bf' : '#333331',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  بازگشت به سفارشات
                </Button>
              </Box>
            )}

            {verificationStatus === 'cancelled' && (
              <Box>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 76,
                    height: 76,
                    borderRadius: '24px',
                    mb: 2.5,
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    boxShadow: '0 10px 25px rgba(245, 158, 11, 0.15)',
                  }}
                >
                  <ErrorOutline sx={{ fontSize: 44, color: '#f59e0b' }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: isDark ? '#f4f4f2' : '#181816',
                    fontSize: { xs: '1.35rem', sm: '1.6rem' },
                    mb: 1.5,
                  }}
                >
                  پرداخت لغو شد
                </Typography>
                <Alert
                  severity="warning"
                  sx={{
                    mb: 3.5,
                    borderRadius: '20px',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                >
                  شما فرایند پرداخت را لغو کردید. سفارش شما معلق شد.
                </Alert>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.CART}
                  sx={{
                    borderRadius: '9999px',
                    py: 1.5,
                    px: 4.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    background: isDark ? '#c5b89a' : '#1a1a19',
                    color: isDark ? '#121210' : '#ffffff',
                    '&:hover': {
                      background: isDark ? '#ddd4bf' : '#333331',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  بازگشت به سبد خرید
                </Button>
              </Box>
            )}
          </Box>
        </GlassmorphismContainer>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerPaymentCallback;
