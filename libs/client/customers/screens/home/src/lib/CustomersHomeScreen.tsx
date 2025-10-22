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
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
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
          position: 'relative',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              {/* Hero Title with Glassmorphic Background */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(25px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
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
                      'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  },
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {LL.messages.welcome()}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    color: 'rgba(102, 126, 234, 0.8)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  Discover premium sneakers from top brands
                </Typography>
              </Paper>

              {/* Search and Filter Bar */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
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
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  },
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
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
                        borderRadius: 4,
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
                        borderRadius: 4,
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
                        borderRadius: 4,
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
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                textAlign: 'center',
              }}
            >
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
                sx={{
                  color: '#667eea',
                  fontWeight: 600,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {LL.status.loading()}
              </Typography>
            </Paper>
          </Box>
        ) : products.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {LL.products.noProductsFound()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(102, 126, 234, 0.7)',
                  fontWeight: 400,
                }}
              >
                Try adjusting your search or filters
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Fade in timeout={800}>
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }}
              sx={products.length === 1 ? { justifyContent: 'center' } : {}}
            >
              {products.map((product, index) => (
                <Grid
                  key={product.id}
                  size={
                    products.length === 1
                      ? { xs: 12, sm: 8, md: 6, lg: 4, xl: 4 }
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
