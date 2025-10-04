import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLER_ORDERS_QUERY,
  UPDATE_ORDER_STATUS_MUTATION,
  UPDATE_ORDER_MUTATION,
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

  const [updateOrderStatusMutation, { loading: updateStatusLoading }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'updateOrderStatus'>,
      KickzoneGraphqlTypes.MutationUpdateOrderStatusArgs
    >(UPDATE_ORDER_STATUS_MUTATION, {
      refetchQueries: [{ query: GET_SELLER_ORDERS_QUERY }],
    });

  const [updateOrderMutation, { loading: updateOrderLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateOrder'>,
    KickzoneGraphqlTypes.MutationUpdateOrderArgs
  >(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_SELLER_ORDERS_QUERY }],
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

  const updateTrackingNumber = async (
    orderId: string,
    trackingNumber: string
  ) => {
    const response = await updateOrderMutation({
      variables: {
        id: orderId,
        updateOrderInput: {
          trackingNumber,
        },
      },
    });
    return response.data?.updateOrder;
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
    updateTrackingNumber,
    updateStatusLoading,
    updateOrderLoading,
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
