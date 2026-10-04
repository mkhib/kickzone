import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { GET_CUSTOMERS } from './adminsCustomers.graphql';

export interface UseAdminsCustomersOptions {
  first?: number;
  after?: string;
  searchTerm?: string;
}

export const useAdminsCustomers = (options?: UseAdminsCustomersOptions) => {
  const {
    data,
    loading: isLoadingCustomers,
    error: customersError,
    refetch: refetchCustomers,
  } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'customers'>,
    KickzoneGraphqlTypes.QueryCustomersArgs
  >(GET_CUSTOMERS, {
    variables: {
      first: options?.first ?? 100,
      after: options?.after,
      searchTerm: options?.searchTerm,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  return {
    customers: data?.customers,
    isLoadingCustomers,
    customersError,
    refetchCustomers,
  };
};
