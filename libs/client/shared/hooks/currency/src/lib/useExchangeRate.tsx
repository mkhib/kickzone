import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_EXCHANGE_RATE } from '@kickzone-workspace/client-shared-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface UseExchangeRateOptions {
  fromCurrencyCode: string;
  toCurrencyCode: string;
  skip?: boolean;
}

export function useExchangeRate({
  fromCurrencyCode,
  toCurrencyCode,
  skip = false,
}: UseExchangeRateOptions) {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currentExchangeRate'>,
    KickzoneGraphqlTypes.QueryCurrentExchangeRateArgs
  >(GET_CURRENT_EXCHANGE_RATE, {
    variables: { fromCurrencyCode, toCurrencyCode },
    skip: skip || fromCurrencyCode === toCurrencyCode,
    fetchPolicy: 'network-only', // Disable cache for debugging
  });

  const rawRate = Number(data?.currentExchangeRate?.rate);
  const isValidRate = Number.isFinite(rawRate) && rawRate > 1;
  const validRate = isValidRate ? rawRate : 0;

  return {
    exchangeRate: data?.currentExchangeRate,
    rate: validRate,
    hasValidRate: isValidRate,
    loading,
    error,
    refetch,
  };
}
