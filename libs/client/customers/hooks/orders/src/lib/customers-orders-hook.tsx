import { useQuery } from '@apollo/client/react';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/customers-graphql';

// Define Order type based on GraphQL schema
interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color?: string;
  size?: string;
}

interface GetMyOrdersData {
  myOrders: Order[];
}

interface GetMyOrdersVariables {
  first?: number;
  after?: string;
}

export function useCustomersOrders({
  first = 50,
  after,
}: {
  first?: number;
  after?: string;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetMyOrdersData,
    GetMyOrdersVariables
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
