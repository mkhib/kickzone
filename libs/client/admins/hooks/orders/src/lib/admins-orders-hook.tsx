import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLERS_QUERY,
  GET_ALL_ORDERS_QUERY,
} from '@kickzone-workspace/admins-graphql';

export function useAdminsOrders({
  first = 10,
  after,
  sellerId,
  status,
}: {
  first?: number;
  after?: string;
  sellerId?: string;
  status?: KickzoneGraphqlTypes.OrderStatus;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'orders'>,
    KickzoneGraphqlTypes.QueryOrdersArgs
  >(GET_ALL_ORDERS_QUERY, {
    variables: { first, after, sellerId, status },
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = () => {
    if (data?.orders && data.orders.length > 0) {
      const lastOrder = data.orders[data.orders.length - 1];
      return fetchMore({
        variables: {
          after: lastOrder.id,
        },
      });
    }
  };

  return {
    orders: data?.orders || [],
    loading,
    error,
    refetch,
    loadMore,
  };
}

export function useAdminsSellers({
  first = 100,
  after,
  filter,
}: {
  first?: number;
  after?: string;
  filter?: KickzoneGraphqlTypes.SellerFilterInput;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'sellers'>,
    KickzoneGraphqlTypes.QuerySellersArgs
  >(GET_SELLERS_QUERY, {
    variables: { first, after, filter },
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = () => {
    if (
      data?.sellers?.pageInfo?.hasNextPage &&
      data.sellers.pageInfo.endCursor
    ) {
      return fetchMore({
        variables: {
          after: data.sellers.pageInfo.endCursor,
        },
      });
    }
  };

  return {
    sellers: data?.sellers?.edges?.map((edge) => edge.node) || [],
    pageInfo: data?.sellers?.pageInfo,
    totalCount: data?.sellers?.totalCount || 0,
    loading,
    error,
    refetch,
    loadMore,
  };
}
