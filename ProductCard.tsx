import React from 'react';
import { Glassmorphism } from './glassmorphism';
import { Typography } from './typography';
import { Button } from './button';
import { colors, radius, animation, spacing } from './design-tokens';

// Types
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number; // Original price
    imageUrl: string;
    rating: number; // 0-5
    reviewCount: number;
    inStock: boolean;
    isNew?: boolean;
    isSale?: boolean;
    discountPercentage?: number; // 0-100
    badgeText?: string; // Optional custom badge
  };
  onAddToCart: (productId: string) => void;
  onViewDetails: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  isRtl?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  onWishlistToggle,
  isRtl = false
}: ProductCardProps) {
  const {
    name,
    price,
    imageUrl,
    rating,
    reviewCount,
    inStock,
    isNew,
    isSale,
    discountPercentage,
    badgeText
  } = product;

  // Calculate prices
  const displayPrice = isSale && discountPercentage
    ? price * (1 - discountPercentage / 100)
    : price;

  const savings = isSale && discountPercentage
    ? price - displayPrice
    : 0;

  const hasSavings = savings > 0;

  // Format price with proper localization
  const formatPrice = (amount: number) =>
    amount.toLocaleString('fa-IR', {
      style: 'currency',
      currency: 'IRR'
    }).replace('IRR', '').trim();

  return (
    <Glassmorphism
      padding={3}
      isDark={false} // Product cards typically on light bg, but can be overridden
      elevation="light"
      borderRadius={radius.lg}
      hoverLift
      clickable
      onClick={() => onViewDetails(product.id)}
      className="product-card"
      style={{
        // iOS 27 specific enhancements
        '&:hover': {
          transform: 'translateY(-4px) scale(1.01)',
          boxShadow:
            '0 20px 40px -10px rgba(0,0,0,0.08), ' +
            '0 0 0 1px rgba(255,255,255,0.2)',
        },
        '&:active': {
          transform: 'translateY(-2px) scale(0.99)',
        },
        // Subtle border refinement
        border: `1px solid ${colors.borderLight}`,
        // Ensure proper clipping for rounded corners
        overflow: 'hidden',
        // Add slight elevation even at rest
        boxShadow:
          '0 4px 12px -2px rgba(0,0,0,0.04), ' +
          '0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      {/* Optional Badges */}
      {!isRtl && (
        <div className="absolute top-3 start-3 flex gap-2 z-[10]">
          {badgeText && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
              {badgeText}
            </span>
          )}
          {isNew && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
              <span className="w-2 h-2 bg-brass rounded-full" />{/* New */}
            </span>
          )}
          {isSale && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
              -{discountPercentage}% {/* Sale */}
            </span>
          )}
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-square mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain"
          style={{
            // Subtle parallax lift on hover
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              transform: 'scale(1.04)',
            }
          }}
        />

        {/* Wishlist Button */}
        {onWishlistToggle && (
          <Button
            variant="ghost"
            size="xs"
            className="absolute top-3 end-3 z-[10] p-1"
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(product.id);
            }}
          >
            {/* Would use heart icon here */}
            <span className="text-[18px]">♡</span>
          </Button>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Product Name */}
        <Typography
          variant="body2"
          isRtl={isRtl}
          color="textSecondary"
          lineHeight="1.4"
          maxWidth="100%"
        >
          {name}
        </Typography>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 wrap">
          {hasSavings ? (
            <>
              {/* Original Price */}
              <Typography
                variant="body2"
                isRtl={isRtl}
                color="textSecondary"
                textDecoration="line-through"
                fontSize={typography.fontSizesm}
              >
                {formatPrice(price)}
              </Typography>

              {/* Discounted Price */}
              <Typography
                variant="h6"
                isRtl={isRtl}
                color="textPrimary"
                fontWeight="bold"
              >
                {formatPrice(displayPrice)}
              </Typography>

              {/* Savings Badge */}
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
                {/* You save */}: {formatPrice(savings)}
              </span>
            </>
          ) : (
            <Typography
              variant="h6"
              isRtl={isRtl}
              color="textPrimary"
              fontWeight="bold"
            >
              {formatPrice(displayPrice)}
            </>
          )}
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-1">
          {/* Stars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <span
                key={starIndex}
                className={`w-3 h-3 text-${starIndex <= rating ? 'brass' : 'muted/30'}`}
                style={{ fontSize: '10px' }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Review Count */}
          <Typography
            variant="caption"
            isRtl={isRtl}
            color="textSecondary"
            ml={1}
          >
            ({reviewCount}) {/* Reviews */}
          </Typography>
        </div>

        {/* Stock Status */}
        {!inStock && (
          <Typography
            variant="caption"
            isRtl={isRtl}
            color="textSecondary"
            fontWeight="medium"
          >
            {/* Out of Stock */}
          </Typography>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        {/* View Details Button */}
        <Button
          variant="outline"
          isRtl={isRtl}
          startIcon={<ArrowForwardRounded />}
          onClick={() => onViewDetails(product.id)}
          size="sm"
        >
          {/* View Details */}
        </Button>

        {/* Add to Cart Button */}
        <Button
          variant={inStock ? 'primary' : 'outline'}
          isRtl={isRtl}
          disabled={!inStock}
          onClick={() => onAddToCart(product.id)}
          size="sm"
        >
          {inStock ?
            {/* Add to Cart */}
            :
            {/* Out of Stock */}
          }
        </Button>
      </div>
    </Glassmorphism>
  );
}

// Mobile-Optimized Product Grid Container
export function ProductGrid({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div
      className={`product-grid ${className}`}
      style={{
        // Fix for mobile padding/width issues
        display: 'grid',
        gap: `${spacing.md * 4}px`, // 16px from design tokens

        // Responsive grid that prevents last-child width issues
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',

        // Key fixes for the width problem:
        alignItems: 'start', // Prevents vertical stretching
        justifyItems: 'start', // Prevents horizontal stretching

        // Center the grid container if there's extra space
        justifyContent: 'center',

        // Respect safe areas on mobile devices (notch, etc.)
        padding: `0 env(safe-area-inset-horizontal, ${spacing.md * 4}px)`,

        // Ensure proper container sizing
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',

        // Add subtle bottom padding for better feel
        paddingBottom: `${spacing.lg * 4}px`,

        // iOS 27 style: subtle background enhancement
        backgroundColor: colors.bgPageLight,
        borderRadius: radius.xl,
        overflow: 'hidden',

        // Smooth transitions for theme changes
        transition: 'background-color 0.3s ease',

        // Dark mode support
        '&.dark': {
          backgroundColor: colors.bgPageDark,
        }
      }}
    >
      {children}
    </div>
  );
}

export default ProductCard;