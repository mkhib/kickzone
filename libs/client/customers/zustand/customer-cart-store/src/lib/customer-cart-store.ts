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
  productInfoId: string;
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

        if (existingItem) {
          // Update existing item quantity
          get().updateItemQuantity(
            existingItem.id,
            existingItem.quantity + itemData.quantity
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            ...itemData,
            id: generateId(),
            totalPrice: itemData.unitPrice * itemData.quantity,
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

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity,
                  totalPrice: item.unitPrice * quantity,
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
export const useCartTotal = () =>
  useCartStore((state) => state.getTotalPrice());
export const useCartItemCount = () =>
  useCartStore((state) => state.getTotalItems());

export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateItemQuantity: state.updateItemQuantity,
    clearCart: state.clearCart,
    addMultipleItems: state.addMultipleItems,
    removeMultipleItems: state.removeMultipleItems,
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
    setLastUpdated: state.setLastUpdated,
    syncWithServer: state.syncWithServer,
    loadFromServer: state.loadFromServer,
    getItemById: state.getItemById,
    getItemByProductInfo: state.getItemByProductInfo,
    getTotalItems: state.getTotalItems,
    getTotalPrice: state.getTotalPrice,
    getTotalBySeller: state.getTotalBySeller,
    getUniqueSellers: state.getUniqueSellers,
  }));
