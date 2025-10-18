import React, { useCallback } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { PriceDisplay } from '@kickzone-workspace/price-display';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';

// Utility to convert numbers to locale format (supports Farsi digits)
const formatNumber = (num: number | string, locale: string): string => {
  return Number(num).toLocaleString(locale);
};

interface ProductCardProps {
  product: KickzoneGraphqlTypes.Product;
  onAddToCart: (product: KickzoneGraphqlTypes.Product) => void;
}

export const CustomersProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const firstInfo = product.productInfos?.[0];
  const image = firstInfo?.images?.[0] || PRODUCT_IMAGE_PLACEHOLDER;

  // Get pricing info for the first product info
  const getPricingInfo = () => {
    if (!product.sellerProducts || product.sellerProducts.length === 0) {
      return null;
    }

    // Find the sellerProduct that matches the first productInfo
    const sellerProduct = product.sellerProducts.find(
      (sp) => sp.productInfoId === firstInfo?.id
    );

    if (!sellerProduct) {
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
      sellerName:
        sellerProduct.seller?.storeName || LL.products.unknownSeller(),
    };

    return pricingInfo;
  };

  const pricingInfo = getPricingInfo();
  const hasNoSellers = Boolean(
    !product.sellerProducts || product.sellerProducts.length === 0
  );
  const isOutOfStock = pricingInfo ? pricingInfo.stockQuantity <= 0 : false;

  const handleAddToCartClick = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          '& .product-image': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 280,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={product.name}
          className="product-image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />
        {pricingInfo && pricingInfo.discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              borderRadius: 3,
              px: 2,
              py: 1,
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <LocalOfferIcon sx={{ fontSize: 18 }} />
            {formatNumber(pricingInfo.discount, currentLocale)}%{' '}
            {LL.products.discount()}
          </Box>
        )}
        {pricingInfo &&
          pricingInfo.stockQuantity < 10 &&
          pricingInfo.stockQuantity > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: '#000',
                borderRadius: 3,
                px: 2,
                py: 1,
                fontWeight: 700,
                fontSize: '0.85rem',
                boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <InventoryIcon sx={{ fontSize: 18 }} />
              {formatNumber(pricingInfo.stockQuantity, currentLocale)}{' '}
              {LL.products.left()}
            </Box>
          )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          pb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 1.5,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
            minHeight: 60,
          }}
        >
          {product.name}
        </Typography>

        {product.categories && product.categories.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {product.categories.slice(0, 2).map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                size="small"
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': { px: 1.5 },
                }}
              />
            ))}
          </Box>
        )}

        {/* Pricing Information */}
        {hasNoSellers ? (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#2d3436',
                textAlign: 'center',
              }}
            >
              {LL.products.noSellersAvailable()}
            </Typography>
          </Box>
        ) : pricingInfo ? (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
                mb: 1.5,
                flexWrap: 'wrap',
              }}
            >
              {pricingInfo.discount > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontSize: '0.95rem',
                  }}
                >
                  <PriceDisplay
                    priceInUSD={pricingInfo.originalPrice}
                    showSymbol={true}
                    showOriginal={false}
                  />
                </Typography>
              )}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background:
                    pricingInfo.discount > 0
                      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <PriceDisplay
                  priceInUSD={pricingInfo.finalPrice}
                  showSymbol={true}
                  showOriginal={false}
                />
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {LL.products.by()} {pricingInfo.sellerName}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#2d3436',
                textAlign: 'center',
              }}
            >
              {LL.products.priceNotAvailable()}
            </Typography>
          </Box>
        )}

        {firstInfo && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {firstInfo.color && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                  }}
                >
                  {LL.products.color()}
                </Typography>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: firstInfo.color.hexCode,
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                />
              </Box>
            )}
            {firstInfo.size && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                  }}
                >
                  {LL.products.size()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                  }}
                >
                  {formatNumber(firstInfo.size, currentLocale)}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={hasNoSellers || isOutOfStock}
          onClick={handleAddToCartClick}
          sx={{
            borderRadius: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow:
              hasNoSellers || isOutOfStock
                ? 'none'
                : '0 8px 25px rgba(102, 126, 234, 0.35)',
            background:
              hasNoSellers || isOutOfStock
                ? 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform:
                hasNoSellers || isOutOfStock ? 'none' : 'translateY(-2px)',
              boxShadow:
                hasNoSellers || isOutOfStock
                  ? 'none'
                  : '0 12px 35px rgba(102, 126, 234, 0.45)',
              background:
                hasNoSellers || isOutOfStock
                  ? 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)'
                  : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
            '&:disabled': {
              color: 'white',
              opacity: 0.7,
            },
          }}
        >
          {hasNoSellers
            ? LL.products.noSellers()
            : isOutOfStock
            ? LL.products.outOfStock()
            : LL.products.addToCart()}
        </Button>
      </Box>
    </Card>
  );
};

export default CustomersProductCard;
