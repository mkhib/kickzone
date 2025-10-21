import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import { useCallback, useState } from 'react';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';

export function CustomersHome() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { LL } = useI18nContext();

  const { products, loading } = useProductsQuery({
    search,
    sort,
    sortOrder,
    pageSize: 12,
    onlyWithSellers: true, // Only show products with sellers
    onlyInStock: true, // Only show products in stock
  });

  const { addItem } = useCustomersCartService();

  // Add to cart logic
  const handleAddToCart = useCallback(
    (product: KickzoneGraphqlTypes.Product) => {
      if (product.productInfos && product.productInfos.length > 0) {
        const productInfo = product.productInfos[0];

        // Find the sellerProduct that matches this productInfo
        const sellerProduct = product.sellerProducts?.find(
          (sp) => sp.productInfoId === productInfo.id
        );

        if (!sellerProduct || !sellerProduct.seller) {
          return;
        }

        // Check stock availability
        if (sellerProduct.stockQuantity <= 0) {
          return;
        }

        // Calculate final price after discount
        const finalPrice =
          sellerProduct.discount > 0
            ? sellerProduct.price -
              (sellerProduct.price * sellerProduct.discount) / 100
            : sellerProduct.price;

        addItem({
          productId: product.id.toString(),
          productName: product.name,
          productImage: productInfo.images?.[0] || null,
          quantity: 1,
          unitPrice: finalPrice,
          color: productInfo.color?.name || null,
          size: productInfo.size || null,
          sellerId: sellerProduct.seller.id.toString(),
          sellerName: sellerProduct.seller.storeName,
          productInfoId: productInfo.id.toString(),
          sellerProductId: sellerProduct.id.toString(),
          availableStock: sellerProduct.stockQuantity,
        });
      }
    },
    [addItem]
  );

  return (
    <CustomersLayout>
      <CssBaseline />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  letterSpacing: '-0.02em',
                }}
              >
                {LL.messages.welcome()}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 6,
                  opacity: 0.95,
                  fontWeight: 400,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Discover premium sneakers from top brands
              </Typography>

              {/* Search and Filter Bar */}
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    placeholder={LL.form.searchProducts()}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                      flex: 1,
                      minWidth: { xs: '100%', sm: 280 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: '#f8f9fa',
                        '&:hover': {
                          background: '#fff',
                        },
                        '&.Mui-focused': {
                          background: '#fff',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#667eea' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl
                    sx={{
                      minWidth: { xs: '100%', sm: 240 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: '#f8f9fa',
                        '&:hover': {
                          background: '#fff',
                        },
                        '&.Mui-focused': {
                          background: '#fff',
                        },
                      },
                    }}
                  >
                    <InputLabel>{LL.form.sortBy()}</InputLabel>
                    <Select
                      value={sort}
                      label={LL.form.sortBy()}
                      onChange={(e) => setSort(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <TrendingUpIcon sx={{ color: '#667eea', ml: 1 }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="price">{LL.table.price()}</MenuItem>
                      <MenuItem value="discount">{LL.form.discount()}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      minWidth: { xs: '100%', sm: 180 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: '#f8f9fa',
                        '&:hover': {
                          background: '#fff',
                        },
                        '&.Mui-focused': {
                          background: '#fff',
                        },
                      },
                    }}
                  >
                    <InputLabel>{LL.form.order()}</InputLabel>
                    <Select
                      value={sortOrder}
                      label={LL.form.order()}
                      onChange={(e) =>
                        setSortOrder(e.target.value as 'asc' | 'desc')
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <LocalOfferIcon sx={{ color: '#667eea', ml: 1 }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="asc">{LL.products.ascending()}</MenuItem>
                      <MenuItem value="desc">
                        {LL.products.descending()}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '4px solid #667eea',
                  borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite',
                  mb: 2,
                  mx: 'auto',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: '#667eea', fontWeight: 600 }}
              >
                {LL.status.loading()}
              </Typography>
            </Box>
          </Box>
        ) : products.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#666',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {LL.products.noProductsFound()}
            </Typography>
            <Typography variant="body1" sx={{ color: '#999' }}>
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <Fade in timeout={800}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {products.map((product, index) => (
                <Grid
                  key={product.id}
                  size={
                    products.length === 1
                      ? { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
                      : { xs: 12, sm: 6, md: 4, lg: 3 }
                  }
                  sx={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(30px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <CustomersProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>
    </CustomersLayout>
  );
}

export default CustomersHome;
