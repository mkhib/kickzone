import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLER_ORDERS_QUERY,
  UPDATE_ORDER_STATUS_MUTATION,
  GET_ORDER_DETAILS_QUERY,
} from '@kickzone-workspace/sellers-graphql';

export function useSellerOrders({
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
  >(GET_SELLER_ORDERS_QUERY, {
    variables: { first, after, status },
    notifyOnNetworkStatusChange: true,
  });

  const [updateOrderStatusMutation, { loading: updateLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateOrderStatus'>,
    KickzoneGraphqlTypes.MutationUpdateOrderStatusArgs
  >(UPDATE_ORDER_STATUS_MUTATION, {
    refetchQueries: [{ query: GET_SELLER_ORDERS_QUERY }],
  });

  const updateOrderStatus = async (
    orderId: string,
    status: KickzoneGraphqlTypes.OrderStatus,
    trackingNumber?: string
  ) => {
    const response = await updateOrderStatusMutation({
      variables: {
        updateOrderStatusInput: {
          orderId,
          status,
          trackingNumber,
        },
      },
    });
    return response.data?.updateOrderStatus;
  };

  const loadMore = () => {
    if (data?.allSellerOrders && data.allSellerOrders.length > 0) {
      const lastOrder = data.allSellerOrders[data.allSellerOrders.length - 1];
      return fetchMore({
        variables: {
          after: lastOrder.id,
        },
      });
    }
  };

  return {
    orders: data?.allSellerOrders || [],
    loading,
    error,
    refetch,
    loadMore,
    updateOrderStatus,
    updateLoading,
  };
}

export function useOrderDetails(orderId: string) {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'order'>,
    KickzoneGraphqlTypes.QueryOrderArgs
  >(GET_ORDER_DETAILS_QUERY, {
    variables: { id: orderId },
    skip: !orderId,
  });

  return {
    order: data?.order,
    loading,
    error,
    refetch,
  };
}
