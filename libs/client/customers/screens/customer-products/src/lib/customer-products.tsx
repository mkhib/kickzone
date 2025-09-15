import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import { Search, ShoppingCart } from '@mui/icons-material';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  useCustomersProducts,
  useCustomersCategories,
  useCustomersColors,
} from '@kickzone-workspace/customers-product-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function CustomerProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filter: KickzoneGraphqlTypes.ProductFilterInput = {
    searchTerm: searchTerm || undefined,
    categoryId: selectedCategory ? parseInt(selectedCategory) : undefined,
    productInfoFilter: selectedColor
      ? { colorId: [parseInt(selectedColor)] }
      : undefined,
  };

  const {
    products,
    totalCount,
    loading: productsLoading,
    error: productsError,
  } = useCustomersProducts({
    first: itemsPerPage,
    after:
      currentPage > 1
        ? btoa(`cursor:${(currentPage - 1) * itemsPerPage}`)
        : undefined,
    filter,
  });

  const { categories } = useCustomersCategories();
  const { colors } = useCustomersColors();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    setCurrentPage(1);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (
    product: KickzoneGraphqlTypes.Product,
    productInfo: KickzoneGraphqlTypes.ProductInfo
  ) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product, productInfo);
  };

  if (productsLoading) {
    return (
      <CustomersLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </CustomersLayout>
    );
  }

  if (productsError) {
    return (
      <CustomersLayout>
        <Alert severity="error">
          Error loading products: {productsError.message}
        </Alert>
      </CustomersLayout>
    );
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <CustomersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={selectedColor}
              onChange={handleColorChange}
              label="Color"
            >
              <MenuItem value="">All Colors</MenuItem>
              {colors.map((color) => (
                <MenuItem key={color.id} value={color.id.toString()}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color.hexCode,
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                      }}
                    />
                    {color.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {product.productInfos[0]?.images?.[0] && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.productInfos[0]?.images?.[0]}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {product.categories.map((category) => (
                      <Chip
                        key={category.id}
                        label={category.name}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Available Variants: {product.productInfos.length}
                  </Typography>

                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                  >
                    {product.productInfos.slice(0, 3).map((info) => (
                      <Box
                        key={info.id}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {info.color && (
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              backgroundColor: info.color.hexCode,
                              border: '1px solid #ccc',
                              borderRadius: '50%',
                            }}
                          />
                        )}
                        <Typography variant="caption">{info.size}</Typography>
                      </Box>
                    ))}
                    {product.productInfos.length > 3 && (
                      <Typography variant="caption">
                        +{product.productInfos.length - 3} more
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() =>
                      handleAddToCart(product, product.productInfos[0])
                    }
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        {products.length === 0 && !productsLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
          </Box>
        )}
      </Box>
    </CustomersLayout>
  );
}

export default CustomerProducts;
