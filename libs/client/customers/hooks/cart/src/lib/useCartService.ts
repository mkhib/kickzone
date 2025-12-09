import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import {
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  CLEAR_CART_MUTATION,
  GET_MY_CART_QUERY,
} from '@kickzone-workspace/customers-graphql';
import {
  useCartStore,
  CartItem,
} from '@kickzone-workspace/customer-cart-store';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

/**
 * Cart service that bridges client Zustand store with server GraphQL mutations
 * Handles synchronization between local state and server state
 */
export function useCustomersCartService() {
  const { user } = useCustomersAuth();
  const isLoggedIn = !!user;

  // Server mutations
  const [addToCartMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'addToCart'>,
    KickzoneGraphqlTypes.MutationAddToCartArgs
  >(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });
  const [updateCartItemMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateCartItem'>,
    KickzoneGraphqlTypes.MutationUpdateCartItemArgs
  >(UPDATE_CART_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });
  const [removeFromCartMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'removeFromCart'>,
    KickzoneGraphqlTypes.MutationRemoveFromCartArgs
  >(REMOVE_FROM_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });
  const [clearCartMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'clearCart'>
  >(CLEAR_CART_MUTATION, {
    refetchQueries: [{ query: GET_MY_CART_QUERY }],
  });

  // Load user's cart from server when they log in
  const { data: serverCartData, loading: cartLoading } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'myCart'>
  >(GET_MY_CART_QUERY, {
    skip: !isLoggedIn,
  });

  // Handle login state changes
  useEffect(() => {
    if (isLoggedIn) {
      // User logged in - server cart will be loaded via useQuery
      // and synced via the effect below
    } else {
      // User logged out - clear local cart to prevent showing other users' items
      useCartStore.getState().clearCart();
    }
  }, [isLoggedIn]);

  // Sync server cart to local store when data changes
  useEffect(() => {
    if (serverCartData?.myCart) {
      syncServerCartToLocal(serverCartData.myCart);
    }
  }, [serverCartData]);

  // Sync server cart data to local Zustand store
  const syncServerCartToLocal = (serverCart: KickzoneGraphqlTypes.Cart) => {
    // If server cart is empty, clear local cart
    if (!serverCart.items || serverCart.items.length === 0) {
      useCartStore.getState().clearCart();
      return;
    }

    const localItems: CartItem[] = serverCart.items.map(
      (item: KickzoneGraphqlTypes.CartItem) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage || null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        color: item.color || null,
        size: item.size || null,
        sellerId: item.sellerId,
        sellerName: '', // Not displayed to customers
        productInfoId: item.productInfoId || '',
        sellerProductId: item.sellerProductId || item.productId,
        availableStock: item.availableStock || 0,
      })
    );

    // Update local store with server data
    useCartStore.getState().setItems(localItems);
  };

  // Add item to cart (both local and server)
  const addItem = async (itemData: Omit<CartItem, 'id' | 'totalPrice'>) => {
    // Always update local store immediately for instant UI feedback
    useCartStore.getState().addItem(itemData);

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await addToCartMutation({
          variables: {
            addToCartInput: {
              sellerProductId: itemData.sellerProductId,
              quantity: itemData.quantity,
            },
          },
        });
      } catch (error) {
        console.error('Failed to sync to server:', error);
        // Optionally revert local change or show error
      }
    }
  };

  // Update item quantity (both local and server)
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    // Update local store immediately
    useCartStore.getState().updateItemQuantity(itemId, quantity);

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await updateCartItemMutation({
          variables: {
            itemId,
            updateInput: { quantity },
          },
        });
      } catch (error) {
        console.error('Failed to sync to server:', error);
      }
    }
  };

  // Remove item from cart (both local and server)
  const removeItem = async (itemId: string) => {
    // Update local store immediately
    useCartStore.getState().removeItem(itemId);

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await removeFromCartMutation({
          variables: { itemId },
        });
      } catch (error) {
        console.error('Failed to sync to server:', error);
      }
    }
  };

  // Clear cart (both local and server)
  const clearCart = async () => {
    // Update local store immediately
    useCartStore.getState().clearCart();

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await clearCartMutation();
      } catch (error) {
        console.error('Failed to sync to server:', error);
      }
    }
  };

  return {
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    isLoggedIn,
    cartLoading,
  };
}
