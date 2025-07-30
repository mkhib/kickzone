import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Define the shape of our seller product state
interface SellerProductState {
  // Current product being managed
  currentProduct: KickzoneGraphqlTypes.Product | null;

  // Product management modal state
  productModal: {
    open: boolean;
    mode: 'create' | 'edit';
    selectedTab: number;
  };

  // Product list state
  products: {
    items: KickzoneGraphqlTypes.Product[];
    isLoading: boolean;
    error: string | null;
  };
}

// Define the actions
interface SellerProductActions {
  // Product management
  setCurrentProduct: (product: KickzoneGraphqlTypes.Product | null) => void;
  updateProduct: (
    productId: number,
    updates: Partial<KickzoneGraphqlTypes.Product>
  ) => void;

  // Product modal actions
  openProductModal: (
    mode: 'create' | 'edit',
    product?: KickzoneGraphqlTypes.Product
  ) => void;
  closeProductModal: () => void;
  setSelectedTab: (tabIndex: number) => void;

  // Product list actions
  setProducts: (products: KickzoneGraphqlTypes.Product[]) => void;
  addProduct: (product: KickzoneGraphqlTypes.Product) => void;
  removeProduct: (productId: number) => void;
  setProductsLoading: (loading: boolean) => void;
  setProductsError: (error: string | null) => void;
}

// Create the store
export const useSellersProductsStore = create<
  SellerProductState & SellerProductActions
>()(
  immer((set) => ({
    // Initial state
    currentProduct: null,
    productModal: {
      open: false,
      mode: 'create',
      selectedTab: 0,
    },
    products: {
      items: [],
      isLoading: false,
      error: null,
    },

    // Actions
    setCurrentProduct: (product) => {
      set((state) => {
        state.currentProduct = product;
      });
    },

    updateProduct: (productId, updates) => {
      set((state) => {
        const productIndex = state.products.items.findIndex(
          (p) => p.id === productId
        );
        if (productIndex !== -1) {
          Object.assign(state.products.items[productIndex], updates);
        }
        if (state.currentProduct?.id === productId) {
          Object.assign(state.currentProduct, updates);
        }
      });
    },

    openProductModal: (mode, product) => {
      set((state) => {
        state.productModal.open = true;
        state.productModal.mode = mode;
        state.productModal.selectedTab = 0;
        if (product) {
          state.currentProduct = product;
        }
      });
    },

    closeProductModal: () => {
      set((state) => {
        state.productModal.open = false;
        state.productModal.selectedTab = 0;
        state.currentProduct = null;
      });
    },

    setSelectedTab: (tabIndex) => {
      set((state) => {
        state.productModal.selectedTab = tabIndex;
      });
    },

    setProducts: (products) => {
      set((state) => {
        state.products.items = products;
      });
    },

    addProduct: (product) => {
      set((state) => {
        state.products.items.push(product);
      });
    },

    removeProduct: (productId) => {
      set((state) => {
        state.products.items = state.products.items.filter(
          (p) => p.id !== productId
        );
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
  }))
);
