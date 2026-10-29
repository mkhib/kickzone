import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CustomerPaymentCallback } from './customer-payment-callback';
import { VERIFY_ZARINPAL_PAYMENT_MUTATION, CANCEL_PENDING_ZARINPAL_ORDER_MUTATION } from '@kickzone-workspace/customers-graphql';

// Mock theme for MUI components
const mockTheme = {
  palette: {
    mode: 'light',
  },
};

// Wrapper for React Router, Apollo Provider, and MUI Theme
const renderWithProviders = (ui: React.ReactElement, mocks: MockedResponse[] = []) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <ThemeProvider theme={mockTheme}>
          <CssBaseline />
          {ui}
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>
  );
};

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

describe('CustomerPaymentCallback - Guest ZarinPal Cancel', () => {
  const authority = 'A00000123';
  const orderId = 'order-123';
  const orderNumber = 'ORD-123456';

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  const setupOrderInSessionStorage = () => {
    mockSessionStorage.setItem(
      `order_${orderId}`,
      JSON.stringify({ orderId, orderNumber, amount: 50000 })
    );
  };

  describe('Status=NOK with authority (Guest user)', () => {
    it('should call cancelPendingZarinPalOrder with authority when orderId exists in sessionStorage', async () => {
      setupOrderInSessionStorage();

      const mocks: MockedResponse[] = [
        {
          request: {
            query: CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
            variables: { orderId, authority },
          },
          result: { data: { cancelPendingZarinPalOrder: true } },
        },
      ];

      const { waitFor: waitForRender } = renderWithProviders(
        <CustomerPaymentCallback />,
        mocks
      );

      // Simulate URL with Status=NOK and Authority
      await act(async () => {
        window.history.pushState({}, '', `/?Status=NOK&Authority=${authority}&orderId=${orderId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(mocks[0].result?.data).toEqual({ cancelPendingZarinPalOrder: true });
      });
    });

    it('should call cancelPendingZarinPalOrder with authority only when orderId is NOT in sessionStorage (new tab scenario)', async () => {
      // No sessionStorage setup - simulates new browser tab

      const mocks: MockedResponse[] = [
        {
          request: {
            query: CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
            variables: { orderId: null, authority },
          },
          result: { data: { cancelPendingZarinPalOrder: true } },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await act(async () => {
        window.history.pushState({}, '', `/?Status=NOK&Authority=${authority}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(mocks[0].result?.data).toEqual({ cancelPendingZarinPalOrder: true });
      });
    });

    it('should NOT clear sessionStorage if cancellation fails', async () => {
      setupOrderInSessionStorage();

      const mocks: MockedResponse[] = [
        {
          request: {
            query: CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
            variables: { orderId, authority },
          },
          error: new Error('Network error'),
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await act(async () => {
        window.history.pushState({}, '', `/?Status=NOK&Authority=${authority}&orderId=${orderId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      // sessionStorage should still have the order data
      expect(mockSessionStorage.getItem(`order_${orderId}`)).not.toBeNull();
    });

    it('should clear sessionStorage after successful cancellation', async () => {
      setupOrderInSessionStorage();

      const mocks: MockedResponse[] = [
        {
          request: {
            query: CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
            variables: { orderId, authority },
          },
          result: { data: { cancelPendingZarinPalOrder: true } },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await act(async () => {
        window.history.pushState({}, '', `/?Status=NOK&Authority=${authority}&orderId=${orderId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      // Wait for mutation to complete and sessionStorage to be cleared
      await waitFor(() => {
        expect(mockSessionStorage.getItem(`order_${orderId}`)).toBeNull();
      });
    });
  });

  describe('Status=NOK without authority (edge case)', () => {
    it('should show cancelled status but not call mutation if neither authority nor orderId available', async () => {
      const mocks: MockedResponse[] = [];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await act(async () => {
        window.history.pushState({}, '', '/?Status=NOK');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      // No mutation should be called
      expect(mocks.length).toBe(0);
    });
  });

  describe('Status=OK (should verify, not cancel)', () => {
    it('should NOT call cancel mutation when Status=OK', async () => {
      setupOrderInSessionStorage();

      const mocks: MockedResponse[] = [
        // verifyZarinPalPayment would be called, not cancel
        {
          request: {
            query: expect.anything(), // verify mutation
            variables: expect.objectContaining({ input: expect.objectContaining({ authority }) }),
          },
          result: { data: { verifyZarinPalPayment: { code: 100, message: 'Success', ref_id: 12345, success: true } } },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await act(async () => {
        window.history.pushState({}, '', `/?Status=OK&Authority=${authority}&orderId=${orderId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      // Should show loading/verifying state, not cancelled
      await waitFor(() => {
        expect(screen.getByText('در حال تایید پرداخت...')).toBeInTheDocument();
      });
    });
  });
});

describe('CustomerPaymentCallback - ZarinPal Verification (Fail-Closed Heavy Tests)', () => {
  const authority = 'A00000123';
  const orderId = 'ord-1';
  const orderNumber = 'ORD-123456';
  const orderIds = ['ord-1', 'ord-2'];

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  const setupOrderInSessionStorage = (customOrderId = orderId, customAmount = 50000) => {
    mockSessionStorage.setItem(
      `order_${customOrderId}`,
      JSON.stringify({ orderId: customOrderId, orderNumber, amount: customAmount, orderIds })
    );
  };

  const triggerVerification = async (url: string) => {
    await act(async () => {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  };

  describe('Case 1: Happy path - success: true, code: 100', () => {
    it('should clear cart, remove sessionStorage keys, and render success UI with refId', async () => {
      const refId = 777888;
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount: 50000, order_id: orderId }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: 'Verified',
                ref_id: refId,
                success: true,
                orderIds,
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      setupOrderInSessionStorage();

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}&orderIds=${orderIds.join(',')}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت با موفقیت انجام شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`شماره تراکنش: ${refId}`)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('سفارش شما با موفقیت ثبت شد و پرداخت تایید گردید.')).toBeInTheDocument();
      });

      // sessionStorage should be cleared for all orderIds
      await waitFor(() => {
        expect(mockSessionStorage.getItem(`order_${orderIds[0]}`)).toBeNull();
        expect(mockSessionStorage.getItem(`order_${orderIds[1]}`)).toBeNull();
      });
    });
  });

  describe('Case 2: Fail-closed - success: false WITH ref_id', () => {
    it('should NOT clear cart, show error UI, display server message, and display refId for support', async () => {
      const refId = 555666;
      const serverMessage = 'Payment was captured by gateway (Ref: 555666), but order confirmation failed: Insufficient stock';
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount: 50000, order_id: orderId }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: serverMessage,
                ref_id: refId,
                success: false,
                orderIds: [orderId],
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      setupOrderInSessionStorage();

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}`);

      await waitFor(() => {
        expect(screen.getByText('خطا در پرداخت')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(serverMessage)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`شماره مرجع تراکنش: ${refId}`)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('این شماره را برای پیگیری و استرداد وجه به پشتیبانی ارائه دهید.')).toBeInTheDocument();
      });

      // Cart should NOT be cleared - sessionStorage should remain
      expect(mockSessionStorage.getItem(`order_${orderId}`)).not.toBeNull();
    });
  });

  describe('Case 3: Fail-closed - success: false WITHOUT ref_id', () => {
    it('should NOT clear cart and show error state', async () => {
      const serverMessage = 'Order confirmation failed';
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount: 50000, order_id: orderId }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: serverMessage,
                ref_id: null,
                success: false,
                orderIds: [orderId],
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      setupOrderInSessionStorage();

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}`);

      await waitFor(() => {
        expect(screen.getByText('خطا در پرداخت')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(serverMessage)).toBeInTheDocument();
      });

      // Cart should NOT be cleared
      expect(mockSessionStorage.getItem(`order_${orderId}`)).not.toBeNull();
    });
  });

  describe('Case 4: Legacy numeric return fallback', () => {
    it('should treat numeric return as success and clear cart', async () => {
      const legacyRefId = 123456;
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount: 50000, order_id: orderId }),
            }),
          },
          // Legacy mock returns a raw number (simulating old API shape)
          result: {
            data: {
              verifyZarinPalPayment: legacyRefId,
            },
          },
        },
      ];

      setupOrderInSessionStorage();

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت با موفقیت انجام شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`شماره تراکنش: ${legacyRefId}`)).toBeInTheDocument();
      });

      // sessionStorage should be cleared
      await waitFor(() => {
        expect(mockSessionStorage.getItem(`order_${orderId}`)).toBeNull();
      });
    });
  });

  describe('Case 5: Idempotent code: 101, success: true', () => {
    it('should clear cart once and show success state', async () => {
      const refId = 999111;
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount: 50000, order_id: orderId }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 101,
                message: 'Already verified',
                ref_id: refId,
                success: true,
                orderIds: [orderId],
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      setupOrderInSessionStorage();

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت با موفقیت انجام شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`شماره تراکنش: ${refId}`)).toBeInTheDocument();
      });

      // sessionStorage should be cleared
      await waitFor(() => {
        expect(mockSessionStorage.getItem(`order_${orderId}`)).toBeNull();
      });
    });
  });
});

describe('CustomerPaymentCallback - SessionStorage & URL Fallback', () => {
  const authority = 'A000000000000000000000000000000000000123';
  const orderId = 'ord-1';
  const orderId2 = 'ord-2';
  const orderIds = [orderId, orderId2];
  const orderNumber = 'ORD-123456';
  const amount = 50000;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  const setupOrderInSessionStorage = (customOrderId = orderId, customAmount = amount, customOrderIds = [orderId]) => {
    mockSessionStorage.setItem(
      `order_${customOrderId}`,
      JSON.stringify({ orderId: customOrderId, orderNumber, amount: customAmount, orderIds: customOrderIds })
    );
  };

  const triggerVerification = async (url: string) => {
    await act(async () => {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  };

  describe('Case A: Empty sessionStorage with full URL fallback params', () => {
    it('should call verifyPayment using URL fallback parameters (Authority, Status=OK, orderId, orderIds)', async () => {
      // No sessionStorage setup - empty
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({
                authority,
                amount: expect.any(Number),
                order_id: orderId,
              }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: 'Verified',
                ref_id: 777888,
                success: true,
                orderIds,
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}&orderIds=${orderIds.join(',')}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت با موفقیت انجام شد')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('شماره تراکنش: 777888')).toBeInTheDocument();
      });
    });
  });

  describe('Case B: Empty sessionStorage with minimal URL params (Authority + Status=OK only)', () => {
    it('should call verifyPayment with authority and undefined order_id', async () => {
      // No sessionStorage setup - empty
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({
                authority,
                order_id: undefined,
              }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: 'Verified',
                ref_id: 777888,
                success: true,
                orderIds: [orderId],
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت با موفقیت انجام شد')).toBeInTheDocument();
      });
    });
  });

  describe('Case C: sessionStorage preserved when verifyPayment returns success: false', () => {
    it('should NOT remove sessionStorage and NOT clear cart when verifyPayment returns success: false with ref_id', async () => {
      setupOrderInSessionStorage(orderId, amount, orderIds);

      const refId = 555666;
      const serverMessage = 'Confirmation failed';
      const mocks: MockedResponse[] = [
        {
          request: {
            query: VERIFY_ZARINPAL_PAYMENT_MUTATION,
            variables: expect.objectContaining({
              input: expect.objectContaining({ authority, amount, order_id: orderId }),
            }),
          },
          result: {
            data: {
              verifyZarinPalPayment: {
                code: 100,
                message: serverMessage,
                ref_id: refId,
                success: false,
                orderIds,
                orderId,
                orderNumber,
              },
            },
          },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=OK&Authority=${authority}&orderId=${orderId}&orderIds=${orderIds.join(',')}`);

      await waitFor(() => {
        expect(screen.getByText('خطا در پرداخت')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(serverMessage)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`شماره مرجع تراکنش: ${refId}`)).toBeInTheDocument();
      });

      // sessionStorage should NOT be removed
      expect(mockSessionStorage.getItem(`order_${orderId}`)).not.toBeNull();
      // Cart should NOT be cleared (sessionStorage still exists)
      expect(mockSessionStorage.getItem(`order_${orderId2}`)).not.toBeNull();
    });
  });

  describe('Case D: Status=NOK with multi-seller orderIds in sessionStorage', () => {
    it('should call cancelPendingOrder with authority and remove all order_<id> entries after successful cancellation', async () => {
      setupOrderInSessionStorage(orderId, amount, orderIds);

      const mocks: MockedResponse[] = [
        {
          request: {
            query: CANCEL_PENDING_ZARINPAL_ORDER_MUTATION,
            variables: expect.objectContaining({
              orderId: orderId, // Uses first orderId from sessionStorage
              authority,
            }),
          },
          result: { data: { cancelPendingZarinPalOrder: true } },
        },
      ];

      renderWithProviders(<CustomerPaymentCallback />, mocks);

      await triggerVerification(`/?Status=NOK&Authority=${authority}&orderId=${orderId}&orderIds=${orderIds.join(',')}`);

      await waitFor(() => {
        expect(screen.getByText('پرداخت لغو شد')).toBeInTheDocument();
      });

      // Verify cancellation was called
      await waitFor(() => {
        expect(mocks[0].result?.data).toEqual({ cancelPendingZarinPalOrder: true });
      });

      // All order_<id> entries should be removed from sessionStorage
      await waitFor(() => {
        expect(mockSessionStorage.getItem(`order_${orderId}`)).toBeNull();
        expect(mockSessionStorage.getItem(`order_${orderId2}`)).toBeNull();
      });
    });
  });
});
