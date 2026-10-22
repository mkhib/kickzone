import { useEffect, useRef, useContext } from 'react';
import { getApolloContext } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from '@kickzone-workspace/customers-graphql';
import {
  useWishlistStore,
  useWishlistItems,
  WishlistItem,
} from '@kickzone-workspace/customer-wishlist-store';

/**
 * Hook to synchronize favorites between client localStorage and server database profile
 * - When guest browses, items persist in localStorage & sync across tabs
 * - When user logs in, merges local guest items with server-persisted favorites
 * - When favorites change while logged in, saves them to server CustomerProfile
 */
export function useWishlistSync() {
  const { user } = useCustomersAuth();
  const isLoggedIn = !!user;
  const items = useWishlistItems();
  const hasLoadedFromServer = useRef(false);

  const apolloCtx = useContext(getApolloContext());
  const client = apolloCtx?.client;

  // When user logs in and Apollo client is available, load & merge server favorites
  useEffect(() => {
    if (!isLoggedIn || !client || hasLoadedFromServer.current) {
      return;
    }

    let isMounted = true;

    client
      .query<{ myProfile?: { id: string; favorites?: string | null } }>({
        query: GET_MY_PROFILE,
        fetchPolicy: 'cache-first',
      })
      .then((result) => {
        if (!isMounted) return;
        hasLoadedFromServer.current = true;
        const profileFavorites = result.data?.myProfile?.favorites;

        if (profileFavorites) {
          try {
            const serverFavorites: WishlistItem[] = JSON.parse(profileFavorites);
            if (Array.isArray(serverFavorites) && serverFavorites.length > 0) {
              const localItems = useWishlistStore.getState().items;
              const merged = [...localItems];
              serverFavorites.forEach((sItem) => {
                if (!merged.some((m) => String(m.id) === String(sItem.id))) {
                  merged.push(sItem);
                }
              });
              useWishlistStore.getState().setItems(merged);
            }
          } catch (e) {
            console.error('Failed to parse server favorites:', e);
          }
        } else if (result.data?.myProfile) {
          // If server has no favorites but local has items, sync local items to server
          const localItems = useWishlistStore.getState().items;
          if (localItems.length > 0) {
            client
              .mutate({
                mutation: UPDATE_MY_PROFILE,
                variables: {
                  input: {
                    favorites: JSON.stringify(localItems),
                  },
                },
              })
              .catch((err) => {
                console.error('Failed to save initial favorites to server:', err);
              });
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch profile favorites:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn, client]);

  // When user is logged in and items change, synchronize to server
  useEffect(() => {
    if (isLoggedIn && client && hasLoadedFromServer.current) {
      const timeoutId = setTimeout(() => {
        client
          .mutate({
            mutation: UPDATE_MY_PROFILE,
            variables: {
              input: {
                favorites: JSON.stringify(items),
              },
            },
          })
          .catch((err) => {
            console.error('Failed to persist favorites to server:', err);
          });
      }, 800);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, client, items]);

  // Reset loaded ref on logout
  useEffect(() => {
    if (!isLoggedIn) {
      hasLoadedFromServer.current = false;
    }
  }, [isLoggedIn]);
}

export default useWishlistSync;
