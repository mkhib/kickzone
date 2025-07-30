import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Define the shape of our customer product state
interface CustomerProductState {
  // Product browsing state
  products: {
    items: KickzoneGraphqlTypes.Product[];
    isLoading: boolean;
    error: string | null;
    filters: {
      category?: string;
      color?: string;
      size?: string;
      priceRange?: { min: number; max: number };
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };

  // Shopping cart state
  cart: {
    items: Array<{
      productId: number;
      productInfoId: number;
      quantity: number;
      product: KickzoneGraphqlTypes.Product;
      selectedVariant: KickzoneGraphqlTypes.ProductInfo;
    }>;
  };

  // Wishlist state
  wishlist: {
    items: KickzoneGraphqlTypes.Product[];
  };
}

// Define the actions
interface CustomerProductActions {
  // Product browsing actions
  setProducts: (products: KickzoneGraphqlTypes.Product[]) => void;
  setProductsLoading: (loading: boolean) => void;
  setProductsError: (error: string | null) => void;
  setFilters: (
    filters: Partial<CustomerProductState['products']['filters']>
  ) => void;
  setPagination: (
    pagination: Partial<CustomerProductState['products']['pagination']>
  ) => void;

  // Cart actions
  addToCart: (
    product: KickzoneGraphqlTypes.Product,
    variant: KickzoneGraphqlTypes.ProductInfo,
    quantity: number
  ) => void;
  removeFromCart: (productId: number, productInfoId: number) => void;
  updateCartItemQuantity: (
    productId: number,
    productInfoId: number,
    quantity: number
  ) => void;
  clearCart: () => void;

  // Wishlist actions
  addToWishlist: (product: KickzoneGraphqlTypes.Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

// Create the store
export const useCustomersProductsStore = create<
  CustomerProductState & CustomerProductActions
>()(
  immer((set, get) => ({
    // Initial state
    products: {
      items: [],
      isLoading: false,
      error: null,
      filters: {},
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
      },
    },
    cart: {
      items: [],
    },
    wishlist: {
      items: [],
    },

    // Actions
    setProducts: (products) => {
      set((state) => {
        state.products.items = products;
      });
    },

    setProductsLoading: (loading) => {
      set((state) => {
        state.products.isLoading = loading;
      });
    },

    setProductsError: (error) => {
      set((state) => {
        state.products.error = error;
      });
    },

    setFilters: (filters) => {
      set((state) => {
        state.products.filters = { ...state.products.filters, ...filters };
      });
    },

    setPagination: (pagination) => {
      set((state) => {
        state.products.pagination = {
          ...state.products.pagination,
          ...pagination,
        };
      });
    },

    addToCart: (product, variant, quantity) => {
      set((state) => {
        const existingItem = state.cart.items.find(
          (item) =>
            item.productId === product.id && item.productInfoId === variant.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.cart.items.push({
            productId: product.id,
            productInfoId: variant.id,
            quantity,
            product,
            selectedVariant: variant,
          });
        }
      });
    },

    removeFromCart: (productId, productInfoId) => {
      set((state) => {
        state.cart.items = state.cart.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.productInfoId === productInfoId
            )
        );
      });
    },

    updateCartItemQuantity: (productId, productInfoId, quantity) => {
      set((state) => {
        const item = state.cart.items.find(
          (item) =>
            item.productId === productId && item.productInfoId === productInfoId
        );
        if (item) {
          item.quantity = quantity;
        }
      });
    },

    clearCart: () => {
      set((state) => {
        state.cart.items = [];
      });
    },

    addToWishlist: (product) => {
      set((state) => {
        const exists = state.wishlist.items.some(
          (item) => item.id === product.id
        );
        if (!exists) {
          state.wishlist.items.push(product);
        }
      });
    },

    removeFromWishlist: (productId) => {
      set((state) => {
        state.wishlist.items = state.wishlist.items.filter(
          (item) => item.id !== productId
        );
      });
    },

    clearWishlist: () => {
      set((state) => {
        state.wishlist.items = [];
      });
    },
  }))
);
