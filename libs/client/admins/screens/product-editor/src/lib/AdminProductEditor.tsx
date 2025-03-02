import React, { useState, useCallback } from 'react';
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
import { colors } from '@kickzone-workspace/colors';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useAdminProductEditor } from './useAdminProductEditor';

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

  const [categories, setCategories] = useState([
    { id: 1, name: 'Jordan Shoes' },
    { id: 2, name: 'Nike Clothes' },
  ]);

  const {
    createCategory,
    createProduct,
    isCreatingCategory,
    isCreatingProduct,
  } = useAdminProductEditor();

  const handleCreateCategory = async () => {
    const category = await createCategory({
      variables: {
        input: {
          name: 'New Category',
        },
      },
    });
    console.log('Created category:', category);
  };

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

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      setProduct((prev) => ({
        ...prev,
        categoryIds: e.target.value as number[],
      }));
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, color: colors.text }}>
          Add/Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={product.discount}
                onChange={handleProductChange}
                required
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={product.categoryIds}
                  // onChange={handleCategoryChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as number[]).map((id) => (
                        <Chip
                          key={id}
                          label={categories.find((cat) => cat.id === id)?.name}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Size"
                name="size"
                value={productInfo.size}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productInfo.price}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Cost Price"
                name="costPrice"
                type="number"
                value={productInfo.costPrice}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productInfo.color}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={productInfo.weight}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={productInfo.discount}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={productInfo.stockQuantity}
                onChange={handleProductInfoChange}
                required
                sx={{ mb: 2 }}
              />
            </Grid2>

            <Grid2 size={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: colors.main,
                  '&:hover': { backgroundColor: colors.hoverMain },
                }}
              >
                Save Product
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </AdminsLayout>
  );
}

export default AdminProductEditor;
