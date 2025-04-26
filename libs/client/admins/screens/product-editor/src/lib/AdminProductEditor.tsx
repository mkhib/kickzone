import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Grid2 from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '@kickzone-workspace/colors';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useAdminProductEditor } from './useAdminProductEditor';
import { useCategories } from '@kickzone-workspace/categories-hook';
import LoadingButton from '@mui/lab/LoadingButton';
import { ApolloError, useApolloClient } from '@apollo/client';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

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

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const client = useApolloClient();
  const {
    categoriesData,
    categoriesLoading,
    createCategory,
    updateCategory,
    isCreatingCategory,
    isUpdatingCategory,
  } = useCategories();

  const { createProduct, isCreatingProduct } = useAdminProductEditor();
  const { showSnackbar } = useSnackbarContext();

  const handleCreateCategory = useCallback(
    async (name: string) => {
      try {
        await createCategory(name);
        showSnackbar('Category created successfully', { severity: 'success' });
        setIsNewCategoryModalOpen(false);
      } catch (err) {
        const error = err as ApolloError;

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
      } catch (error) {
        showSnackbar('Failed to update category', { severity: 'error' });
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

  const handleCreateProduct = useCallback(async () => {
    const product = await createProduct({
      variables: {
        input: {
          name: 'New Product',
          discount: 10,
          categoryIds: [],
        },
      },
    });
    console.log('Created product:', product);
  }, [createProduct]);

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
    (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateProduct();
      console.log('Product:', product);
      console.log('Product Info:', productInfo);
    },
    [product, productInfo, handleCreateProduct]
  );

  return (
    <AdminsLayout>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, color: colors.text }}>
          Add/Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3} sx={{ height: '100%' }}>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                required
              />
              <TextField
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
                  options={categoriesData?.categories || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    categoriesData?.categories.filter((cat) =>
                      product.categoryIds.includes(cat.id)
                    ) || []
                  }
                  onChange={handleCategoryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categories"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <Button
                              variant="outlined"
                              onClick={() => setIsNewCategoryModalOpen(true)}
                              sx={{ ml: 1 }}
                            >
                              Add New
                            </Button>
                          </>
                        ),
                      }}
                    />
                  )}
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
                />
              </Box>
            </Grid2>

            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                fullWidth
                label="Size"
                name="size"
                value={productInfo.size}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productInfo.price}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Cost Price"
                name="costPrice"
                type="number"
                value={productInfo.costPrice}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productInfo.color}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={productInfo.weight}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={productInfo.discount}
                onChange={handleProductInfoChange}
                required
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={productInfo.stockQuantity}
                onChange={handleProductInfoChange}
                required
              />
            </Grid2>

            <Grid2 size={12} sx={{ mt: 'auto' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: colors.main,
                  '&:hover': { backgroundColor: colors.hoverMain },
                }}
                loading={isCreatingProduct}
              >
                Save Product
              </LoadingButton>
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
