import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLERS_QUERY,
  GET_ALL_ORDERS_QUERY,
  UPDATE_ORDER_STATUS_MUTATION,
} from '@kickzone-workspace/admins-graphql';

export function useAdminsOrders({
  first = 10,
  after,
  status,
}: {
  first?: number;
  after?: string;
  status?: KickzoneGraphqlTypes.OrderStatus;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'allSellerOrders'>,
    KickzoneGraphqlTypes.QueryAllSellerOrdersArgs
  >(GET_ALL_ORDERS_QUERY, {
    variables: { first, after, status },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const [updateOrderStatusMutation, { loading: updateStatusLoading }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'updateOrderStatus'>,
      KickzoneGraphqlTypes.MutationUpdateOrderStatusArgs
    >(UPDATE_ORDER_STATUS_MUTATION, {
      refetchQueries: [
        { query: GET_ALL_ORDERS_QUERY, variables: { first, after, status } },
      ],
    });

  const updateOrderStatus = async (
    orderId: string,
    status: KickzoneGraphqlTypes.OrderStatus
  ) => {
    const response = await updateOrderStatusMutation({
      variables: {
        updateOrderStatusInput: {
          id: orderId,
          status,
        },
      },
    });
    return response.data?.updateOrderStatus;
  };

  const loadMore = () => {
    if (data?.allSellerOrders && data.allSellerOrders.length > 0) {
      const lastOrder = data.allSellerOrders[data.allSellerOrders.length - 1];
      if (lastOrder) {
        return fetchMore({
          variables: {
            after: lastOrder.id,
          },
        });
      }
    }
  };

  return {
    orders: data?.allSellerOrders || [],
    loading,
    error,
    refetch,
    loadMore,
    updateOrderStatus,
    updateStatusLoading,
  };
}

export function useAdminsSellers({
  filter,
}: {
  filter?: KickzoneGraphqlTypes.SellerFilterInput;
} = {}) {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'sellers'>,
    KickzoneGraphqlTypes.QuerySellersArgs
  >(GET_SELLERS_QUERY, {
    variables: { filter },
    fetchPolicy: 'cache-and-network',
  });

  return {
    sellers:
      data?.sellers?.edges?.map((edge) => edge?.node).filter(Boolean) || [],
    pageInfo: data?.sellers?.pageInfo,
    totalCount: data?.sellers?.totalCount || 0,
    loading,
    error,
    refetch,
  };
}
