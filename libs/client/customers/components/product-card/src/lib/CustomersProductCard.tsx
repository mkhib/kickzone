import React, { useCallback } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';

interface ProductCardProps {
  product: KickzoneGraphqlTypes.Product;
  onAddToCart: (product: KickzoneGraphqlTypes.Product) => void;
}

export const CustomersProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const firstInfo = product.productInfos?.[0];
  const image = firstInfo?.images?.[0] || PRODUCT_IMAGE_PLACEHOLDER;

  // Get pricing info for the first product info
  const getPricingInfo = () => {
    console.log('🎴 ProductCard - Product data:', {
      productId: product.id,
      productName: product.name,
      firstInfo,
      firstInfoId: firstInfo?.id,
      sellerProducts: product.sellerProducts,
      sellerProductsLength: product.sellerProducts?.length || 0,
    });

    if (!product.sellerProducts || product.sellerProducts.length === 0) {
      console.log('❌ ProductCard - No seller products found');
      return null;
    }

    // Log each seller product to see what we're working with
    console.log(
      '🔍 ProductCard - All seller products:',
      product.sellerProducts.map((sp) => ({
        id: sp.id,
        productInfoId: sp.productInfo?.id,
        stockQuantity: sp.stockQuantity,
        price: sp.price,
      }))
    );

    // Find the sellerProduct that matches the first productInfo
    const sellerProduct = product.sellerProducts.find(
      (sp) => sp.productInfo?.id === firstInfo?.id
    );

    console.log('🔍 ProductCard - Matching logic:', {
      firstInfoId: firstInfo?.id,
      sellerProduct,
      stockQuantity: sellerProduct?.stockQuantity,
      price: sellerProduct?.price,
      discount: sellerProduct?.discount,
    });

    if (!sellerProduct) {
      console.log(
        '❌ ProductCard - No matching seller product found for productInfo ID:',
        firstInfo?.id
      );
      console.log(
        '❌ ProductCard - Available productInfo IDs in sellerProducts:',
        product.sellerProducts.map((sp) => sp.productInfo?.id)
      );
      return null;
    }

    const originalPrice = sellerProduct.price;
    const discount = sellerProduct.discount;
    const finalPrice =
      discount > 0
        ? originalPrice - (originalPrice * discount) / 100
        : originalPrice;

    const pricingInfo = {
      originalPrice,
      finalPrice,
      discount,
      stockQuantity: sellerProduct.stockQuantity,
      sellerName: sellerProduct.seller.storeName,
    };

    console.log('💰 ProductCard - Final pricing info:', pricingInfo);
    console.log('📊 ProductCard - Stock check:', {
      stockQuantity: pricingInfo.stockQuantity,
      isOutOfStock: pricingInfo.stockQuantity <= 0,
    });

    return pricingInfo;
  };

  const pricingInfo = getPricingInfo();
  const hasNoSellers = Boolean(
    !product.sellerProducts || product.sellerProducts.length === 0
  );
  const isOutOfStock = pricingInfo ? pricingInfo.stockQuantity <= 0 : false;

  console.log('🎯 ProductCard - Final result:', {
    hasPricingInfo: !!pricingInfo,
    hasNoSellers,
    isOutOfStock,
    stockQuantity: pricingInfo?.stockQuantity,
  });

  const handleAddToCartClick = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.03)',
          boxShadow: '0 16px 40px 0 rgba(31, 38, 135, 0.18)',
        },
        background: 'linear-gradient(135deg, #f8fafc 80%, #e3eafc 100%)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 380,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          background: '#f0f0f0',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, color: '#222' }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.categories?.map((cat) => cat.name).join(', ')}
        </Typography>

        {/* Pricing Information */}
        {hasNoSellers ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No sellers available
            </Typography>
            <Typography
              variant="body2"
              color="warning.main"
              sx={{ fontWeight: 'bold' }}
            >
              Check back later
            </Typography>
          </Box>
        ) : pricingInfo ? (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {pricingInfo.discount > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                  }}
                >
                  ${pricingInfo.originalPrice.toFixed(2)}
                </Typography>
              )}
              <Typography
                variant="h6"
                color={pricingInfo.discount > 0 ? 'error' : 'primary'}
                sx={{ fontWeight: 'bold' }}
              >
                ${pricingInfo.finalPrice.toFixed(2)}
              </Typography>
              {pricingInfo.discount > 0 && (
                <Chip
                  label={`${pricingInfo.discount}% OFF`}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              by {pricingInfo.sellerName}
            </Typography>
            <Typography
              variant="body2"
              color={isOutOfStock ? 'error' : 'success.main'}
              sx={{ fontWeight: 'bold' }}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : `${pricingInfo.stockQuantity} left`}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Price not available
            </Typography>
            <Typography
              variant="body2"
              color="warning.main"
              sx={{ fontWeight: 'bold' }}
            >
              Contact seller
            </Typography>
          </Box>
        )}

        {firstInfo && (
          <Typography variant="caption" color="text.secondary">
            Color: {firstInfo.color ? firstInfo.color.name : 'N/A'} | Size:{' '}
            {firstInfo.size || 'N/A'}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          disabled={hasNoSellers || isOutOfStock}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            boxShadow: 'none',
            textTransform: 'none',
            background:
              hasNoSellers || isOutOfStock
                ? 'grey.400'
                : 'linear-gradient(90deg, #4f8cff 60%, #3358ff 100%)',
            '&:hover': {
              background:
                hasNoSellers || isOutOfStock
                  ? 'grey.400'
                  : 'linear-gradient(90deg, #3d7bff 60%, #2a4dff 100%)',
            },
          }}
          onClick={handleAddToCartClick}
        >
          {hasNoSellers
            ? 'No Sellers'
            : isOutOfStock
            ? 'Out of Stock'
            : 'Add to Cart'}
        </Button>
      </Box>
    </Card>
  );
};

export default CustomersProductCard;
