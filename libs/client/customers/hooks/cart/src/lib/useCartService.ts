import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  CLEAR_CART_MUTATION,
  GET_MY_CART_QUERY,
  GET_SELLERS_BY_IDS_QUERY,
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
  const prevIsLoggedInRef = useRef<boolean | null>(null);

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
  const {
    data: serverCartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'myCart'>>(GET_MY_CART_QUERY, {
    skip: !isLoggedIn,
  });

  // Extract unique seller IDs from cart items
  const sellerIds = useMemo(() => {
    if (!serverCartData?.myCart?.items) {
      return [];
    }
    const ids = new Set<number>();
    serverCartData.myCart.items.forEach((item) => {
      const sellerId = parseInt(item.sellerId, 10);
      if (!isNaN(sellerId) && sellerId > 0) {
        ids.add(sellerId);
      }
    });
    return Array.from(ids);
  }, [serverCartData]);

  // Fetch seller shipping fees
  const {
    data: sellersData,
    loading: sellersLoading,
    error: sellersError,
  } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'sellers'>,
    KickzoneGraphqlTypes.QuerySellersArgs
  >(GET_SELLERS_BY_IDS_QUERY, {
    variables: {
      filter:
        sellerIds.length > 0
          ? ({ ids: sellerIds } as KickzoneGraphqlTypes.SellerFilterInput)
          : undefined,
    },
    skip: !isLoggedIn || sellerIds.length === 0,
  });

  // Create a map of sellerId -> shippingFee
  const sellerShippingFeeMap = useMemo(() => {
    const map = new Map<number, number>();
    if (sellersData?.sellers?.edges) {
      sellersData.sellers.edges.forEach((edge) => {
        if (edge?.node?.id !== undefined) {
          // Convert ID to number (GraphQL might return it as string or number)
          const sellerId =
            typeof edge.node.id === 'string'
              ? parseInt(edge.node.id, 10)
              : edge.node.id;
          const shippingFee = edge.node.shippingFee ?? 0;
          if (!isNaN(sellerId)) {
            map.set(sellerId, shippingFee);
          }
        }
      });
    }
    return map;
  }, [sellersData]);

  // Handle login state changes
  // Only clear cart when user actually logs OUT (not when they're just not logged in)
  // This allows unauthenticated users to maintain their local cart for guest checkout
  useEffect(() => {
    const prevIsLoggedIn = prevIsLoggedInRef.current;

    if (prevIsLoggedIn === null) {
      // Initial mount - don't clear cart, just track the state
      prevIsLoggedInRef.current = isLoggedIn;
      return;
    }

    if (prevIsLoggedIn === true && isLoggedIn === false) {
      // User logged out - clear local cart to prevent showing other users' items
      useCartStore.getState().clearCart();
    }
    // If user is not logged in from the start, keep their local cart
    // If user logs in, server cart will be loaded via useQuery and synced below

    prevIsLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  // Sync server cart data to local Zustand store
  const syncServerCartToLocal = useCallback(
    (serverCart: KickzoneGraphqlTypes.Cart) => {
      // If server cart is empty, clear local cart
      if (!serverCart.items || serverCart.items.length === 0) {
        useCartStore.getState().clearCart();
        return;
      }

      // Get current local items to preserve shipping fees if seller data hasn't loaded yet
      const currentLocalItems = useCartStore.getState().items;
      const localItemsMap = new Map<string, CartItem>();
      currentLocalItems.forEach((item) => {
        // Use sellerProductId as key since it's unique per seller-product combination
        const key = `${item.sellerId}-${item.sellerProductId}`;
        localItemsMap.set(key, item);
      });

      const localItems: CartItem[] = serverCart.items.map(
        (item: KickzoneGraphqlTypes.CartItem) => {
          const sellerIdNum = parseInt(item.sellerId, 10);

          // Try to get shipping fee from sellerShippingFeeMap first (authoritative source)
          let shippingFee = sellerShippingFeeMap.get(sellerIdNum);

          // If map doesn't have this seller yet (undefined), preserve from existing local item
          // This handles the case where seller data hasn't loaded yet
          if (shippingFee === undefined) {
            const key = `${item.sellerId}-${item.sellerProductId}`;
            const existingItem = localItemsMap.get(key);
            if (existingItem && existingItem.sellerShippingFee !== undefined) {
              shippingFee = existingItem.sellerShippingFee;
            } else {
              // No data available, default to 0
              shippingFee = 0;
            }
          }
          // If shippingFee is 0 from map, use it (seller explicitly has no fee)

          const cartItem: CartItem = {
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
            sellerShippingFee: shippingFee,
            productInfoId: item.productInfoId || '',
            sellerProductId: item.sellerProductId || item.productId,
            availableStock: item.availableStock || 0,
          };

          return cartItem;
        }
      );

      // Update local store with server data
      useCartStore.getState().setItems(localItems);
    },
    [sellerShippingFeeMap]
  );

  // Sync server cart to local store when data changes or seller shipping fees are loaded
  useEffect(() => {
    if (serverCartData?.myCart) {
      // If we have seller IDs but sellers are still loading, wait for them
      // Otherwise, sync immediately (for empty carts or when seller data is ready)
      if (sellerIds.length === 0 || !sellersLoading) {
        syncServerCartToLocal(serverCartData.myCart);
      }
    }
  }, [
    serverCartData,
    syncServerCartToLocal,
    sellerShippingFeeMap,
    sellersLoading,
    sellerIds.length,
  ]);

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
        // Revert local change on server failure to maintain consistency
        useCartStore.getState().removeItem(itemData.sellerProductId);
        const structuredError = new Error(
          `Failed to add item to server cart: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        console.error('[useCartService] addItem server sync failed:', structuredError);
        throw structuredError;
      }
    }
  };

  // Update item quantity (both local and server)
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    // Capture previous state for potential rollback
    const previousState = useCartStore.getState().items.find((item) => item.id === itemId);
    const previousQuantity = previousState?.quantity ?? 0;

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
        // Rollback local change on server failure
        if (previousState) {
          useCartStore.getState().updateItemQuantity(itemId, previousQuantity);
        } else {
          useCartStore.getState().removeItem(itemId);
        }
        const structuredError = new Error(
          `Failed to update item quantity on server: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        console.error('[useCartService] updateItemQuantity server sync failed:', structuredError);
        throw structuredError;
      }
    }
  };

  // Remove item from cart (both local and server)
  const removeItem = async (itemId: string) => {
    // Capture removed item for potential rollback
    const removedItem = useCartStore.getState().items.find((item) => item.id === itemId);

    // Update local store immediately
    useCartStore.getState().removeItem(itemId);

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await removeFromCartMutation({
          variables: { itemId },
        });
      } catch (error) {
        // Rollback local change on server failure
        if (removedItem) {
          useCartStore.getState().addItem({
            productId: removedItem.productId,
            productName: removedItem.productName,
            productImage: removedItem.productImage,
            quantity: removedItem.quantity,
            unitPrice: removedItem.unitPrice,
            color: removedItem.color,
            size: removedItem.size,
            sellerId: removedItem.sellerId,
            sellerName: removedItem.sellerName,
            sellerShippingFee: removedItem.sellerShippingFee,
            productInfoId: removedItem.productInfoId,
            sellerProductId: removedItem.sellerProductId,
            availableStock: removedItem.availableStock,
          });
        }
        const structuredError = new Error(
          `Failed to remove item from server cart: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        console.error('[useCartService] removeItem server sync failed:', structuredError);
        throw structuredError;
      }
    }
  };

  // Clear cart (both local and server)
  const clearCart = async () => {
    // Capture current items for potential rollback
    const currentItems = [...useCartStore.getState().items];

    // Update local store immediately
    useCartStore.getState().clearCart();

    // If logged in, also sync to server
    if (isLoggedIn) {
      try {
        await clearCartMutation();
      } catch (error) {
        // Rollback local change on server failure
        if (currentItems.length > 0) {
          useCartStore.getState().setItems(currentItems);
        }
        const structuredError = new Error(
          `Failed to clear server cart: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        console.error('[useCartService] clearCart server sync failed:', structuredError);
        throw structuredError;
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
