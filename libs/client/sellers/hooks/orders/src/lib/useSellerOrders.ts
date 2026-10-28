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
  status?: KickzoneGraphqlTypes.OrderStatus | 'ALL';
} = {}) {
  // Normalize status: 'ALL' or undefined means no server-side filter
  const statusVariable = status && status !== 'ALL' ? status : undefined;

  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'mySellerOrders'>,
    KickzoneGraphqlTypes.QueryMySellerOrdersArgs
  >(GET_MY_ORDERS_QUERY, {
    variables: { first, after, ...(statusVariable ? { status: statusVariable } : {}) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  type SellerOrder = KickzoneGraphqlTypes.SellerOrder;

  const orders: SellerOrder[] =
    data?.mySellerOrders?.edges
      ?.map((edge) => edge?.node as SellerOrder | undefined)
      .filter((node): node is SellerOrder => Boolean(node)) || [];

  const [updateOrderStatusMutation, { loading: updateStatusLoading }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'updateOrderStatus'>,
      KickzoneGraphqlTypes.MutationUpdateOrderStatusArgs
    >(UPDATE_ORDER_STATUS_MUTATION, {
      refetchQueries: [
        {
          query: GET_MY_ORDERS_QUERY,
          variables: { first, ...(statusVariable ? { status: statusVariable } : {}) },
        },
      ],
    });

  const [updateOrderMutation, { loading: updateOrderLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateOrder'>,
    KickzoneGraphqlTypes.MutationUpdateOrderArgs
  >(UPDATE_ORDER_MUTATION, {
    refetchQueries: [
      {
        query: GET_MY_ORDERS_QUERY,
        variables: { first, ...(statusVariable ? { status: statusVariable } : {}) },
      },
    ],
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
    const endCursor = data?.mySellerOrders?.pageInfo?.endCursor;
    if (!endCursor) return;
    return fetchMore({
      variables: {
        after: endCursor,
        ...(statusVariable ? { status: statusVariable } : {}),
      },
    });
  };

  // Filter orders by status on the client side if status filter is provided
  const filteredOrders = statusVariable
    ? orders.filter((order: SellerOrder) => order.status === statusVariable)
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
