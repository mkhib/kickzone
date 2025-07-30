import { create } from 'zustand';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Types for the store
interface ImageModalState {
  open: boolean;
  selectedTab: number;
  selectedFiles: Record<number, File[]>;
  selectedFilePreviews: Record<number, Array<{ file: File; url: string }>>;
  uploading: Record<number, boolean>;
}

interface DeleteModalState {
  open: boolean;
  productInfoId: number | null;
  imageUrl: string | null;
  imageName: string | null;
  isLoading: boolean;
}

interface AdminsProductsStore {
  // Current product being managed
  currentProduct: KickzoneGraphqlTypes.Product | null;

  // Image management modal state
  imageModal: ImageModalState;

  // Delete confirmation modal state
  deleteModal: DeleteModalState;

  // Actions
  openImageModal: (
    product: KickzoneGraphqlTypes.Product,
    resetTab?: boolean
  ) => void;
  closeImageModal: () => void;
  setSelectedTab: (tabIndex: number) => void;
  addSelectedFiles: (productInfoId: number, files: File[]) => void;
  removeSelectedFile: (productInfoId: number, fileIndex: number) => void;
  setUploading: (productInfoId: number, uploading: boolean) => void;
  clearSelectedFiles: (productInfoId: number) => void;

  // Delete modal actions
  openDeleteModal: (
    productInfoId: number,
    imageUrl: string,
    imageName: string
  ) => void;
  closeDeleteModal: () => void;
  setDeleteModalLoading: (loading: boolean) => void;

  // Product update actions
  updateProductImages: (productInfoId: number, images: string[]) => void;
}

export const useAdminsProductsStore = create<AdminsProductsStore>(
  (set, get) => ({
    // Initial state
    currentProduct: null,

    imageModal: {
      open: false,
      selectedTab: 0,
      selectedFiles: {},
      selectedFilePreviews: {},
      uploading: {},
    },

    deleteModal: {
      open: false,
      productInfoId: null,
      imageUrl: null,
      imageName: null,
      isLoading: false,
    },

    // Actions
    openImageModal: (product, resetTab = true) => {
      set((state) => ({
        currentProduct: product,
        imageModal: {
          ...state.imageModal,
          open: true,
          selectedTab: resetTab ? 0 : state.imageModal.selectedTab,
          selectedFiles: {},
          selectedFilePreviews: {},
          uploading: {},
        },
      }));
    },

    closeImageModal: () => {
      set((state) => ({
        imageModal: {
          ...state.imageModal,
          open: false,
          selectedFiles: {},
          selectedFilePreviews: {},
          uploading: {},
        },
        deleteModal: {
          ...state.deleteModal,
          open: false,
        },
      }));
    },

    setSelectedTab: (tabIndex) => {
      set((state) => ({
        imageModal: {
          ...state.imageModal,
          selectedTab: tabIndex,
        },
      }));
    },

    addSelectedFiles: (productInfoId, files) => {
      set((state) => {
        const currentFiles =
          state.imageModal.selectedFiles[productInfoId] || [];
        const currentPreviews =
          state.imageModal.selectedFilePreviews[productInfoId] || [];

        // Create preview URLs for new files
        const newPreviews = files.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));

        return {
          imageModal: {
            ...state.imageModal,
            selectedFiles: {
              ...state.imageModal.selectedFiles,
              [productInfoId]: [...currentFiles, ...files],
            },
            selectedFilePreviews: {
              ...state.imageModal.selectedFilePreviews,
              [productInfoId]: [...currentPreviews, ...newPreviews],
            },
          },
        };
      });
    },

    removeSelectedFile: (productInfoId, fileIndex) => {
      set((state) => {
        const currentFiles =
          state.imageModal.selectedFiles[productInfoId] || [];
        const currentPreviews =
          state.imageModal.selectedFilePreviews[productInfoId] || [];

        // Revoke the object URL to prevent memory leaks
        if (currentPreviews[fileIndex]) {
          URL.revokeObjectURL(currentPreviews[fileIndex].url);
        }

        const newFiles = currentFiles.filter((_, index) => index !== fileIndex);
        const newPreviews = currentPreviews.filter(
          (_, index) => index !== fileIndex
        );

        return {
          imageModal: {
            ...state.imageModal,
            selectedFiles: {
              ...state.imageModal.selectedFiles,
              [productInfoId]: newFiles,
            },
            selectedFilePreviews: {
              ...state.imageModal.selectedFilePreviews,
              [productInfoId]: newPreviews,
            },
          },
        };
      });
    },

    setUploading: (productInfoId, uploading) => {
      set((state) => ({
        imageModal: {
          ...state.imageModal,
          uploading: {
            ...state.imageModal.uploading,
            [productInfoId]: uploading,
          },
        },
      }));
    },

    clearSelectedFiles: (productInfoId) => {
      set((state) => {
        const currentPreviews =
          state.imageModal.selectedFilePreviews[productInfoId] || [];

        // Revoke all object URLs to prevent memory leaks
        currentPreviews.forEach((preview) => {
          URL.revokeObjectURL(preview.url);
        });

        return {
          imageModal: {
            ...state.imageModal,
            selectedFiles: {
              ...state.imageModal.selectedFiles,
              [productInfoId]: [],
            },
            selectedFilePreviews: {
              ...state.imageModal.selectedFilePreviews,
              [productInfoId]: [],
            },
          },
        };
      });
    },

    openDeleteModal: (productInfoId, imageUrl, imageName) => {
      set((state) => ({
        deleteModal: {
          open: true,
          productInfoId,
          imageUrl,
          imageName,
          isLoading: false,
        },
      }));
    },

    closeDeleteModal: () => {
      set((state) => ({
        deleteModal: {
          ...state.deleteModal,
          open: false,
          productInfoId: null,
          imageUrl: null,
          imageName: null,
          isLoading: false,
        },
      }));
    },

    setDeleteModalLoading: (loading) => {
      set((state) => ({
        deleteModal: {
          ...state.deleteModal,
          isLoading: loading,
        },
      }));
    },

    updateProductImages: (productInfoId, images) => {
      set((state) => {
        if (!state.currentProduct) return state;

        const updatedProductInfos = state.currentProduct.productInfos.map(
          (info) => (info.id === productInfoId ? { ...info, images } : info)
        );

        return {
          currentProduct: {
            ...state.currentProduct,
            productInfos: updatedProductInfos,
          },
        };
      });
    },
  })
);
