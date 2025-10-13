import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_MY_CART_QUERY,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  CLEAR_CART_MUTATION,
  CREATE_ORDER_MUTATION,
} from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useCustomersCart() {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'myCart'>
  >(GET_MY_CART_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    cart: data?.myCart,
    loading,
    error,
    refetch,
  };
}

export function useCustomersCartMutations() {
  const [addToCartMutation, { loading: addLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'addToCart'>,
    KickzoneGraphqlTypes.MutationAddToCartArgs
  >(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  const [updateCartItemMutation, { loading: updateLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateCartItem'>,
    KickzoneGraphqlTypes.MutationUpdateCartItemArgs
  >(UPDATE_CART_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  const [removeFromCartMutation, { loading: removeLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'removeFromCart'>,
    KickzoneGraphqlTypes.MutationRemoveFromCartArgs
  >(REMOVE_FROM_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  const [clearCartMutation, { loading: clearLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'clearCart'>
  >(CLEAR_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  const [createOrderMutation, { loading: orderLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createOrder'>,
    KickzoneGraphqlTypes.MutationCreateOrderArgs
  >(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  const addToCart = async (input: KickzoneGraphqlTypes.AddToCartInput) => {
    const response = await addToCartMutation({
      variables: { addToCartInput: input },
    });
    return response.data?.addToCart;
  };

  const updateCartItem = async (
    itemId: string,
    updateInput: KickzoneGraphqlTypes.UpdateCartItemInput
  ) => {
    const response = await updateCartItemMutation({
      variables: { itemId, updateInput },
    });
    return response.data?.updateCartItem;
  };

  const removeFromCart = async (itemId: string) => {
    const response = await removeFromCartMutation({
      variables: { itemId },
    });
    return response.data?.removeFromCart;
  };

  const clearCart = async () => {
    const response = await clearCartMutation();
    return response.data?.clearCart;
  };

  const createOrder = async (input: KickzoneGraphqlTypes.CreateOrderInput) => {
    const response = await createOrderMutation({
      variables: { createOrderInput: input },
    });
    return response.data?.createOrder;
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
