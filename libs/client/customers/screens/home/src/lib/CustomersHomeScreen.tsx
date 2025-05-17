import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

export function CustomersHome() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { products, loading } = useProductsQuery({
    search,
    sort,
    sortOrder,
    pageSize: 12,
  });

  // Placeholder for add to cart logic
  const handleAddToCart = useCallback(
    (product: KickzoneGraphqlTypes.Product) => {
      console.log('Add to cart clicked for product:', product);
      // TODO: Implement actual add to cart logic
    },
    []
  );

  return (
    <CustomersLayout>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 4, color: '#222', fontWeight: 700, letterSpacing: 1 }}
          >
            Welcome to Kickzone
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mb: 4, width: '100%', justifyContent: 'center' }}
          >
            <TextField
              variant="outlined"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 220, background: '#fff', borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Order</InputLabel>
              <Select
                value={sortOrder}
                label="Order"
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Grid2 container spacing={4} justifyContent="center">
            {loading ? (
              <Typography variant="h6" sx={{ mt: 4 }}>
                Loading...
              </Typography>
            ) : products.length === 0 ? (
              <Typography variant="h6" sx={{ mt: 4 }}>
                No products found.
              </Typography>
            ) : (
              products.map((product) => {
                return (
                  <Grid2
                    key={product.id}
                    size={
                      products.length === 1
                        ? { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
                        : { xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }
                    }
                  >
                    <CustomersProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </Grid2>
                );
              })
            )}
          </Grid2>
        </Box>
      </Container>
    </CustomersLayout>
  );
}

export default CustomersHome;
