import { useMemo } from 'react';
import { useExchangeRate } from './useExchangeRate';

interface UseConvertPriceOptions {
  amount: number;
  fromCurrency?: string;
  toCurrency?: string;
}

/**
 * Hook to convert a price from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - Source currency code (default: 'USD')
 * @param toCurrency - Target currency code (default: 'USD')
 */
export function useConvertPrice({
  amount,
  fromCurrency = 'USD',
  toCurrency = 'USD',
}: UseConvertPriceOptions) {
  const { rate, loading, error, exchangeRate } = useExchangeRate({
    fromCurrencyCode: fromCurrency,
    toCurrencyCode: toCurrency,
    skip: fromCurrency === toCurrency,
  });

  const convertedAmount = useMemo(() => {
    if (fromCurrency === toCurrency) return amount;
    return amount * rate;
  }, [amount, rate, fromCurrency, toCurrency]);

  const formattedAmount = useMemo(() => {
    const decimalPlaces = exchangeRate?.toCurrency?.decimalPlaces ?? 2;
    return Number(convertedAmount.toFixed(decimalPlaces));
  }, [convertedAmount, exchangeRate]);

  return {
    originalAmount: amount,
    convertedAmount: formattedAmount,
    rate,
    fromCurrency,
    toCurrency,
    symbol: exchangeRate?.toCurrency?.symbol,
    loading,
    error,
  };
}
