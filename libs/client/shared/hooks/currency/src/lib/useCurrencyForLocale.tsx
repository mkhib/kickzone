import { useQuery } from '@apollo/client/react';
import { GET_CURRENCY_PREFERENCE_BY_LOCALE } from '@kickzone-workspace/client-shared-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useLanguageContext } from '@kickzone-workspace/shared-i18n';

/**
 * Hook to get the preferred currency for the current user's locale
 * Falls back to USD if no preference is set
 */
export function useCurrencyForLocale() {
  const { currentLocale } = useLanguageContext();

  const { data, loading, error } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currencyPreferenceByLocale'>,
    KickzoneGraphqlTypes.QueryCurrencyPreferenceByLocaleArgs
  >(GET_CURRENCY_PREFERENCE_BY_LOCALE, {
    variables: { locale: currentLocale },
    fetchPolicy: 'network-only', // Disable cache for debugging
  });

  const currency = data?.currencyPreferenceByLocale?.currency;

  console.log('🌍 useCurrencyForLocale:', {
    currentLocale,
    hasData: !!data,
    hasCurrencyPreference: !!data?.currencyPreferenceByLocale,
    currency,
    loading,
    error: error?.message,
  });

  return {
    currency,
    currencyCode: currency?.code || 'USD',
    currencySymbol: currency?.symbol || '$',
    decimalPlaces: currency?.decimalPlaces ?? 2,
    locale: currentLocale,
    loading,
    error,
  };
}
