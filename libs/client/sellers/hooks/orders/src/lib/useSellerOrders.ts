import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_MY_ORDERS_QUERY,
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
  // Note: Types will be auto-generated when server starts and schema regenerates
  // Using any temporarily to avoid type errors until schema regeneration
  const { data, loading, error, refetch, fetchMore } = useQuery<any, any>(
    GET_MY_ORDERS_QUERY,
    {
      variables: { first, after },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );

  const orders = data?.mySellerOrders || [];

  const [updateOrderStatusMutation, { loading: updateStatusLoading }] =
    useMutation<any, any>(UPDATE_ORDER_STATUS_MUTATION, {
      refetchQueries: [{ query: GET_MY_ORDERS_QUERY, variables: { first } }],
    });

  const [updateOrderMutation, { loading: updateOrderLoading }] = useMutation<
    any,
    any
  >(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_MY_ORDERS_QUERY, variables: { first } }],
  });

  const updateOrderStatus = async (
    orderId: string,
    newStatus: KickzoneGraphqlTypes.OrderStatus
  ) => {
    const response = await updateOrderStatusMutation({
      variables: {
        updateOrderStatusInput: {
          id: orderId,
          status: newStatus,
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
    if (orders && orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      return fetchMore({
        variables: {
          after: lastOrder.id,
        },
      });
    }
  };

  // Filter orders by status on the client side if status filter is provided
  const filteredOrders = status
    ? orders.filter((order: any) => order.status === status)
    : orders;

  return {
    orders: filteredOrders,
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
