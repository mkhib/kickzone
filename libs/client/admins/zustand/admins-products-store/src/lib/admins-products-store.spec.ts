import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAdminsProductsStore } from './admins-products-store';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

const mockProduct: KickzoneGraphqlTypes.Product = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  categories: [],
  productInfos: [
    {
      id: 10,
      size: 'M',
      weight: 1.5,
      colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
      images: ['/uploads/image1.jpg', '/uploads/image2.jpg'],
    },
    {
      id: 20,
      size: 'L',
      weight: 1.8,
      colors: [{ id: 2, name: 'Blue', hexCode: '#0000ff' }],
      images: [],
    },
  ],
};

describe('useAdminsProductsStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAdminsProductsStore.setState({
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
    });
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useAdminsProductsStore.getState();
      expect(state.currentProduct).toBeNull();
      expect(state.imageModal.open).toBe(false);
      expect(state.imageModal.selectedTab).toBe(0);
      expect(state.deleteModal.open).toBe(false);
    });
  });

  describe('openImageModal', () => {
    it('should open image modal with product', () => {
      const { openImageModal } = useAdminsProductsStore.getState();
      openImageModal(mockProduct);

      const state = useAdminsProductsStore.getState();
      expect(state.currentProduct).toEqual(mockProduct);
      expect(state.imageModal.open).toBe(true);
      expect(state.imageModal.selectedTab).toBe(0);
    });

    it('should reset tab when resetTab is true', () => {
      // First open with tab 2
      useAdminsProductsStore.setState({
        imageModal: {
          open: true,
          selectedTab: 2,
          selectedFiles: {},
          selectedFilePreviews: {},
          uploading: {},
        },
      });

      const { openImageModal } = useAdminsProductsStore.getState();
      openImageModal(mockProduct, true);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedTab).toBe(0);
    });

    it('should preserve tab when resetTab is false', () => {
      useAdminsProductsStore.setState({
        imageModal: {
          open: true,
          selectedTab: 2,
          selectedFiles: {},
          selectedFilePreviews: {},
          uploading: {},
        },
      });

      const { openImageModal } = useAdminsProductsStore.getState();
      openImageModal(mockProduct, false);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedTab).toBe(2);
    });

    it('should clear selected files when opening modal', () => {
      useAdminsProductsStore.setState({
        imageModal: {
          open: false,
          selectedTab: 0,
          selectedFiles: { 1: [new File([], 'test.jpg')] },
          selectedFilePreviews: { 1: [] },
          uploading: { 1: false },
        },
      });

      const { openImageModal } = useAdminsProductsStore.getState();
      openImageModal(mockProduct);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles).toEqual({});
      expect(state.imageModal.selectedFilePreviews).toEqual({});
    });
  });

  describe('closeImageModal', () => {
    it('should close image modal', () => {
      useAdminsProductsStore.setState({
        imageModal: {
          open: true,
          selectedTab: 1,
          selectedFiles: {},
          selectedFilePreviews: {},
          uploading: {},
        },
      });

      const { closeImageModal } = useAdminsProductsStore.getState();
      closeImageModal();

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.open).toBe(false);
    });

    it('should clear selected files when closing', () => {
      useAdminsProductsStore.setState({
        imageModal: {
          open: true,
          selectedTab: 0,
          selectedFiles: { 1: [new File([], 'test.jpg')] },
          selectedFilePreviews: { 1: [] },
          uploading: { 1: true },
        },
      });

      const { closeImageModal } = useAdminsProductsStore.getState();
      closeImageModal();

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles).toEqual({});
      expect(state.imageModal.selectedFilePreviews).toEqual({});
      expect(state.imageModal.uploading).toEqual({});
    });

    it('should close delete modal when closing image modal', () => {
      useAdminsProductsStore.setState({
        deleteModal: {
          open: true,
          productInfoId: 1,
          imageUrl: '/test.jpg',
          imageName: 'test.jpg',
          isLoading: false,
        },
      });

      const { closeImageModal } = useAdminsProductsStore.getState();
      closeImageModal();

      const state = useAdminsProductsStore.getState();
      expect(state.deleteModal.open).toBe(false);
    });
  });

  describe('setSelectedTab', () => {
    it('should update selected tab', () => {
      const { setSelectedTab } = useAdminsProductsStore.getState();
      setSelectedTab(3);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedTab).toBe(3);
    });
  });

  describe('addSelectedFiles', () => {
    it('should add files to selected files', () => {
      const file1 = new File(['content1'], 'test1.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content2'], 'test2.jpg', { type: 'image/jpeg' });

      const { addSelectedFiles } = useAdminsProductsStore.getState();
      addSelectedFiles(10, [file1, file2]);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles[10]).toHaveLength(2);
      expect(state.imageModal.selectedFilePreviews[10]).toHaveLength(2);
      expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
    });

    it('should append to existing files', () => {
      const file1 = new File(['content1'], 'test1.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content2'], 'test2.jpg', { type: 'image/jpeg' });

      const { addSelectedFiles } = useAdminsProductsStore.getState();
      addSelectedFiles(10, [file1]);
      addSelectedFiles(10, [file2]);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles[10]).toHaveLength(2);
    });
  });

  describe('removeSelectedFile', () => {
    it('should remove file from selected files', () => {
      const file1 = new File(['content1'], 'test1.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content2'], 'test2.jpg', { type: 'image/jpeg' });

      const { addSelectedFiles, removeSelectedFile } =
        useAdminsProductsStore.getState();
      addSelectedFiles(10, [file1, file2]);
      removeSelectedFile(10, 0);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles[10]).toHaveLength(1);
      expect(state.imageModal.selectedFilePreviews[10]).toHaveLength(1);
      expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
    });

    it('should handle removing from empty array', () => {
      const { removeSelectedFile } = useAdminsProductsStore.getState();
      removeSelectedFile(10, 0);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles[10]).toEqual([]);
    });
  });

  describe('setUploading', () => {
    it('should set uploading state for productInfo', () => {
      const { setUploading } = useAdminsProductsStore.getState();
      setUploading(10, true);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.uploading[10]).toBe(true);
    });

    it('should update uploading state', () => {
      const { setUploading } = useAdminsProductsStore.getState();
      setUploading(10, true);
      setUploading(10, false);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.uploading[10]).toBe(false);
    });
  });

  describe('clearSelectedFiles', () => {
    it('should clear selected files for productInfo', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const { addSelectedFiles, clearSelectedFiles } =
        useAdminsProductsStore.getState();

      addSelectedFiles(10, [file]);
      clearSelectedFiles(10);

      const state = useAdminsProductsStore.getState();
      expect(state.imageModal.selectedFiles[10]).toEqual([]);
      expect(state.imageModal.selectedFilePreviews[10]).toEqual([]);
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('openDeleteModal', () => {
    it('should open delete modal with image info', () => {
      const { openDeleteModal } = useAdminsProductsStore.getState();
      openDeleteModal(10, '/uploads/test.jpg', 'test.jpg');

      const state = useAdminsProductsStore.getState();
      expect(state.deleteModal.open).toBe(true);
      expect(state.deleteModal.productInfoId).toBe(10);
      expect(state.deleteModal.imageUrl).toBe('/uploads/test.jpg');
      expect(state.deleteModal.imageName).toBe('test.jpg');
      expect(state.deleteModal.isLoading).toBe(false);
    });
  });

  describe('closeDeleteModal', () => {
    it('should close delete modal and reset state', () => {
      useAdminsProductsStore.setState({
        deleteModal: {
          open: true,
          productInfoId: 10,
          imageUrl: '/test.jpg',
          imageName: 'test.jpg',
          isLoading: true,
        },
      });

      const { closeDeleteModal } = useAdminsProductsStore.getState();
      closeDeleteModal();

      const state = useAdminsProductsStore.getState();
      expect(state.deleteModal.open).toBe(false);
      expect(state.deleteModal.productInfoId).toBeNull();
      expect(state.deleteModal.imageUrl).toBeNull();
      expect(state.deleteModal.imageName).toBeNull();
      expect(state.deleteModal.isLoading).toBe(false);
    });
  });

  describe('setDeleteModalLoading', () => {
    it('should update delete modal loading state', () => {
      const { setDeleteModalLoading } = useAdminsProductsStore.getState();
      setDeleteModalLoading(true);

      const state = useAdminsProductsStore.getState();
      expect(state.deleteModal.isLoading).toBe(true);
    });
  });

  describe('updateProductImages', () => {
    it('should update product images for specific productInfo', () => {
      useAdminsProductsStore.setState({ currentProduct: mockProduct });

      const { updateProductImages } = useAdminsProductsStore.getState();
      const newImages = [
        '/uploads/new1.jpg',
        '/uploads/new2.jpg',
        '/uploads/new3.jpg',
      ];
      updateProductImages(10, newImages);

      const state = useAdminsProductsStore.getState();
      const updatedProductInfo = state.currentProduct?.productInfos.find(
        (pi) => pi.id === 10
      );
      expect(updatedProductInfo?.images).toEqual(newImages);
    });

    it('should not update other productInfo images', () => {
      useAdminsProductsStore.setState({ currentProduct: mockProduct });

      const { updateProductImages } = useAdminsProductsStore.getState();
      const newImages = ['/uploads/new1.jpg'];
      updateProductImages(10, newImages);

      const state = useAdminsProductsStore.getState();
      const otherProductInfo = state.currentProduct?.productInfos.find(
        (pi) => pi.id === 20
      );
      expect(otherProductInfo?.images).toEqual([]);
    });

    it('should handle null currentProduct gracefully', () => {
      useAdminsProductsStore.setState({ currentProduct: null });

      const { updateProductImages } = useAdminsProductsStore.getState();
      updateProductImages(10, ['/uploads/new.jpg']);

      const state = useAdminsProductsStore.getState();
      expect(state.currentProduct).toBeNull();
    });
  });
});
