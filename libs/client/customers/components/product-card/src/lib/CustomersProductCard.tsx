import React, { useCallback, useState, useMemo } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  const firstInfo = product.productInfos?.[0];
  const image = firstInfo?.images?.[0] || PRODUCT_IMAGE_PLACEHOLDER;

  // Get all available variants with their pricing
  // For each ProductInfo, find the cheapest available sellerProduct
  const availableVariants = useMemo(() => {
    if (!product.productInfos || !product.sellerProducts) {
      return [];
    }

    return product.productInfos
      .map((productInfo) => {
        // Find ALL sellerProducts for this ProductInfo (multiple sellers can offer the same variant)
        const allSellerProducts =
          product.sellerProducts?.filter(
            (sp) =>
              (sp.productInfoId === productInfo.id ||
                sp.productInfo?.id === productInfo.id) &&
              sp.seller &&
              sp.stockQuantity > 0
          ) || [];

        if (allSellerProducts.length === 0) {
          return null;
        }

        // Calculate final price (after discount) for each sellerProduct
        const sellerProductsWithPrice = allSellerProducts.map((sp) => {
          const originalPrice = sp.price;
          const discount = sp.discount || 0;
          const finalPrice =
            discount > 0
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice;

          return {
            sellerProduct: sp,
            originalPrice,
            finalPrice,
            discount,
            stockQuantity: sp.stockQuantity,
          };
        });

        // Sort by final price (cheapest first), then by stock quantity (more stock first as tiebreaker)
        sellerProductsWithPrice.sort((a, b) => {
          if (a.finalPrice !== b.finalPrice) {
            return a.finalPrice - b.finalPrice;
          }
          // If prices are equal, prefer seller with more stock
          return b.stockQuantity - a.stockQuantity;
        });

        // Select the cheapest available sellerProduct
        const bestSellerProduct = sellerProductsWithPrice[0];
        const allPrices = sellerProductsWithPrice.map((sp) => sp.finalPrice);
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        const hasMultipleSellers = sellerProductsWithPrice.length > 1;
        const hasPriceVariation = minPrice !== maxPrice;

        return {
          productInfo,
          sellerProduct: bestSellerProduct.sellerProduct,
          originalPrice: bestSellerProduct.originalPrice,
          finalPrice: bestSellerProduct.finalPrice,
          discount: bestSellerProduct.discount,
          stockQuantity: bestSellerProduct.stockQuantity,
          // Additional info for display
          hasMultipleSellers,
          hasPriceVariation,
          priceRange: hasPriceVariation
            ? { min: minPrice, max: maxPrice }
            : null,
          totalSellers: sellerProductsWithPrice.length,
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [product]);

  // Get best pricing info (lowest price) for display
  const getBestPricingInfo = useMemo(() => {
    if (availableVariants.length === 0) {
      return null;
    }

    // Find the variant with the lowest final price
    const bestVariant = availableVariants.reduce((best, current) =>
      current.finalPrice < best.finalPrice ? current : best
    );

    return {
      originalPrice: bestVariant.originalPrice,
      finalPrice: bestVariant.finalPrice,
      discount: bestVariant.discount,
      stockQuantity: bestVariant.stockQuantity,
      hasMultipleVariants: availableVariants.length > 1,
      priceRange:
        availableVariants.length > 1
          ? {
              min: Math.min(...availableVariants.map((v) => v.finalPrice)),
              max: Math.max(...availableVariants.map((v) => v.finalPrice)),
            }
          : null,
    };
  }, [availableVariants]);

  const pricingInfo = getBestPricingInfo;
  const hasNoSellers = Boolean(
    !product.sellerProducts || product.sellerProducts.length === 0
  );
  const isOutOfStock = pricingInfo ? pricingInfo.stockQuantity <= 0 : false;
  const hasMultipleVariants = pricingInfo?.hasMultipleVariants || false;
  const tagBaseSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    borderRadius: 3,
    px: 2,
    py: 1,
    fontWeight: 700,
    fontSize: '0.85rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    flexShrink: 0,
    maxWidth: 'calc(50% - 8px)',
  } as const;

  const handleAddToCartClick = useCallback(() => {
    if (hasMultipleVariants) {
      // If multiple variants, open dialog to select
      setSelectedVariantId(
        availableVariants[0]?.productInfo.id.toString() || null
      );
      setVariantDialogOpen(true);
    } else {
      // Single variant, add directly
      onAddToCart(product);
    }
  }, [onAddToCart, product, hasMultipleVariants, availableVariants]);

  const handleVariantConfirm = useCallback(() => {
    if (!selectedVariantId) return;

    const selectedVariant = availableVariants.find(
      (v) => v.productInfo.id.toString() === selectedVariantId
    );

    if (selectedVariant) {
      // Create a modified product object with only the selected variant
      const productWithSelectedVariant: KickzoneGraphqlTypes.Product = {
        ...product,
        productInfos: [selectedVariant.productInfo],
        sellerProducts: [selectedVariant.sellerProduct],
      };
      onAddToCart(productWithSelectedVariant);
      setVariantDialogOpen(false);
    }
  }, [selectedVariantId, availableVariants, product, onAddToCart]);

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
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 1,
            pointerEvents: 'none',
          }}
        >
          {pricingInfo &&
            pricingInfo.stockQuantity < 10 &&
            pricingInfo.stockQuantity > 0 && (
              <Box
                sx={{
                  ...tagBaseSx,
                  background:
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  color: '#000',
                  boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)',
                  order: 1,
                  pointerEvents: 'auto',
                }}
              >
                <InventoryIcon sx={{ fontSize: 18 }} />
                {formatNumber(pricingInfo.stockQuantity, currentLocale)}{' '}
                {LL.products.left()}
              </Box>
            )}
          {pricingInfo && pricingInfo.discount > 0 && (
            <Box
              sx={{
                ...tagBaseSx,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                order: 2,
                ml: 'auto',
                pointerEvents: 'auto',
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 18 }} />
              {formatNumber(pricingInfo.discount, currentLocale)}%{' '}
              {LL.products.discount()}
            </Box>
          )}
        </Box>
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
              <Box>
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
                  {pricingInfo.priceRange ? (
                    <>
                      <PriceDisplay
                        priceInUSD={pricingInfo.priceRange.min}
                        showSymbol={true}
                        showOriginal={false}
                      />
                      {' - '}
                      <PriceDisplay
                        priceInUSD={pricingInfo.priceRange.max}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    </>
                  ) : (
                    <PriceDisplay
                      priceInUSD={pricingInfo.finalPrice}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  )}
                </Typography>
                {pricingInfo.priceRange && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#666',
                      fontSize: '0.75rem',
                      mt: 0.5,
                      display: 'block',
                    }}
                  >
                    {LL.products.multipleVariants() ||
                      'Multiple variants available'}
                  </Typography>
                )}
              </Box>
            </Box>
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

      {/* Variant Selection Dialog */}
      <Dialog
        open={variantDialogOpen}
        onClose={() => setVariantDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {LL.products.selectVariant() || 'Select Variant'}
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              {product.name}
            </FormLabel>
            <RadioGroup
              value={selectedVariantId || ''}
              onChange={(e) => setSelectedVariantId(e.target.value)}
            >
              {availableVariants.map((variant) => {
                const variantKey = variant.productInfo.id.toString();
                return (
                  <FormControlLabel
                    key={variantKey}
                    value={variantKey}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          width: '100%',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            {variant.productInfo.color && (
                              <>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor:
                                      variant.productInfo.color.hexCode,
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                  }}
                                />
                                <Typography variant="body2">
                                  {variant.productInfo.color.name}
                                </Typography>
                              </>
                            )}
                            {variant.productInfo.size && (
                              <Typography
                                variant="body2"
                                sx={{ ml: variant.productInfo.color ? 1 : 0 }}
                              >
                                Size: {variant.productInfo.size}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            {variant.discount > 0 && (
                              <Typography
                                variant="body2"
                                sx={{
                                  textDecoration: 'line-through',
                                  color: '#999',
                                  mr: 1,
                                }}
                              >
                                <PriceDisplay
                                  priceInUSD={variant.originalPrice}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                              </Typography>
                            )}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color:
                                  variant.discount > 0 ? '#f5576c' : '#667eea',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={variant.finalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{ color: '#666', display: 'block', mt: 0.5 }}
                          >
                            Stock: {variant.stockQuantity}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 1.5,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVariantDialogOpen(false)}>
            {LL.button.cancel()}
          </Button>
          <Button
            onClick={handleVariantConfirm}
            variant="contained"
            disabled={!selectedVariantId}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {LL.products.addToCart()}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CustomersProductCard;
