import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/customers-graphql';

export function useCustomersOrders({
  first = 50,
  after,
}: {
  first?: number;
  after?: string;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'myOrders'>,
    KickzoneGraphqlTypes.QueryMyOrdersArgs
  >(GET_MY_ORDERS_QUERY, {
    variables: { first, after },
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = () => {
    if (data?.myOrders && data.myOrders.length > 0) {
      const lastOrder = data.myOrders[data.myOrders.length - 1];
      return fetchMore({
        variables: {
          after: lastOrder.id,
        },
      });
    }
  };

  return {
    orders: data?.myOrders || [],
    loading,
    error,
    refetch,
    loadMore,
  };
}
