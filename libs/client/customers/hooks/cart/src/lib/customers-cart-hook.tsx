import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_MY_CART_QUERY,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  CLEAR_CART_MUTATION,
  CREATE_ORDER_MUTATION,
} from '@kickzone-workspace/customers-graphql';

// Define proper interfaces for cart data
interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color: string | null;
  size: string | null;
  sellerId: string;
}

interface Cart {
  id: string;
  subtotal: number;
  total: number;
  items: CartItem[];
}

interface CartData {
  myCart: Cart;
}

interface AddToCartInput {
  productId: string;
  productInfoId: string;
  quantity: number;
}

interface UpdateCartItemInput {
  quantity: number;
}

interface CreateOrderInput {
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes?: string;
}

export function useCustomersCart() {
  const { data, loading, error, refetch } = useQuery<CartData>(
    GET_MY_CART_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  return {
    cart: data?.myCart,
    loading,
    error,
    refetch,
  };
}

export function useCustomersCartMutations() {
  const [addToCartMutation, { loading: addLoading }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      refetchQueries: [{ query: GET_MY_CART_QUERY }],
    }
  );

  const [updateCartItemMutation, { loading: updateLoading }] = useMutation(
    UPDATE_CART_ITEM_MUTATION,
    {
      refetchQueries: [{ query: GET_MY_CART_QUERY }],
    }
  );

  const [removeFromCartMutation, { loading: removeLoading }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      refetchQueries: [{ query: GET_MY_CART_QUERY }],
    }
  );

  const [clearCartMutation, { loading: clearLoading }] = useMutation(
    CLEAR_CART_MUTATION,
    {
      refetchQueries: [{ query: GET_MY_CART_QUERY }],
    }
  );

  const [createOrderMutation, { loading: orderLoading }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: GET_MY_CART_QUERY }],
    }
  );

  const addToCart = async (input: AddToCartInput) => {
    const response = await addToCartMutation({
      variables: { addToCartInput: input },
    });
    return (response.data as { addToCart: any })?.addToCart;
  };

  const updateCartItem = async (
    itemId: string,
    updateInput: UpdateCartItemInput
  ) => {
    const response = await updateCartItemMutation({
      variables: { itemId, updateInput },
    });
    return (response.data as { updateCartItem: any })?.updateCartItem;
  };

  const removeFromCart = async (itemId: string) => {
    const response = await removeFromCartMutation({
      variables: { itemId },
    });
    return (response.data as { removeFromCart: any })?.removeFromCart;
  };

  const clearCart = async () => {
    const response = await clearCartMutation();
    return (response.data as { clearCart: any })?.clearCart;
  };

  const createOrder = async (input: CreateOrderInput) => {
    const response = await createOrderMutation({
      variables: { createOrderInput: input },
    });
    return (response.data as { createOrder: any })?.createOrder;
  };

  return {
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    createOrder,
    loading:
      addLoading ||
      updateLoading ||
      removeLoading ||
      clearLoading ||
      orderLoading,
  };
}
