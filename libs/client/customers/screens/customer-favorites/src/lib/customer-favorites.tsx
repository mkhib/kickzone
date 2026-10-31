import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductById } from '@kickzone-workspace/products-hook';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import {
  CUSTOMER_ROUTES,
} from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import {
  useWishlistItems,
  useRemoveFromWishlist,
  useClearWishlist,
  WishlistItem,
} from '@kickzone-workspace/customer-wishlist-store';

function FavoriteProductItem({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: (itemId: WishlistItem['id']) => void;
}) {
  const { product } = useProductById(Number(item.id));
  const { addItem } = useCustomersCartService();

  if (!product) return null;

  return (
    <CustomersProductCard
      product={product}
      variant="compact"
      isFavorite
      onToggleFavorite={() => onRemove(item.id)}
      onAddVariantToCart={({ productInfo, sellerProduct }) => {
        addItem({
          productId: String(product.id),
          productName: product.name,
          productImage: productInfo.images?.[0] || null,
          quantity: 1,
          unitPrice: sellerProduct.price,
          color: productInfo.colors?.[0]?.name || null,
          size: productInfo.size || null,
          sellerId: String(sellerProduct.seller?.id || 1),
          sellerName: '',
          sellerShippingFee: sellerProduct.seller?.shippingFee || 0,
          productInfoId: String(productInfo.id),
          sellerProductId: String(sellerProduct.id),
          availableStock: sellerProduct.stockQuantity || 1,
        });
      }}
    />
  );
}

export function CustomerFavorites() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() => (isEn ? 'Favorites — SAINTBALA' : 'علاقه‌مندی‌ها — SAINTBALA'));

  // Defensive array guard: always guaranteed to be an array
  const rawItems = useWishlistItems();
  const items: WishlistItem[] = Array.isArray(rawItems) ? rawItems : [];

  const removeItem = useRemoveFromWishlist();
  const clearWishlist = useClearWishlist();

  const labels = {
    title: isEn ? 'Saved Pieces' : 'مجموعه علاقه‌مندی‌ها',
    count: isEn
      ? `${items.length} ${items.length === 1 ? 'Piece' : 'Pieces'}`
      : `${items.length} محصول`,
    clearAll: isEn ? 'Clear All' : 'پاک کردن همه',
    emptyTitle: isEn ? 'Your Curation is Empty' : 'لیست علاقه‌مندی‌های شما خالی است',
    emptyDescription: isEn
      ? 'Pieces and collections you mark with a heart will appear here for seamless comparison and acquisition.'
      : 'محصولات و قطعاتی که در این بخش نشان می‌کنید، برای بررسی و سفارش آسان در دسترس شما قرار می‌گیرند.',
    exploreCatalog: isEn ? 'Explore Catalog' : 'مشاهده محصولات',
    viewProduct: isEn ? 'View Piece' : 'مشاهده جزئیات',
    removeAria: isEn ? 'Remove from favorites' : 'حذف از علاقه‌مندی‌ها',
    sku: isEn ? 'SKU:' : 'کد:',
  };

  return (
    <CustomersLayout>
      <Box
        data-testid="customer-favorites-screen"
        sx={{
          minHeight: '70vh',
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          {/* Header Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 5,
              pb: 3,
              borderBottom: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.10)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box>
              <Typography
                component="div"
                sx={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  mb: 0.5,
                }}
              >
                <bdi>SAINTBALA</bdi> {isEn ? 'CURATION' : 'انتخاب‌ها'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.6rem', sm: '2.1rem' },
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  }}
                >
                  {labels.title}
                </Typography>
                {items.length > 0 && (
                  <Chip
                    label={labels.count}
                    size="small"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(201, 167, 116, 0.16)'
                          : 'rgba(138, 106, 61, 0.12)',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                      fontWeight: 700,
                      borderRadius: '9999px',
                    }}
                  />
                )}
              </Box>
            </Box>

            {items.length > 0 && (
              <Button
                variant="text"
                data-testid="clear-favorites-btn"
                onClick={clearWishlist}
                startIcon={<DeleteOutlineIcon />}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#a8a8ae' : '#6e6e73',
                  textTransform: 'none',
                  minHeight: '44px',
                  px: 2,
                  '&:hover': {
                    color: '#ef4444',
                    bgcolor: 'rgba(239, 68, 68, 0.08)',
                  },
                }}
              >
                {labels.clearAll}
              </Button>
            )}
          </Box>

          {/* Empty State */}
          {items.length === 0 ? (
            <Box
              data-testid="favorites-empty-state"
              sx={{
                py: { xs: 8, md: 12 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: { xs: 3, sm: 6 },
                borderRadius: '24px',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(13, 14, 20, 0.65)'
                    : 'rgba(255, 255, 255, 0.75)',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                backdropFilter: 'blur(30px)',
              }}
            >
              {/* Icon container */}
              <Box
                sx={{
                  width: { xs: 68, sm: 84 },
                  height: { xs: 68, sm: 84 },
                  borderRadius: '50%',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(201, 167, 116, 0.12)'
                      : 'rgba(138, 106, 61, 0.10)',
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(201, 167, 116, 0.25)'
                      : '1px solid rgba(138, 106, 61, 0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  mb: 3,
                }}
              >
                <FavoriteIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
              </Box>

              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  mb: 1.5,
                }}
              >
                {labels.emptyTitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#a8a8ae' : '#5c5c61',
                  maxWidth: '460px',
                  lineHeight: 1.7,
                  mb: 4,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {isRTL ? (
                  <span>
                    محصولات و قطعاتی که در <bdi>SAINTBALA</bdi> نشان می‌کنید، در
                    این بخش برای مقایسه و خرید آسان نمایش داده می‌شوند.
                  </span>
                ) : (
                  labels.emptyDescription
                )}
              </Typography>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SHOP}
                variant="contained"
                data-testid="favorites-shop-cta"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  minHeight: '44px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#1d1d1f',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 6px 20px rgba(201, 167, 116, 0.35)'
                      : '0 4px 14px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#d8bc8c' : '#2e2e2c',
                  },
                }}
              >
                {labels.exploreCatalog}
              </Button>
            </Box>
          ) : (
            /* Populated Favorites Grid */
            <Grid container spacing={3} data-testid="favorites-grid">
              {items.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={String(item.id)}>
                  <FavoriteProductItem item={item} onRemove={removeItem} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerFavorites;
