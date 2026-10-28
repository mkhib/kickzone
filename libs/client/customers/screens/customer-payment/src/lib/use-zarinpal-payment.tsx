import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import {
  REQUEST_ZARINPAL_PAYMENT_MUTATION,
  VERIFY_ZARINPAL_PAYMENT_MUTATION,
  GET_ZARINPAL_GATEWAY_URL_MUTATION,
  CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
} from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  getZarinPalErrorMessage,
  type ZarinPalPaymentRequest,
  type ZarinPalVerificationRequest,
  type CancelPendingOrderVariables,
} from './zarinpal-payment-service';

export interface UseZarinPalPaymentOptions {
  onSuccess?: (refId: number) => void;
  onError?: (error: string) => void;
}

export interface UseZarinPalPaymentReturn {
  isRequesting: boolean;
  isVerifying: boolean;
  isCancelling: boolean;
  error: string | null;
  requestPayment: (
    request: Omit<ZarinPalPaymentRequest, 'merchant_id'> & {
      orderIds?: string[];
    }
  ) => Promise<string | null>; // Returns authority or null on error
  verifyPayment: (
    request: Omit<ZarinPalVerificationRequest, 'merchant_id'> & {
      order_id?: string;
    }
  ) => Promise<number | null>; // Returns refId or null on error
  cancelPendingOrder: (
    variables: CancelPendingOrderVariables
  ) => Promise<boolean>; // Returns true on success
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

  const [cancelPendingOrderMutation, { loading: isCancelling }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'cancelPendingZarinPalOrder'>,
    KickzoneGraphqlTypes.MutationCancelPendingZarinPalOrderArgs
  >(CANCEL_PENDING_ZARINPAL_ORDER_MUTATION);

  const requestPayment = useCallback(
    async (
      request: Omit<ZarinPalPaymentRequest, 'merchant_id'> & {
        orderIds?: string[];
      }
    ): Promise<string | null> => {
      setError(null);

      console.log('[PaymentHook] 🚀 Requesting payment:', {
        amount: request.amount,
        currency: request.currency,
        callbackUrl: request.callback_url,
        orderId: request.metadata?.order_id,
        orderIds: request.orderIds,
      });

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
              orderIds: request.orderIds,
            } as any, // Type assertion to bypass GraphQL codegen type until regeneration
          },
        });

        const response = data?.requestZarinPalPayment;
        if (!response) {
          throw new Error('No response from payment service');
        }

        if (response.code === 100 && response.authority) {
          console.log(
            `[PaymentHook] ✅ Payment request successful: authority=${response.authority.substring(
              0,
              20
            )}...`
          );
          return response.authority;
        } else {
          const errorMessage = getZarinPalErrorMessage(response.code);
          console.error(
            `[PaymentHook] ❌ Payment request failed: code=${response.code}, message=${response.message}`
          );
          setError(errorMessage);
          options?.onError?.(errorMessage);
          return null;
        }
      } catch (err) {
        // Extract detailed error message from GraphQL error
        let errorMessage = 'خطا در درخواست پرداخت';

        if (err instanceof Error) {
          errorMessage = err.message;

          // Check for GraphQL errors with more details
          if (
            'graphQLErrors' in err &&
            (err as any).graphQLErrors?.length > 0
          ) {
            const graphQLError = (err as any).graphQLErrors[0];
            const detailedMessage =
              graphQLError.message ||
              graphQLError.extensions?.message ||
              err.message;
            errorMessage = detailedMessage;

            console.error('[PaymentHook] ❌ GraphQL error details:', {
              message: graphQLError.message,
              extensions: graphQLError.extensions,
              path: graphQLError.path,
            });
          }

          // Check for network errors
          if ('networkError' in err && (err as any).networkError) {
            const networkError = (err as any).networkError;
            console.error('[PaymentHook] ❌ Network error details:', {
              statusCode: networkError.statusCode,
              statusText: networkError.statusText,
              message: networkError.message,
            });

            if (networkError.statusCode === 403) {
              errorMessage =
                'Payment gateway access denied (403). Please check your payment configuration.';
            }
          }
        }

        console.error('[PaymentHook] ❌ Payment request error:', {
          error: err,
          errorMessage,
          errorType: err instanceof Error ? err.constructor.name : typeof err,
        });

        setError(errorMessage);
        options?.onError?.(errorMessage);
        return null;
      }
    },
    [options, requestPaymentMutation]
  );

  const verifyPayment = useCallback(
    async (
      request: Omit<ZarinPalVerificationRequest, 'merchant_id'> & {
        order_id?: string;
      }
    ): Promise<number | null> => {
      setError(null);

      try {
        const { data } = await verifyPaymentMutation({
          variables: {
            input: {
              amount: Math.round(request.amount), // Ensure integer for GraphQL Int type
              authority: request.authority,
              // order_id is optional and will be in schema after server restart regenerates GraphQL schema
              ...(request.order_id ? { order_id: request.order_id } : {}),
            } as KickzoneGraphqlTypes.ZarinPalVerificationRequestInput & {
              order_id?: string;
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

  const cancelPendingOrder = useCallback(
    async (variables: CancelPendingOrderVariables): Promise<boolean> => {
      setError(null);

      try {
        const { data } = await cancelPendingOrderMutation({
          variables: {
            orderId: variables.orderId,
            authority: variables.authority,
          } as any, // Cast to bypass GraphQL codegen type mismatch
        });

        const result = data?.cancelPendingZarinPalOrder;
        if (result === true) {
          return true;
        } else {
          throw new Error('Cancellation returned false');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'خطا در لغو سفارش معلق';
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return false;
      }
    },
    [options, cancelPendingOrderMutation]
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
    isCancelling,
    error,
    requestPayment,
    verifyPayment,
    cancelPendingOrder,
    redirectToGateway,
    clearError,
  };
}
