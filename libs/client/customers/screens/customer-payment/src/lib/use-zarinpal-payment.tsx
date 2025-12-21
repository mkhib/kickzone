import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import {
  REQUEST_ZARINPAL_PAYMENT_MUTATION,
  VERIFY_ZARINPAL_PAYMENT_MUTATION,
  GET_ZARINPAL_GATEWAY_URL_MUTATION,
} from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
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
  const [error, setError] = useState<string | null>(null);

  const [requestPaymentMutation, { loading: isRequesting }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'requestZarinPalPayment'>,
    KickzoneGraphqlTypes.MutationRequestZarinPalPaymentArgs
  >(REQUEST_ZARINPAL_PAYMENT_MUTATION);

  const [verifyPaymentMutation, { loading: isVerifying }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'verifyZarinPalPayment'>,
    KickzoneGraphqlTypes.MutationVerifyZarinPalPaymentArgs
  >(VERIFY_ZARINPAL_PAYMENT_MUTATION);

  const [getGatewayUrlMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'getZarinPalGatewayUrl'>,
    KickzoneGraphqlTypes.MutationGetZarinPalGatewayUrlArgs
  >(GET_ZARINPAL_GATEWAY_URL_MUTATION);

  const requestPayment = useCallback(
    async (
      request: Omit<ZarinPalPaymentRequest, 'merchant_id'>
    ): Promise<string | null> => {
      setError(null);

      try {
        const { data } = await requestPaymentMutation({
          variables: {
            input: {
              amount: Math.round(request.amount), // Ensure integer for GraphQL Int type
              callback_url: request.callback_url,
              description: request.description,
              currency: request.currency || 'IRT',
              mobile: request.metadata?.mobile,
              email: request.metadata?.email,
              order_id: request.metadata?.order_id,
            },
          },
        });

        const response = data?.requestZarinPalPayment;
        if (!response) {
          throw new Error('No response from payment service');
        }

        if (response.code === 100 && response.authority) {
          return response.authority;
        } else {
          const errorMessage = getZarinPalErrorMessage(response.code);
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
      }
    },
    [options, requestPaymentMutation]
  );

  const verifyPayment = useCallback(
    async (
      request: Omit<ZarinPalVerificationRequest, 'merchant_id'>
    ): Promise<number | null> => {
      setError(null);

      try {
        const { data } = await verifyPaymentMutation({
          variables: {
            input: {
              amount: Math.round(request.amount), // Ensure integer for GraphQL Int type
              authority: request.authority,
            },
          },
        });

        const response = data?.verifyZarinPalPayment;
        if (!response) {
          throw new Error('No response from payment service');
        }

        // Code 100 means successful payment
        // Code 101 means payment was already verified
        if (
          (response.code === 100 || response.code === 101) &&
          response.ref_id
        ) {
          options?.onSuccess?.(response.ref_id);
          return response.ref_id;
        } else {
          const errorMessage = getZarinPalErrorMessage(response.code);
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
      }
    },
    [options, verifyPaymentMutation]
  );

  const redirectToGateway = useCallback(
    async (authority: string) => {
      try {
        const { data } = await getGatewayUrlMutation({
          variables: { authority },
        });

        const url = data?.getZarinPalGatewayUrl?.url;
        if (url) {
          window.location.href = url;
        } else {
          // Fallback - this shouldn't happen but just in case
          throw new Error('No gateway URL returned');
        }
      } catch {
        // Fallback to client-side URL generation if GraphQL fails
        const {
          isZarinPalSandbox,
          ZARINPAL_SANDBOX_GATEWAY_URL,
          ZARINPAL_GATEWAY_URL,
        } = await import('./zarinpal-payment-service');
        const fallbackUrl = isZarinPalSandbox()
          ? `${ZARINPAL_SANDBOX_GATEWAY_URL}/${authority}`
          : `${ZARINPAL_GATEWAY_URL}/${authority}`;
        window.location.href = fallbackUrl;
      }
    },
    [getGatewayUrlMutation]
  );

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
