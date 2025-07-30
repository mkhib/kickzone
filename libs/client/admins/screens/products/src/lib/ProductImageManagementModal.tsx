import React, { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import WarningIcon from '@mui/icons-material/Warning';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useProducts } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
// TODO: Import from the new store once it's created
// import { useAdminsProductsStore } from '@kickzone-workspace/admins-products-store';

interface ProductImageManagementModalProps {
  open: boolean;
  onClose: () => void;
  product: KickzoneGraphqlTypes.Product | null;
  onProductUpdated?: () => void;
}

interface DeleteImageModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageName: string;
  isLoading?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  productInfoId: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, productInfoId, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`image-tabpanel-${productInfoId}`}
      aria-labelledby={`image-tab-${productInfoId}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DeleteImageModal = ({
  open,
  onClose,
  onConfirm,
  imageName,
  isLoading = false,
}: DeleteImageModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <WarningIcon color="warning" />
      Delete Image
    </DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete the image "{imageName}"? This action
        cannot be undone.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </DialogActions>
  </Dialog>
);

export function ProductImageManagementModal({
  open,
  onClose,
  product,
  onProductUpdated,
}: ProductImageManagementModalProps) {
  // Use Zustand store instead of local state
  const {
    currentProduct,
    imageModal,
    deleteModal,
    openImageModal,
    closeImageModal,
    setSelectedTab,
    addSelectedFiles,
    removeSelectedFile,
    setUploading,
    clearSelectedFiles,
    openDeleteModal,
    closeDeleteModal,
    setDeleteModalLoading,
    updateProductImages,
  } = useAdminsProductsStore();

  const { uploadProductInfoImages, removeProductInfoImage } = useProducts();
  const { showSnackbar } = useSnackbarContext();

  // Update store when modal opens/closes
  React.useEffect(() => {
    if (open && product) {
      // Only reset tab if the modal wasn't already open
      const shouldResetTab = !imageModal.open;
      openImageModal(product, shouldResetTab);
    } else if (!open) {
      closeImageModal();
    }
  }, [open, product, openImageModal, closeImageModal, imageModal.open]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log('🔄 handleTabChange called:', {
      oldValue: imageModal.selectedTab,
      newValue,
    });
    setSelectedTab(newValue);
  };

  const handleFileSelection = useCallback(
    (productInfoId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      const newFiles = Array.from(files);

      // Validate file types
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      const invalidFiles = newFiles.filter(
        (file) => !validImageTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        showSnackbar('Only image files (JPEG, PNG, GIF, WEBP) are allowed', {
          severity: 'error',
        });
        return;
      }

      // Validate file sizes (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        showSnackbar('Some files exceed the maximum size of 5MB', {
          severity: 'error',
        });
        return;
      }

      addSelectedFiles(productInfoId, newFiles);
    },
    [addSelectedFiles, showSnackbar]
  );

  const handleUploadImages = useCallback(
    async (productInfoId: number) => {
      const files = imageModal.selectedFiles[productInfoId];
      if (!files || files.length === 0) return;

      setUploading(productInfoId, true);
      try {
        const result = await uploadProductInfoImages(productInfoId, files);

        // Update the store with new images
        if (currentProduct) {
          const productInfo = currentProduct.productInfos.find(
            (info) => info.id === productInfoId
          );
          if (productInfo && result) {
            updateProductImages(productInfoId, result);
          }
        }

        clearSelectedFiles(productInfoId);
        showSnackbar('Images uploaded successfully', { severity: 'success' });
        onProductUpdated?.();
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      } finally {
        setUploading(productInfoId, false);
      }
    },
    [
      imageModal.selectedFiles,
      uploadProductInfoImages,
      setUploading,
      clearSelectedFiles,
      showSnackbar,
      onProductUpdated,
      currentProduct,
      updateProductImages,
    ]
  );

  const handleRemoveImage = useCallback(
    (productInfoId: number, imageUrl: string) => {
      const imageName = imageUrl.split('/').pop();
      if (!imageName) return;
      openDeleteModal(productInfoId, imageUrl, imageName);
    },
    [openDeleteModal]
  );

  const handleClose = () => {
    // Clear all selected files when closing
    Object.keys(imageModal.selectedFiles).forEach((productInfoId) => {
      clearSelectedFiles(parseInt(productInfoId));
    });
    closeImageModal();
    onClose?.();
  };

  const handleConfirmDeleteImage = useCallback(async () => {
    if (!deleteModal.productInfoId || !deleteModal.imageName) {
      closeDeleteModal();
      return;
    }

    setDeleteModalLoading(true);
    try {
      await removeProductInfoImage(
        deleteModal.productInfoId,
        deleteModal.imageName
      );

      // Update the store to remove the deleted image
      if (currentProduct) {
        const productInfo = currentProduct.productInfos.find(
          (info) => info.id === deleteModal.productInfoId
        );
        if (productInfo && productInfo.images) {
          const updatedImages = productInfo.images.filter(
            (img) => !img.includes(deleteModal.imageName!)
          );
          updateProductImages(deleteModal.productInfoId, updatedImages);
        }
      }

      showSnackbar('Image removed successfully', { severity: 'success' });
      onProductUpdated?.();
    } catch (error) {
      showSnackbar((error as Error).message, { severity: 'error' });
    } finally {
      setDeleteModalLoading(false);
      closeDeleteModal();
    }
  }, [
    deleteModal.productInfoId,
    deleteModal.imageName,
    removeProductInfoImage,
    setDeleteModalLoading,
    closeDeleteModal,
    showSnackbar,
    onProductUpdated,
    currentProduct,
    updateProductImages,
  ]);

  if (!currentProduct) {
    return null;
  }

  return (
    <>
      <Dialog
        open={imageModal.open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Images - {currentProduct.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={imageModal.selectedTab} onChange={handleTabChange}>
              {currentProduct.productInfos.map((productInfo, index) => (
                <Tab
                  key={productInfo.id}
                  label={`${productInfo.size}${
                    productInfo.color ? ` - ${productInfo.color.name}` : ''
                  }`}
                  id={`image-tab-${productInfo.id}`}
                  aria-controls={`image-tabpanel-${productInfo.id}`}
                />
              ))}
            </Tabs>
          </Box>
          {currentProduct.productInfos.map((productInfo, index) => (
            <TabPanel
              key={productInfo.id}
              value={imageModal.selectedTab}
              index={index}
              productInfoId={productInfo.id}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Variant: {productInfo.size}
                  {productInfo.color && ` - ${productInfo.color.name}`}
                </Typography>
                {/* Current Images */}
                <Typography variant="subtitle1" gutterBottom>
                  Current Images ({productInfo.images?.length || 0})
                </Typography>
                {productInfo.images && productInfo.images.length > 0 ? (
                  <Grid2 container spacing={2} sx={{ mb: 3 }}>
                    {productInfo.images.map((imageUrl, imageIndex) => (
                      <Grid2 key={imageIndex} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={
                              imageUrl.startsWith('/uploads/')
                                ? `https://localhost:4000${imageUrl}`
                                : imageUrl
                            }
                            alt={`Product image ${imageIndex + 1}`}
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardActions>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() =>
                                handleRemoveImage(productInfo.id, imageUrl)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid2>
                    ))}
                  </Grid2>
                ) : (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    No images uploaded for this variant yet.
                  </Alert>
                )}
                {/* Add New Images */}
                <Typography variant="subtitle1" gutterBottom>
                  Add New Images
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`file-input-${productInfo.id}`}
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelection(productInfo.id, e)}
                  />
                  <label htmlFor={`file-input-${productInfo.id}`}>
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<AddPhotoIcon />}
                      sx={{ mr: 2 }}
                    >
                      Select Images
                    </Button>
                  </label>
                  {imageModal.selectedFiles[productInfo.id] &&
                    imageModal.selectedFiles[productInfo.id].length > 0 && (
                      <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={() => handleUploadImages(productInfo.id)}
                        disabled={imageModal.uploading[productInfo.id]}
                      >
                        {imageModal.uploading[productInfo.id]
                          ? 'Uploading...'
                          : 'Upload Images'}
                      </Button>
                    )}
                </Box>
                {/* Selected Files Preview */}
                {imageModal.selectedFilePreviews[productInfo.id] &&
                  imageModal.selectedFilePreviews[productInfo.id].length >
                    0 && (
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Selected files (
                        {imageModal.selectedFilePreviews[productInfo.id].length}
                        ):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {imageModal.selectedFilePreviews[productInfo.id].map(
                          (preview, fileIndex) => (
                            <Chip
                              key={fileIndex}
                              label={preview.file.name}
                              size="small"
                              onDelete={() => {
                                removeSelectedFile(productInfo.id, fileIndex);
                              }}
                            />
                          )
                        )}
                      </Box>
                      {/* Image Thumbnails */}
                      <Typography variant="body2" gutterBottom>
                        Image Previews:
                      </Typography>
                      <Grid2 container spacing={2} sx={{ mb: 2 }}>
                        {imageModal.selectedFilePreviews[productInfo.id].map(
                          (preview, fileIndex) => (
                            <Grid2
                              key={fileIndex}
                              size={{ xs: 12, sm: 6, md: 4 }}
                            >
                              <Card>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={preview.url}
                                  alt={`Selected image ${fileIndex + 1}`}
                                  sx={{ objectFit: 'cover' }}
                                />
                                <CardActions>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                      removeSelectedFile(
                                        productInfo.id,
                                        fileIndex
                                      );
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </CardActions>
                              </Card>
                            </Grid2>
                          )
                        )}
                      </Grid2>
                    </Box>
                  )}
              </Box>
            </TabPanel>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <DeleteImageModal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDeleteImage}
        imageName={deleteModal.imageName || ''}
        isLoading={deleteModal.isLoading}
      />
    </>
  );
}
