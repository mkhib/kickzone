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

  // Filter states
  search: string;
  category: string;
  sort: string;
  sortOrder: 'asc' | 'desc';
  status: KickzoneGraphqlTypes.ProductArchivedStatus;
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

  // Filter actions
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSellersProductsSortField: (sortField: string) => void;
  setSellersProductsSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setStatus: (status: KickzoneGraphqlTypes.ProductArchivedStatus) => void;
  resetFilters: () => void;
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
    // Filter initial state
    search: '',
    category: '',
    sort: '',
    sortOrder: 'asc',
    status: KickzoneGraphqlTypes.ProductArchivedStatus.Active,

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

    // Filter actions
    setSearch: (search) => {
      set((state) => {
        state.search = search;
      });
    },

    setCategory: (category) => {
      set((state) => {
        state.category = category;
      });
    },

    setSellersProductsSortField: (sortField) => {
      set((state) => {
        state.sort = sortField;
      });
    },

    setSellersProductsSortOrder: (sortOrder) => {
      set((state) => {
        state.sortOrder = sortOrder;
      });
    },

    setStatus: (status) => {
      set((state) => {
        state.status = status;
      });
    },

    resetFilters: () => {
      set((state) => {
        state.search = '';
        state.category = '';
        state.sort = '';
        state.sortOrder = 'asc';
        state.status = KickzoneGraphqlTypes.ProductArchivedStatus.Active;
      });
    },
  }))
);
