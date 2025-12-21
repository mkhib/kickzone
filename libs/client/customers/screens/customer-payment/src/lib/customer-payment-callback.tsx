import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
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

  // Get order data from sessionStorage
  const [orderData, setOrderData] = useState<{
    orderId: string;
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

  const { verifyPayment } = useZarinPalPayment({
    onSuccess: async (refId) => {
      setRefId(refId);
      setVerificationStatus('success');

      // Clear cart only once after successful payment verification
      // This ensures items are removed only after payment is confirmed
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

    // Check if payment was cancelled
    if (status === 'NOK') {
      setVerificationStatus('cancelled');
      verificationAttemptedRef.current = true;
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

        // Payment verified successfully
        // The onSuccess callback will be called by the hook
      } catch (err) {
        // Error already handled by hook's onError callback
        console.error('Payment verification error:', err);
      }
    };

    verify();
  }, [authority, status, orderData, verifyPayment]);

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

  return (
    <CustomersLayout>
      <GlassmorphismContainer fullHeight>
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            textAlign: 'center',
          }}
        >
          {(verificationStatus === 'pending' || !orderData) && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5" gutterBottom>
                {!orderData
                  ? 'در حال بارگذاری اطلاعات سفارش...'
                  : 'در حال تایید پرداخت...'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                لطفا صبر کنید
              </Typography>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: '#4CAF50',
                  mb: 3,
                }}
              />
              <Typography variant="h5" gutterBottom color="success.main">
                پرداخت با موفقیت انجام شد
              </Typography>
              {refId && (
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                  شماره تراکنش: {refId}
                </Typography>
              )}
              <Alert severity="success" sx={{ mb: 3 }}>
                سفارش شما با موفقیت ثبت شد و پرداخت انجام شد.
              </Alert>
              <Button
                variant="contained"
                size="large"
                onClick={handleContinue}
                sx={{ mt: 2 }}
              >
                ادامه
              </Button>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <ErrorOutline
                sx={{
                  fontSize: 80,
                  color: '#f44336',
                  mb: 3,
                }}
              />
              <Typography variant="h5" gutterBottom color="error.main">
                خطا در پرداخت
              </Typography>
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {errorMessage}
                </Alert>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                در صورت کسر وجه از حساب شما، مبلغ تا 72 ساعت آینده به حساب شما
                بازگردانده می‌شود.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(CUSTOMER_ROUTES.ORDERS)}
                sx={{ mt: 2 }}
              >
                بازگشت به سفارشات
              </Button>
            </>
          )}

          {verificationStatus === 'cancelled' && (
            <>
              <ErrorOutline
                sx={{
                  fontSize: 80,
                  color: '#ff9800',
                  mb: 3,
                }}
              />
              <Typography variant="h5" gutterBottom color="warning.main">
                پرداخت لغو شد
              </Typography>
              <Alert severity="warning" sx={{ mb: 3 }}>
                شما پرداخت را لغو کردید. سفارش شما ثبت نشده است.
              </Alert>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(CUSTOMER_ROUTES.CART)}
                sx={{ mt: 2 }}
              >
                بازگشت به سبد خرید
              </Button>
            </>
          )}
        </Box>
      </GlassmorphismContainer>
    </CustomersLayout>
  );
}

export default CustomerPaymentCallback;
