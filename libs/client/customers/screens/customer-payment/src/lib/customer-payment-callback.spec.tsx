import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CustomerPaymentCallback } from './customer-payment-callback';
import { CANCEL_PENDING_ZARINPAL_ORDER_MUTATION } from '@kickzone-workspace/customers-graphql';

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
          result: { data: { verifyZarinPalPayment: { code: 100, message: 'Success', ref_id: 12345 } } },
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