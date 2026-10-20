import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: number | string;
  name: string;
  brand?: string | null;
  model?: string | null;
  primaryImage?: string | null;
  price?: number | null;
  discount?: number | null;
  slug?: string | null;
  productCode?: string | null;
  categories?: Array<{ id?: string | number; name?: string; slug?: string }>;
  rawProduct?: unknown;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface WishlistActions {
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: number | string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  setItems: (items: WishlistItem[]) => void;
  isItemFavorite: (itemId: number | string) => boolean;
}

export type WishlistStore = WishlistState & WishlistActions;

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      lastUpdated: null,

      addItem: (item) => {
        if (!item || item.id === undefined || item.id === null) return;
        set((state) => {
          const currentItems = Array.isArray(state?.items) ? state.items : [];
          const exists = currentItems.some(
            (i) => String(i.id) === String(item.id)
          );
          if (exists) {
            return state;
          }
          return {
            ...state,
            items: [...currentItems, item],
            lastUpdated: new Date().toISOString(),
          };
        });
      },

      removeItem: (itemId) => {
        if (itemId === undefined || itemId === null) return;
        set((state) => {
          const currentItems = Array.isArray(state?.items) ? state.items : [];
          return {
            ...state,
            items: currentItems.filter((i) => String(i.id) !== String(itemId)),
            lastUpdated: new Date().toISOString(),
          };
        });
      },

      toggleItem: (item) => {
        if (!item || item.id === undefined || item.id === null) return;
        const exists = get().isItemFavorite(item.id);
        if (exists) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      clearWishlist: () => {
        set((state) => ({
          ...state,
          items: [],
          lastUpdated: new Date().toISOString(),
        }));
      },

      setItems: (items) => {
        set((state) => ({
          ...state,
          items: Array.isArray(items) ? items : [],
          lastUpdated: new Date().toISOString(),
        }));
      },

      isItemFavorite: (itemId) => {
        if (itemId === undefined || itemId === null) return false;
        const currentItems = Array.isArray(get()?.items) ? get().items : [];
        return currentItems.some((i) => String(i.id) === String(itemId));
      },
    }),
    {
      name: 'saintbala-customer-wishlist',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage;
        }
        // Fallback in-memory storage for SSR / tests without localStorage
        return {
          getItem: () => null,
          setItem: () => undefined,
          removeItem: () => undefined,
        };
      }),
      // Defensive merge: always ensures `items` is an array even if corrupted
      merge: (persistedState, currentState) => {
        const persisted = (persistedState || {}) as Partial<WishlistState>;
        const safeItems = Array.isArray(persisted.items)
          ? persisted.items.filter(
              (item): item is WishlistItem =>
                Boolean(item) &&
                typeof item === 'object' &&
                item.id !== undefined &&
                item.id !== null
            )
          : [];

        return {
          ...currentState,
          ...persisted,
          items: safeItems,
        };
      },
    }
  )
);

// Defensive selectors & hooks
export const useWishlistItems = (): WishlistItem[] => {
  return useWishlistStore((state) =>
    Array.isArray(state?.items) ? state.items : []
  );
};

export const useWishlistCount = (): number => {
  return useWishlistStore((state) =>
    Array.isArray(state?.items) ? state.items.length : 0
  );
};

export const useIsFavorite = (itemId: number | string | undefined | null): boolean => {
  return useWishlistStore((state) => {
    if (itemId === undefined || itemId === null) return false;
    const items = Array.isArray(state?.items) ? state.items : [];
    return items.some((i) => String(i.id) === String(itemId));
  });
};

export const useAddToWishlist = () => useWishlistStore((state) => state.addItem);
export const useRemoveFromWishlist = () =>
  useWishlistStore((state) => state.removeItem);
export const useToggleFavorite = () =>
  useWishlistStore((state) => state.toggleItem);
export const useClearWishlist = () =>
  useWishlistStore((state) => state.clearWishlist);

export const useWishlistActions = () => {
  const addItem = useAddToWishlist();
  const removeItem = useRemoveFromWishlist();
  const toggleItem = useToggleFavorite();
  const clearWishlist = useClearWishlist();

  return {
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
  };
};

export default useWishlistStore;
