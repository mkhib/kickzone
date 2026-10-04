import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define cart item interface
export interface CartItem {
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
  sellerName: string;
  sellerShippingFee: number; // Seller's shipping fee
  productInfoId: string;
  sellerProductId: string; // SellerProduct ID for stock management
  availableStock: number; // Available stock quantity
}

// Define cart state interface
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// Define cart actions interface
export interface CartActions {
  // Item management
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;

  // Bulk operations
  addMultipleItems: (items: Omit<CartItem, 'id' | 'totalPrice'>[]) => void;
  removeMultipleItems: (itemIds: string[]) => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setLastUpdated: (date: string) => void;

  // Cart synchronization
  syncWithServer: () => Promise<void>;
  loadFromServer: () => Promise<void>;

  // Utility actions
  getItemById: (itemId: string) => CartItem | undefined;
  getItemByProductInfo: (
    productId: string,
    productInfoId: string
  ) => CartItem | undefined;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalBySeller: (sellerId: string) => number;
  getUniqueSellers: () => string[];
}

// Define the complete store type
export type CartStore = CartState & CartActions;

// Helper function to calculate total price
const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

// Helper function to generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Create the cart store with persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,
      lastUpdated: null,

      // Item management
      addItem: (itemData) => {
        const existingItem = get().getItemByProductInfo(
          itemData.productId,
          itemData.productInfoId
        );

        const maxStock =
          typeof itemData.availableStock === 'number' && itemData.availableStock > 0
            ? itemData.availableStock
            : typeof existingItem?.availableStock === 'number' &&
              existingItem.availableStock > 0
            ? existingItem.availableStock
            : undefined;

        if (existingItem) {
          // If already at or above max stock, prevent adding more
          if (maxStock !== undefined && existingItem.quantity >= maxStock) {
            return;
          }

          const targetQuantity = existingItem.quantity + itemData.quantity;
          const clampedQuantity =
            maxStock !== undefined
              ? Math.min(targetQuantity, maxStock)
              : targetQuantity;

          get().updateItemQuantity(existingItem.id, clampedQuantity);
        } else {
          const clampedQuantity =
            maxStock !== undefined
              ? Math.min(itemData.quantity, maxStock)
              : itemData.quantity;

          if (clampedQuantity <= 0) {
            return;
          }

          // Add new item
          const newItem: CartItem = {
            ...itemData,
            id: generateId(),
            quantity: clampedQuantity,
            totalPrice: itemData.unitPrice * clampedQuantity,
          };

          set((state) => ({
            items: [...state.items, newItem],
            lastUpdated: new Date().toISOString(),
          }));
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          lastUpdated: new Date().toISOString(),
        }));
      },

      updateItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const existing = get().items.find((item) => item.id === itemId);
        const maxStock = existing?.availableStock;
        const finalQuantity =
          typeof maxStock === 'number' && maxStock > 0
            ? Math.min(quantity, maxStock)
            : quantity;

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity: finalQuantity,
                  totalPrice: item.unitPrice * finalQuantity,
                }
              : item
          ),
          lastUpdated: new Date().toISOString(),
        }));
      },

      clearCart: () => {
        set({
          items: [],
          lastUpdated: new Date().toISOString(),
        });
      },

      setItems: (items) => {
        set({
          items,
          lastUpdated: new Date().toISOString(),
        });
      },

      // Bulk operations
      addMultipleItems: (itemsData) => {
        const newItems: CartItem[] = itemsData.map((itemData) => ({
          ...itemData,
          id: generateId(),
          totalPrice: itemData.unitPrice * itemData.quantity,
        }));

        set((state) => ({
          items: [...state.items, ...newItems],
          lastUpdated: new Date().toISOString(),
        }));
      },

      removeMultipleItems: (itemIds) => {
        set((state) => ({
          items: state.items.filter((item) => !itemIds.includes(item.id)),
          lastUpdated: new Date().toISOString(),
        }));
      },

      // State management
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      setLastUpdated: (date) => {
        set({ lastUpdated: date });
      },

      // Cart synchronization
      syncWithServer: async () => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/cart/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: get().items }),
          });

          if (!response.ok) {
            throw new Error('Failed to sync cart with server');
          }

          const data = await response.json();

          set({
            items: data.items || get().items,
            lastUpdated: new Date().toISOString(),
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Sync failed',
            isLoading: false,
          });
        }
      },

      loadFromServer: async () => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/cart');

          if (!response.ok) {
            throw new Error('Failed to load cart from server');
          }

          const data = await response.json();

          set({
            items: data.items || [],
            lastUpdated: new Date().toISOString(),
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Load failed',
            isLoading: false,
          });
        }
      },

      // Utility actions
      getItemById: (itemId) => {
        return get().items.find((item) => item.id === itemId);
      },

      getItemByProductInfo: (productId, productInfoId) => {
        return get().items.find(
          (item) =>
            item.productId === productId && item.productInfoId === productInfoId
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return calculateTotalPrice(get().items);
      },

      getTotalBySeller: (sellerId) => {
        const sellerItems = get().items.filter(
          (item) => item.sellerId === sellerId
        );
        return calculateTotalPrice(sellerItems);
      },

      getUniqueSellers: () => {
        const sellers = new Set(get().items.map((item) => item.sellerId));
        return Array.from(sellers);
      },
    }),
    {
      name: 'cart-storage',
      // Only persist items and lastUpdated to localStorage
      // This ensures cart persists across browser sessions
      // Cart is cleared on logout via auth context
      partialize: (state) => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

// Selector hooks for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartLoading = () => useCartStore((state) => state.isLoading);
export const useCartError = () => useCartStore((state) => state.error);
// Memoized selectors to prevent infinite loops
export const useCartTotal = () => {
  const items = useCartStore((state) => state.items);
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

export const useCartItemCount = () => {
  const items = useCartStore((state) => state.items);
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Individual action hooks to prevent unnecessary re-renders
export const useAddItem = () => useCartStore((state) => state.addItem);
export const useRemoveItem = () => useCartStore((state) => state.removeItem);
export const useUpdateItemQuantity = () =>
  useCartStore((state) => state.updateItemQuantity);
export const useClearCart = () => useCartStore((state) => state.clearCart);
export const useAddMultipleItems = () =>
  useCartStore((state) => state.addMultipleItems);
export const useRemoveMultipleItems = () =>
  useCartStore((state) => state.removeMultipleItems);
export const useSetLoading = () => useCartStore((state) => state.setLoading);
export const useSetError = () => useCartStore((state) => state.setError);
export const useClearError = () => useCartStore((state) => state.clearError);
export const useSetLastUpdated = () =>
  useCartStore((state) => state.setLastUpdated);
export const useSyncWithServer = () =>
  useCartStore((state) => state.syncWithServer);
export const useLoadFromServer = () =>
  useCartStore((state) => state.loadFromServer);
export const useGetItemById = () => useCartStore((state) => state.getItemById);
export const useGetItemByProductInfo = () =>
  useCartStore((state) => state.getItemByProductInfo);
export const useGetTotalItems = () =>
  useCartStore((state) => state.getTotalItems);
export const useGetTotalPrice = () =>
  useCartStore((state) => state.getTotalPrice);
export const useGetTotalBySeller = () =>
  useCartStore((state) => state.getTotalBySeller);
export const useGetUniqueSellers = () =>
  useCartStore((state) => state.getUniqueSellers);

// Memoized actions hook to prevent infinite re-renders
export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const addMultipleItems = useCartStore((state) => state.addMultipleItems);
  const removeMultipleItems = useCartStore(
    (state) => state.removeMultipleItems
  );
  const setLoading = useCartStore((state) => state.setLoading);
  const setError = useCartStore((state) => state.setError);
  const clearError = useCartStore((state) => state.clearError);
  const setLastUpdated = useCartStore((state) => state.setLastUpdated);
  const syncWithServer = useCartStore((state) => state.syncWithServer);
  const loadFromServer = useCartStore((state) => state.loadFromServer);
  const getItemById = useCartStore((state) => state.getItemById);
  const getItemByProductInfo = useCartStore(
    (state) => state.getItemByProductInfo
  );
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalBySeller = useCartStore((state) => state.getTotalBySeller);
  const getUniqueSellers = useCartStore((state) => state.getUniqueSellers);

  return {
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    addMultipleItems,
    removeMultipleItems,
    setLoading,
    setError,
    clearError,
    setLastUpdated,
    syncWithServer,
    loadFromServer,
    getItemById,
    getItemByProductInfo,
    getTotalItems,
    getTotalPrice,
    getTotalBySeller,
    getUniqueSellers,
  };
};
