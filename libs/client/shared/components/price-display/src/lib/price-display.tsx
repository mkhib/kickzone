import {
  useCurrencyForLocale,
  useConvertPrice,
} from '@kickzone-workspace/currency-hook';
import Skeleton from '@mui/material/Skeleton';

export interface PriceDisplayProps {
  /** Price in USD (base currency) */
  priceInUSD: number;
  /** Additional CSS class */
  className?: string;
  /** Show currency symbol */
  showSymbol?: boolean;
  /** Show original USD price when converted */
  showOriginal?: boolean;
}

/**
 * Smart component that displays prices in the user's preferred currency based on locale
 * - For 'fa' locale: Shows price in Toman (converted from USD)
 * - For other locales: Shows price in USD
 */
export function PriceDisplay({
  priceInUSD,
  className = '',
  showSymbol = true,
  showOriginal = false,
}: PriceDisplayProps) {
  const {
    currencyCode,
    currencySymbol,
    decimalPlaces,
    locale,
    loading: currencyLoading,
  } = useCurrencyForLocale();

  const { convertedAmount, loading: conversionLoading } = useConvertPrice({
    amount: priceInUSD,
    fromCurrency: 'USD',
    toCurrency: currencyCode,
  });

  if (currencyLoading || conversionLoading) {
    return (
      <Skeleton
        component="span"
        variant="text"
        animation="wave"
        width={56}
        sx={{
          display: 'inline-block',
          verticalAlign: 'middle',
          opacity: 0.6,
        }}
        className={className}
        data-testid="price-display-skeleton"
      />
    );
  }

  // Format the number with proper decimal places
  const formattedPrice = convertedAmount.toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  const displayPrice = showSymbol
    ? `${formattedPrice} ${currencySymbol}`
    : formattedPrice;

  return (
    <span className={className}>
      {displayPrice}
      {showOriginal && currencyCode !== 'USD' && (
        <span style={{ fontSize: '0.85em', opacity: 0.7, marginLeft: '0.5em' }}>
          (${priceInUSD})
        </span>
      )}
    </span>
  );
}

export default PriceDisplay;
