import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useExchangeRate } from './useExchangeRate';
import * as apolloReact from '@apollo/client/react';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  gql: vi.fn((strings: TemplateStringsArray) => strings.join('')),
}));

describe('useExchangeRate', () => {
  const fromCurrencyCode = 'USD';
  const toCurrencyCode = 'IRR';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Missing Exchange Rate Test', () => {
    it('should return rate=0 and hasValidRate=false when currentExchangeRate is null', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: null },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.loading).toBe(false);
      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
      expect(result.current.exchangeRate).toBeNull();
    });

    it('should return rate=0 and hasValidRate=false when currentExchangeRate is undefined', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: undefined },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });

    it('should return rate=0 and hasValidRate=false when rate property is missing', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });
  });

  describe('Rate Equal to 1 Test', () => {
    it('should return hasValidRate=false when rate is exactly 1', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 1, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
      expect(result.current.exchangeRate?.rate).toBe(1);
    });

    it('should return hasValidRate=false when rate is 1.0 (float)', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 1.0, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });
  });

  describe('Rate Less Than or Equal to 1 Tests', () => {
    it('should return hasValidRate=false when rate is 0', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 0, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });

    it('should return hasValidRate=false when rate is negative', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: -100, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });

    it('should return hasValidRate=false when rate is 0.5 (less than 1)', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 0.5, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });
  });

  describe('Valid Exchange Rate Tests', () => {
    it('should return rate=65000 and hasValidRate=true for valid rate', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 65000, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(65000);
      expect(result.current.hasValidRate).toBe(true);
      expect(result.current.exchangeRate?.rate).toBe(65000);
    });

    it('should return correct rate for various valid rates', () => {
      const testRates = [50000, 55000, 60000, 65000, 70000, 100000];

      for (const rate of testRates) {
        vi.clearAllMocks();
        vi.mocked(apolloReact.useQuery).mockReturnValue({
          data: { currentExchangeRate: { rate, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
          loading: false,
          error: undefined,
          refetch: vi.fn(),
        } as any);

        const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

        expect(result.current.rate).toBe(rate);
        expect(result.current.hasValidRate).toBe(true);
      }
    });

    it('should handle float rates correctly', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 65000.5, fromCurrency: { code: 'USD' }, toCurrency: { code: 'IRR' } } },
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(65000.5);
      expect(result.current.hasValidRate).toBe(true);
    });
  });

  describe('Loading and Error States', () => {
    it('should return loading=true initially', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: { currentExchangeRate: { rate: 60000 } },
        loading: true,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.loading).toBe(true);
    });

    it('should return error when GraphQL query fails', () => {
      const testError = new Error('Network error');
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: undefined,
        loading: false,
        error: testError,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.error).toBe(testError);
      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });
  });

  describe('Skip Option', () => {
    it('should skip query when skip=true', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: undefined,
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode, skip: true }));

      expect(result.current.loading).toBe(false);
      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });

    it('should skip query when fromCurrencyCode === toCurrencyCode', () => {
      vi.mocked(apolloReact.useQuery).mockReturnValue({
        data: undefined,
        loading: false,
        error: undefined,
        refetch: vi.fn(),
      } as any);

      const { result } = renderHook(() => useExchangeRate({ fromCurrencyCode: 'USD', toCurrencyCode: 'USD' }));

      expect(result.current.loading).toBe(false);
      expect(result.current.rate).toBe(0);
      expect(result.current.hasValidRate).toBe(false);
    });
  });

  describe('Refetch', () => {
    it('should refetch and update rate when refetch is called', async () => {
      // First call returns rate 60000, second call returns rate 65000
      let callCount = 0;
      const mockUseQuery = vi.mocked(apolloReact.useQuery);
      mockUseQuery.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return {
            data: { currentExchangeRate: { rate: 60000 } },
            loading: false,
            error: undefined,
            refetch: vi.fn().mockResolvedValue({ data: { currentExchangeRate: { rate: 65000 } } }),
          } as any;
        }
        return {
          data: { currentExchangeRate: { rate: 65000 } },
          loading: false,
          error: undefined,
          refetch: vi.fn(),
        } as any;
      });

      const { result, rerender } = renderHook(() => useExchangeRate({ fromCurrencyCode, toCurrencyCode }));

      expect(result.current.rate).toBe(60000);

      await act(async () => {
        await result.current.refetch();
      });

      // Re-render to get updated data from the second mock implementation
      rerender();

      await waitFor(() => expect(result.current.rate).toBe(65000));
      expect(result.current.hasValidRate).toBe(true);
    });
  });
});