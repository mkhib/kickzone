import { render } from '@testing-library/react';
import { LanguageProvider } from '@kickzone-workspace/shared-i18n';
import { vi } from 'vitest';
import PriceDisplay from './price-display';

vi.mock('@kickzone-workspace/currency-hook', () => ({
  useCurrencyForLocale: () => ({
    currencyCode: 'USD',
    currencySymbol: '$',
    decimalPlaces: 2,
    locale: 'en',
    loading: false,
  }),
  useConvertPrice: () => ({
    convertedAmount: 99.99,
    loading: false,
  }),
}));

describe('PriceDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LanguageProvider>
        <PriceDisplay priceInUSD={99.99} />
      </LanguageProvider>
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement.textContent).not.toContain('...');
  });
});
