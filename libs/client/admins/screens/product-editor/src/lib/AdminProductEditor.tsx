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
import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

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

export function AdminProductEditor() {
  const [product, setProduct] = useState({
    name: '',
    discount: 0,
    categoryIds: [] as number[],
  });

  const [productInfo, setProductInfo] = useState({
    size: '',
    price: 0,
    costPrice: 0,
    color: '',
    weight: 0,
    discount: 0,
    stockQuantity: 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    categoriesData,
    categoriesLoading,
    createCategory,
    updateCategory,
    isCreatingCategory,
    isUpdatingCategory,
  } = useCategories();

  const {
    createProduct,
    isCreatingProduct,
    uploadProductImages,
    removeProductImage,
  } = useProducts();
  const { showSnackbar } = useSnackbarContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCreateCategory = useCallback(
    async (name: string) => {
      try {
        await createCategory(name);
        showSnackbar('Category created successfully', { severity: 'success' });
        setIsNewCategoryModalOpen(false);
      } catch (err) {
        const error = err as ApolloError;
        console.log('Error details:', {
          message: error.message,
          networkError: error.networkError,
          graphQLErrors: error.graphQLErrors,
          extraInfo: error.extraInfo,
        });
        showSnackbar(error.message, { severity: 'error' });
      }
    },
    [createCategory, showSnackbar]
  );

  const handleEditCategory = useCallback(
    async (name: string) => {
      if (!selectedCategory) return;
      try {
        await updateCategory(selectedCategory.id, name);
        showSnackbar('Category updated successfully', { severity: 'success' });
        setIsEditCategoryModalOpen(false);
        setSelectedCategory(null);
      } catch (err) {
        const error = err as ApolloError;
        console.log('Error details:', {
          message: error.message,
          networkError: error.networkError,
          graphQLErrors: error.graphQLErrors,
          extraInfo: error.extraInfo,
        });
        showSnackbar(error.message, { severity: 'error' });
      }
    },
    [selectedCategory, updateCategory, showSnackbar]
  );

  const handleCategoryChange = useCallback(
    (_: unknown, newValue: { id: number; name: string }[]) => {
      setProduct((prev) => ({
        ...prev,
        categoryIds: newValue.map((category) => category.id),
      }));
    },
    []
  );

  const handleEditCategoryClick = useCallback(
    (category: { id: number; name: string }) => {
      setSelectedCategory(category);
      setIsEditCategoryModalOpen(true);
    },
    []
  );

  const handleProductChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleProductInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProductInfo((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Validate required fields
        if (
          !product.name ||
          !productInfo.size ||
          !productInfo.color ||
          !productInfo.price ||
          !productInfo.costPrice ||
          !productInfo.weight ||
          !productInfo.stockQuantity
        ) {
          showSnackbar('Please fill in all required fields', {
            severity: 'error',
          });
          return;
        }

        // First create the product
        const createdProduct = await createProduct(
          {
            name: product.name,
            discount: Number(product.discount) || 0,
            categoryIds: product.categoryIds,
          },
          {
            size: productInfo.size,
            price: Number(productInfo.price),
            costPrice: Number(productInfo.costPrice),
            color: productInfo.color,
            weight: Number(productInfo.weight),
            discount: Number(productInfo.discount) || 0,
            stockQuantity: Number(productInfo.stockQuantity),
          }
        );

        setCreatedProductId(createdProduct.product.id);
        showSnackbar('Product created successfully', { severity: 'success' });
      } catch (error) {
        const err = error as ApolloError;
        console.log('Error details:', {
          message: err.message,
          networkError: err.networkError,
          graphQLErrors: err.graphQLErrors,
          extraInfo: err.extraInfo,
        });
        showSnackbar(err.message, { severity: 'error' });
      }
    },
    [product, productInfo, createProduct, showSnackbar]
  );

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !createdProductId) {
        if (!createdProductId) {
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

      setIsUploadingImages(true);
      try {
        // Create preview URLs before upload
        const newPreviews = newImages.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
        setImages((prev) => [...prev, ...newImages]);

        await uploadProductImages(createdProductId, newImages);
        showSnackbar('Images uploaded successfully', { severity: 'success' });
      } catch (error) {
        const err = error as ApolloError;
        console.log('Error details:', {
          message: err.message,
          networkError: err.networkError,
          graphQLErrors: err.graphQLErrors,
          extraInfo: err.extraInfo,
        });
        showSnackbar(err.message, { severity: 'error' });
        // Remove failed uploads from state
        setImages((prev) => prev.slice(0, -newImages.length));
        setImagePreviews((prev) => {
          const removedPreviews = prev.slice(-newImages.length);
          removedPreviews.forEach((url) => URL.revokeObjectURL(url));
          return prev.slice(0, -newImages.length);
        });
      } finally {
        setIsUploadingImages(false);
      }
    },
    [createdProductId, uploadProductImages, showSnackbar]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      if (!createdProductId) return;

      const imageToRemove = images[index];
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => {
        const newPreviews = [...prev];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        return newPreviews;
      });

      // Call the removeProductImage function
      removeProductImage(createdProductId, imageToRemove.name);
    },
    [createdProductId, images, removeProductImage]
  );

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

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
              <TextField
                id="product-discount"
                slotProps={{
                  input: { 'aria-label': 'Discount (%)' },
                }}
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={product.discount}
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
                  onChange={handleCategoryChange}
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
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCategoryClick(option);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
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
              <TextField
                id="product-size"
                slotProps={{
                  input: { 'aria-label': 'Size' },
                }}
                fullWidth
                label="Size"
                name="size"
                value={productInfo.size}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                id="product-color"
                slotProps={{
                  input: { 'aria-label': 'Color' },
                }}
                fullWidth
                label="Color"
                name="color"
                value={productInfo.color}
                onChange={handleProductInfoChange}
                required
              />
            </Grid2>

            {/* Right Side - Pricing and Stock Info */}
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                id="product-price"
                slotProps={{
                  input: { 'aria-label': 'Price' },
                }}
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productInfo.price}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                id="product-cost-price"
                slotProps={{
                  input: { 'aria-label': 'Cost Price' },
                }}
                fullWidth
                label="Cost Price"
                name="costPrice"
                type="number"
                value={productInfo.costPrice}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                id="product-weight"
                slotProps={{
                  input: { 'aria-label': 'Weight (kg)' },
                }}
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={productInfo.weight}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                id="product-stock-quantity"
                slotProps={{
                  input: { 'aria-label': 'Stock Quantity' },
                }}
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={productInfo.stockQuantity}
                onChange={handleProductInfoChange}
                required
              />
            </Grid2>

            {/* Image Upload Section */}
            <Grid2 size={12}>
              <Box sx={{ mb: 2 }}>
                <Tooltip
                  title={
                    !createdProductId
                      ? 'Please create the product first to upload images'
                      : ''
                  }
                  placement="top"
                >
                  <div>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<AddPhotoAlternateIcon />}
                      disabled={!createdProductId || isUploadingImages}
                      sx={{
                        backgroundColor: colors.main,
                        '&:hover': { backgroundColor: colors.hoverMain },
                      }}
                    >
                      {isUploadingImages ? 'Uploading...' : 'Upload Images'}
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={!createdProductId || isUploadingImages}
                      />
                    </Button>
                  </div>
                </Tooltip>
              </Box>
              <ImagePreviewContainer>
                {imagePreviews.map((preview, index) => (
                  <ImagePreviewCard key={index}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={preview}
                      alt={`Product image ${index + 1}`}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {images[index].name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{ color: 'error.main' }}
                        aria-label="Delete image"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </ImagePreviewCard>
                ))}
              </ImagePreviewContainer>
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
        onSubmit={handleCreateCategory}
        title="Add New Category"
        isLoading={isCreatingCategory}
      />

      <CategoryModal
        open={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleEditCategory}
        initialName={selectedCategory?.name || ''}
        title="Edit Category"
        isLoading={isUpdatingCategory}
      />
    </AdminsLayout>
  );
}

export default AdminProductEditor;
