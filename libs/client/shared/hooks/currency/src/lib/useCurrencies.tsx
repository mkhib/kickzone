import { useQuery } from '@apollo/client/react';
import { GET_CURRENCIES } from '@kickzone-workspace/client-shared-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useCurrencies() {
  const { data, loading, error, refetch } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'currencies'>>(GET_CURRENCIES);

  return {
    currencies: data?.currencies || [],
    loading,
    error,
    refetch,
  };
}
