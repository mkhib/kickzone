import { ApolloError } from '@apollo/client';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useCategories } from '@kickzone-workspace/categories-hook';
import { colors } from '@kickzone-workspace/colors';
import { useProducts } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { Tooltip } from '@mui/material';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
  title: string;
  isLoading?: boolean;
}

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  initialName = '',
  title,
  isLoading = false,
}: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState(initialName);

  useEffect(() => {
    setCategoryName(initialName);
  }, [initialName]);

  const handleSubmit = useCallback(() => {
    onSubmit(categoryName);
    setCategoryName('');
    onClose();
  }, [categoryName, onSubmit, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          slotProps={{
            input: { 'aria-label': 'Category Name' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  isLoading?: boolean;
}

const DeleteCategoryModal = ({
  open,
  onClose,
  onConfirm,
  categoryName,
  isLoading = false,
}: DeleteCategoryModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Delete Category
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the category "{categoryName}"? This
          action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreviewCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: theme.spacing(1),
  position: 'relative',
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

// Move ProductInfoState type to top level and export it
export type ProductInfoState = KickzoneGraphqlTypes.CreateProductInfoInput & {
  images: File[];
  imagePreviews: string[];
  uploadedImageUrls: string[];
  createdId: number | null;
  isUploading: boolean;
  newImages: File[];
  newImagePreviews: string[];
};

interface ProductInfoCardProps {
  info: ProductInfoState;
  idx: number;
  onChange: (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (idx: number) => void;
  onRemoveImage: (infoIdx: number, imageIdx: number) => void;
  disableRemove: boolean;
}

const ProductInfoCard = React.memo(
  ({
    info,
    idx,
    onChange,
    onImageUpload,
    onRemove,
    onRemoveImage,
    disableRemove,
  }: ProductInfoCardProps) => {
    // Tooltip for upload button if product info is not created
    const uploadButton = (
      <Button
        component="label"
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
        disabled={!info.createdId || info.isUploading}
        sx={{
          backgroundColor: colors.main,
          '&:hover': { backgroundColor: colors.hoverMain },
        }}
      >
        {info.isUploading ? 'Uploading...' : 'Upload Images'}
        <VisuallyHiddenInput
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onImageUpload(idx, e)}
          disabled={!info.createdId || info.isUploading}
        />
      </Button>
    );
    return (
      <Paper sx={{ mb: 2, p: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Size"
            name="size"
            value={info.size}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Color"
            name="color"
            value={info.color}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={info.price}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Cost Price"
            name="costPrice"
            type="number"
            value={info.costPrice}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Weight (kg)"
            name="weight"
            type="number"
            value={info.weight}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            value={info.discount}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={info.stockQuantity}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, e)}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          {!info.createdId ? (
            <Tooltip title="Save the product first to upload images">
              <span>{uploadButton}</span>
            </Tooltip>
          ) : (
            uploadButton
          )}
          <IconButton
            onClick={() => onRemove(idx)}
            color="error"
            aria-label="Remove variant"
            sx={{ ml: 1 }}
            disabled={disableRemove}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <ImagePreviewContainer>
          {info.uploadedImageUrls.map((preview: string, imageIdx: number) => (
            <ImagePreviewCard key={imageIdx}>
              <CardMedia
                component="img"
                height="140"
                image={preview}
                alt={`Product variant image ${imageIdx + 1}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {preview.split('/').pop()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => onRemoveImage(idx, imageIdx)}
                  sx={{ color: 'error.main' }}
                  aria-label="Delete image"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </ImagePreviewCard>
          ))}
        </ImagePreviewContainer>
      </Paper>
    );
  }
);

export function AdminProductEditor() {
  const [product, setProduct] = useState({
    name: '',
    categoryIds: [] as number[],
  });

  const [productInfos, setProductInfos] = useState<ProductInfoState[]>([
    {
      productId: 0,
      size: '',
      price: 0,
      costPrice: 0,
      color: '',
      weight: 0,
      discount: 0,
      stockQuantity: 0,
      images: [],
      imagePreviews: [],
      uploadedImageUrls: [],
      createdId: null,
      isUploading: false,
      newImages: [],
      newImagePreviews: [],
    },
  ]);

  const [createdProductInfoIds, setCreatedProductInfoIds] = useState<
    (number | null)[]
  >([null]);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    categoriesData,
    categoriesLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
  } = useCategories();

  const {
    createProductWithInfos,
    uploadProductInfoImages,
    removeProductInfoImage,
    isCreatingProduct,
  } = useProducts();
  const { showSnackbar } = useSnackbarContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handlers for product fields
  const handleProductChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handlers for product info fields
  const handleProductInfoChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [name]: value };
        return updated;
      });
    },
    []
  );

  // Add a new ProductInfo variant
  const handleAddProductInfo = useCallback(() => {
    setProductInfos((prev) => [
      ...prev,
      {
        productId: 0,
        size: '',
        price: 0,
        costPrice: 0,
        color: '',
        weight: 0,
        discount: 0,
        stockQuantity: 0,
        images: [],
        imagePreviews: [],
        uploadedImageUrls: [],
        createdId: null,
        isUploading: false,
        newImages: [],
        newImagePreviews: [],
      } as ProductInfoState,
    ]);
    setCreatedProductInfoIds((prev) => [...prev, null]);
  }, []);

  // Remove a ProductInfo variant
  const handleRemoveProductInfo = useCallback((index: number) => {
    setProductInfos((prev) => prev.filter((_, i) => i !== index));
    setCreatedProductInfoIds((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Handle image upload for a specific ProductInfo
  const handleImageUpload = useCallback(
    async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !createdProductInfoIds[index]) {
        if (!createdProductInfoIds[index]) {
          showSnackbar('Please save the product first to upload images', {
            severity: 'warning',
          });
        }
        return;
      }
      const newImages = Array.from(files);
      // Validate file types
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      const invalidFiles = newImages.filter(
        (file) => !validImageTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        showSnackbar('Only image files (JPEG, PNG, GIF, WEBP) are allowed', {
          severity: 'error',
        });
        return;
      }
      // Validate file sizes (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const oversizedFiles = newImages.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        showSnackbar('Some files exceed the maximum size of 5MB', {
          severity: 'error',
        });
        return;
      }
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[index].isUploading = true;
        return updated;
      });
      try {
        const productInfoId = createdProductInfoIds[index];
        if (!productInfoId) return;
        // Create preview URLs before upload
        const newPreviews = newImages.map((file) => URL.createObjectURL(file));
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[index].images = [
            ...(updated[index].images || []),
            ...newImages,
          ];
          updated[index].imagePreviews = [
            ...(updated[index].imagePreviews || []),
            ...newPreviews,
          ];
          return updated;
        });
        const uploadedUrls = await uploadProductInfoImages(
          productInfoId,
          newImages
        );
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[index].uploadedImageUrls = [
            ...(updated[index].uploadedImageUrls || []),
            ...uploadedUrls,
          ];
          updated[index].isUploading = false;
          return updated;
        });
        showSnackbar('Images uploaded successfully', { severity: 'success' });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[index].isUploading = false;
          return updated;
        });
      }
    },
    [createdProductInfoIds, uploadProductInfoImages, showSnackbar]
  );

  // Remove image for a specific ProductInfo
  const handleRemoveImage = useCallback(
    async (infoIndex: number, imageIndex: number) => {
      const productInfoId = createdProductInfoIds[infoIndex];
      if (!productInfoId) return;
      const imageUrl = productInfos[infoIndex].uploadedImageUrls[imageIndex];
      const imageName = imageUrl.split('/').pop();
      if (!imageName) return;
      try {
        await removeProductInfoImage(productInfoId, imageName);
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[infoIndex].uploadedImageUrls = updated[
            infoIndex
          ].uploadedImageUrls.filter((_, i) => i !== imageIndex);
          updated[infoIndex].images = updated[infoIndex].images.filter(
            (_, i) => i !== imageIndex
          );
          updated[infoIndex].imagePreviews = updated[
            infoIndex
          ].imagePreviews.filter((_, i) => i !== imageIndex);
          return updated;
        });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [createdProductInfoIds, productInfos, removeProductInfoImage, showSnackbar]
  );

  // Handle product creation
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Validate required fields
        if (!product.name || product.categoryIds.length === 0) {
          showSnackbar('Please fill in all required fields', {
            severity: 'error',
          });
          return;
        }
        for (const info of productInfos) {
          if (
            !info.size ||
            !info.color ||
            !info.price ||
            !info.costPrice ||
            !info.weight ||
            !info.stockQuantity
          ) {
            showSnackbar('Please fill in all product variant fields', {
              severity: 'error',
            });
            return;
          }
        }
        // Create product and all product infos
        const created = await createProductWithInfos(
          {
            name: product.name,
            categoryIds: product.categoryIds,
            discount: 0,
          },
          productInfos.map((info) => ({
            size: info.size,
            price: Number(info.price),
            costPrice: Number(info.costPrice),
            color: info.color,
            weight: Number(info.weight),
            discount: Number(info.discount) || 0,
            stockQuantity: Number(info.stockQuantity),
          }))
        );
        setCreatedProductInfoIds(created.productInfos.map((pi) => pi.id));
        setProductInfos((prev) =>
          prev.map((info, i) => ({
            ...info,
            createdId: created.productInfos[i]?.id || null,
          }))
        );
        showSnackbar('Product created successfully', { severity: 'success' });
      } catch (error) {
        const message = (error as Error).message;
        if (message.includes('already exists')) {
          showSnackbar(message, { severity: 'error' });
        } else {
          showSnackbar((error as Error).message, { severity: 'error' });
        }
      }
    },
    [product, productInfos, createProductWithInfos, showSnackbar]
  );

  const handleDeleteCategory = useCallback(async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      setIsDeleteCategoryModalOpen(false);
      setCategoryToDelete(null);
      showSnackbar('Category deleted successfully', { severity: 'success' });
    } catch (error) {
      const message = (error as Error).message;
      showSnackbar(message, { severity: 'error' });
    }
  }, [categoryToDelete, deleteCategory, showSnackbar]);

  const handleOpenDeleteCategoryModal = useCallback(
    (category: { id: number; name: string }) => {
      setCategoryToDelete(category);
      setIsDeleteCategoryModalOpen(true);
    },
    []
  );

  const handleCloseDeleteCategoryModal = useCallback(() => {
    setIsDeleteCategoryModalOpen(false);
    setCategoryToDelete(null);
  }, []);

  return (
    <AdminsLayout>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, color: colors.text }}>
          Add/Edit Product
        </Typography>
        <form aria-label="Product Editor Form" onSubmit={handleSubmit}>
          <Grid2 container spacing={3} sx={{ height: '100%' }}>
            {/* Left Side - Basic Product Info */}
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                id="product-name"
                slotProps={{
                  input: { 'aria-label': 'Product Name' },
                }}
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                required
              />
              <Box>
                <Autocomplete
                  multiple
                  id="categories-autocomplete"
                  options={categoriesData?.categories || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    categoriesData?.categories?.filter((cat) =>
                      product.categoryIds.includes(cat.id)
                    ) || []
                  }
                  onChange={(_e, newValue) =>
                    setProduct((prev) => ({
                      ...prev,
                      categoryIds: newValue.map((category) => category.id),
                    }))
                  }
                  loading={categoriesLoading}
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <li key={key} {...otherProps}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                          }}
                        >
                          {option.name}
                          <Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(option);
                                setIsEditCategoryModalOpen(true);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDeleteCategoryModal(option);
                              }}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          'aria-label': 'Category',
                          endAdornment: (
                            <>
                              {params.InputProps?.endAdornment}
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsNewCategoryModalOpen(true);
                                }}
                                size="small"
                                sx={{ ml: 1 }}
                                aria-label="Add new category"
                              >
                                <AddIcon />
                              </IconButton>
                            </>
                          ),
                        },
                      }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  filterSelectedOptions
                  openOnFocus
                />
              </Box>
            </Grid2>
            {/* Right Side - ProductInfos Section */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Variants
              </Typography>
              {productInfos.map((info, idx) => (
                <ProductInfoCard
                  key={idx}
                  info={info}
                  idx={idx}
                  onChange={handleProductInfoChange}
                  onImageUpload={handleImageUpload}
                  onRemove={handleRemoveProductInfo}
                  onRemoveImage={handleRemoveImage}
                  disableRemove={productInfos.length === 1}
                />
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddProductInfo}
                sx={{ mt: 2 }}
                disabled={isCreatingProduct}
                fullWidth={isMobile}
              >
                Add Variant
              </Button>
            </Grid2>
            {/* Save Button */}
            <Grid2 size={12} sx={{ mt: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'stretch', md: 'flex-end' },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.main,
                    '&:hover': { backgroundColor: colors.hoverMain },
                  }}
                  loading={isCreatingProduct}
                  fullWidth={isMobile}
                >
                  Save Product
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
      <CategoryModal
        open={isNewCategoryModalOpen}
        onClose={() => setIsNewCategoryModalOpen(false)}
        onSubmit={async (name) => {
          try {
            await createCategory(name);
            setIsNewCategoryModalOpen(false);
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('already exists')) {
              showSnackbar(message, { severity: 'error' });
            } else {
              showSnackbar((error as Error).message, { severity: 'error' });
            }
          }
        }}
        title="Add New Category"
        isLoading={isCreatingCategory}
      />
      <CategoryModal
        open={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={async (name) => {
          try {
            if (selectedCategory)
              await updateCategory(selectedCategory.id, name);
            setIsEditCategoryModalOpen(false);
            setSelectedCategory(null);
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('already exists')) {
              showSnackbar(message, { severity: 'error' });
            } else {
              showSnackbar((error as Error).message, { severity: 'error' });
            }
          }
        }}
        initialName={selectedCategory?.name || ''}
        title="Edit Category"
        isLoading={isUpdatingCategory}
      />
      <DeleteCategoryModal
        open={isDeleteCategoryModalOpen}
        onClose={handleCloseDeleteCategoryModal}
        onConfirm={handleDeleteCategory}
        categoryName={categoryToDelete?.name || ''}
        isLoading={isDeletingCategory}
      />
    </AdminsLayout>
  );
}

export default AdminProductEditor;
