import { useState, useCallback } from 'react';
import {
  requestZarinPalPayment,
  verifyZarinPalPayment,
  getZarinPalGatewayUrl,
  getZarinPalErrorMessage,
  type ZarinPalPaymentRequest,
  type ZarinPalVerificationRequest,
} from './zarinpal-payment-service';

export interface UseZarinPalPaymentOptions {
  onSuccess?: (refId: number) => void;
  onError?: (error: string) => void;
}

export interface UseZarinPalPaymentReturn {
  isRequesting: boolean;
  isVerifying: boolean;
  error: string | null;
  requestPayment: (
    request: Omit<ZarinPalPaymentRequest, 'merchant_id'>
  ) => Promise<string | null>; // Returns authority or null on error
  verifyPayment: (
    request: Omit<ZarinPalVerificationRequest, 'merchant_id'>
  ) => Promise<number | null>; // Returns refId or null on error
  redirectToGateway: (authority: string) => void;
  clearError: () => void;
}

/**
 * React hook for ZarinPal payment integration
 */
export function useZarinPalPayment(
  options?: UseZarinPalPaymentOptions
): UseZarinPalPaymentReturn {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPayment = useCallback(
    async (
      request: Omit<ZarinPalPaymentRequest, 'merchant_id'>
    ): Promise<string | null> => {
      setIsRequesting(true);
      setError(null);

      try {
        const response = await requestZarinPalPayment(request);

        if (response.data.code === 100 && response.data.authority) {
          return response.data.authority;
        } else {
          const errorMessage = getZarinPalErrorMessage(response.data.code);
          setError(errorMessage);
          options?.onError?.(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'خطا در درخواست پرداخت';
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return null;
      } finally {
        setIsRequesting(false);
      }
    },
    [options]
  );

  const verifyPayment = useCallback(
    async (
      request: Omit<ZarinPalVerificationRequest, 'merchant_id'>
    ): Promise<number | null> => {
      setIsVerifying(true);
      setError(null);

      try {
        const response = await verifyZarinPalPayment(request);

        // Code 100 means successful payment
        // Code 101 means payment was already verified
        if (
          (response.data.code === 100 || response.data.code === 101) &&
          response.data.ref_id
        ) {
          options?.onSuccess?.(response.data.ref_id);
          return response.data.ref_id;
        } else {
          const errorMessage = getZarinPalErrorMessage(response.data.code);
          setError(errorMessage);
          options?.onError?.(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'خطا در تایید پرداخت';
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return null;
      } finally {
        setIsVerifying(false);
      }
    },
    [options]
  );

  const redirectToGateway = useCallback((authority: string) => {
    const gatewayUrl = getZarinPalGatewayUrl(authority);
    window.location.href = gatewayUrl;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isRequesting,
    isVerifying,
    error,
    requestPayment,
    verifyPayment,
    redirectToGateway,
    clearError,
  };
}
