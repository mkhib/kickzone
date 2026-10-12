import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { formatTomanPrice, isProductInStock } from '../home-selectors';

const API_BASE_URL =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_BASE_URL || '';

const resolveImageUrl = (img?: string | null) => {
  if (!img) return null;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('//')) return `https:${img}`;
  if (img.startsWith('/')) {
    const base =
      API_BASE_URL && API_BASE_URL.startsWith('http')
        ? API_BASE_URL
        : typeof window !== 'undefined'
        ? window.location.origin
        : '';
    return `${base}${img}`;
  }
  return img;
};

interface LookItemData {
  item?: KickzoneGraphqlTypes.Product;
  typeLabel: string;
  hotspot: { left: string; top: string };
  size: string;
}

interface ShopTheLookSectionProps {
  lookProducts: LookItemData[];
  exchangeRate: number;
  onAddItem?: (product: KickzoneGraphqlTypes.Product, size?: string) => void;
  onAddAll?: (products: KickzoneGraphqlTypes.Product[]) => void;
}

export function ShopTheLookSection({
  lookProducts,
  exchangeRate,
  onAddItem,
  onAddAll,
}: ShopTheLookSectionProps) {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [addedItemIdx, setAddedItemIdx] = useState<number | null>(null);
  const [addedAll, setAddedAll] = useState(false);

  // Fallback photos
  const fallbackPhotos = [
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
  ];

  const getProductPriceUSD = (p?: KickzoneGraphqlTypes.Product) => {
    if (!p?.sellerProducts || p.sellerProducts.length === 0) return 0;
    const sp = p.sellerProducts.find((s) => (s.stockQuantity || 0) > 0) || p.sellerProducts[0];
    const original = sp?.price || 0;
    const discount = sp?.discount || 0;
    return discount > 0 ? original * (1 - discount / 100) : original;
  };

  // Compute sum of in-stock items
  const inStockItems = lookProducts.filter(
    (lp) => lp.item && isProductInStock(lp.item)
  );

  const totalSumUSD = inStockItems.reduce(
    (sum, lp) => sum + getProductPriceUSD(lp.item),
    0
  );

  const handleAddSingle = (idx: number, lp: LookItemData) => {
    if (!lp.item || !isProductInStock(lp.item)) return;
    onAddItem?.(lp.item, lp.size);
    setAddedItemIdx(idx);
    setTimeout(() => setAddedItemIdx(null), 1800);
  };

  const handleAddAll = () => {
    const valid = inStockItems.map((lp) => lp.item as KickzoneGraphqlTypes.Product);
    if (valid.length === 0) return;
    onAddAll?.(valid);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 1800);
  };

  return (
    <Box
      id="look"
      component="section"
      aria-labelledby="look-title"
      sx={{
        width: 'min(var(--wrap, 1180px), 100% - 2 * clamp(20px, 4vw, 48px))',
        mx: 'auto',
        pt: 'clamp(72px, 9vw, 120px)',
      }}
    >
      {/* 2 columns layout: 1.65fr (photos right in RTL) and 1fr (panel left in RTL) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.65fr 1fr' },
          gap: { xs: '32px', md: '40px' },
          alignItems: 'start',
        }}
      >
        {/* Look Board: 2x2 grid, aspect-ratio 1.12, gap 12px, radius 22px */}
        <Box
          className="rv"
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '12px',
            aspectRatio: { xs: '1', sm: '1.12' },
            width: '100%',
          }}
        >
          {lookProducts.map((lp, idx) => {
            const rawImg =
              lp.item?.productInfos?.[0]?.images?.[0] ||
              lp.item?.sellerProducts?.[0]?.productInfo?.images?.[0];
            const imgSrc = resolveImageUrl(rawImg) || fallbackPhotos[idx];
            const isSpanned = idx === 0; // Photo 0 spans both rows
            const isHighlighted = activeHighlight === idx;
            const priceUSD = getProductPriceUSD(lp.item);
            const inStock = lp.item ? isProductInStock(lp.item) : true;

            return (
              <Box
                key={idx}
                onMouseEnter={() => setActiveHighlight(idx)}
                onMouseLeave={() => setActiveHighlight(null)}
                sx={{
                  position: 'relative',
                  gridRow: isSpanned ? 'span 2' : 'span 1',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--frame)',
                }}
              >
                {/* Photo */}
                <Box
                  component="img"
                  src={imgSrc}
                  alt={lp.item?.name || lp.typeLabel}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition:
                      idx === 1 ? '50% 70%' : '50% 25%',
                    transform: isHighlighted ? 'scale(1.035)' : 'scale(1)',
                    transition: 'transform 0.8s var(--ease)',
                  }}
                />

                {/* Hotspot Button */}
                <Box
                  component="button"
                  type="button"
                  aria-label={lp.item?.name || lp.typeLabel}
                  aria-describedby={`tooltip-${idx}`}
                  onClick={() => setActiveHighlight(isHighlighted ? null : idx)}
                  sx={{
                    position: 'absolute',
                    left: lp.hotspot.left,
                    top: lp.hotspot.top,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4,
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translate(-50%, -50%) scale(1.12)',
                    },
                  }}
                >
                  {/* Black 10px dot inside */}
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#111111',
                    }}
                  />

                  {/* Pulsing Ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: '-7px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255, 255, 255, 0.85)',
                      pointerEvents: 'none',
                      animation: 'hotspotPulse 2.4s infinite ease-out',
                      '@keyframes hotspotPulse': {
                        '0%': { transform: 'scale(0.7)', opacity: 0.85 },
                        '100%': { transform: 'scale(1.5)', opacity: 0 },
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        animation: 'none',
                        opacity: 0.6,
                      },
                    }}
                  />
                </Box>

                {/* Hotspot Tooltip */}
                {isHighlighted && (
                  <Box
                    id={`tooltip-${idx}`}
                    role="tooltip"
                    sx={{
                      position: 'absolute',
                      left: lp.hotspot.left,
                      bottom: `calc(100% - ${lp.hotspot.top} + 18px)`,
                      transform: 'translateX(-50%)',
                      background: 'var(--paper)',
                      borderRadius: '14px',
                      p: '10px 14px',
                      fontSize: '12.5px',
                      zIndex: 10,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      border: '1px solid var(--hair)',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      maxWidth: '220px',
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontSize: '12px',
                        color: 'var(--ink)',
                        direction: 'ltr',
                        mb: 0.5,
                      }}
                    >
                      <bdi dir="ltr">{lp.item?.name || lp.typeLabel}</bdi>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                      }}
                    >
                      {inStock
                        ? formatTomanPrice(priceUSD, exchangeRate)
                        : 'ناموجود'}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Sticky Panel */}
        <Box
          className="rv"
          sx={{
            position: { xs: 'static', md: 'sticky' },
            top: { md: '88px' },
            background: 'var(--paper)',
            borderRadius: '28px',
            p: { xs: '24px', sm: '32px' },
            boxShadow:
              '0 0 0 1px var(--hair), 0 30px 60px -40px rgba(0,0,0,0.3)',
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--accent)',
              letterSpacing: '0.02em',
              mb: 0.5,
            }}
          >
            ست کامل
          </Typography>
          <Typography
            id="look-title"
            component="h2"
            sx={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--ink)',
              mb: 1.5,
            }}
          >
            جردن قرمز
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              lineHeight: 1.9,
              color: 'var(--ink-2)',
              mb: 3,
            }}
          >
            سه تکه از یک رنگ — سویشرت، شلوار فلیس و تی‌شرت جامپمن. جدا یا با هم.
          </Typography>

          {/* Ordered List of 3 rows */}
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {lookProducts.map((lp, idx) => {
              const rawImg =
                lp.item?.productInfos?.[0]?.images?.[0] ||
                lp.item?.sellerProducts?.[0]?.productInfo?.images?.[0];
              const imgSrc = resolveImageUrl(rawImg) || fallbackPhotos[idx];
              const priceUSD = getProductPriceUSD(lp.item);
              const inStock = lp.item ? isProductInStock(lp.item) : true;
              const isHighlighted = activeHighlight === idx;
              const isAdded = addedItemIdx === idx;

              return (
                <Box
                  component="li"
                  key={idx}
                  onMouseEnter={() => setActiveHighlight(idx)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr auto',
                    gap: '14px',
                    alignItems: 'center',
                    py: 2,
                    borderTop: '1px solid var(--hair)',
                    borderRadius: '16px',
                    background: isHighlighted
                      ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                      : 'transparent',
                    px: isHighlighted ? 1 : 0,
                    transition: 'background-color 0.2s',
                  }}
                >
                  {/* Thumbnail 64px, radius 12 */}
                  <Box
                    component={RouterLink}
                    to={lp.item ? `/product/${lp.item.id}` : '#'}
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--frame)',
                      flexShrink: 0,
                      display: 'block',
                    }}
                  >
                    <Box
                      component="img"
                      src={imgSrc}
                      alt=""
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  {/* Info */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        mb: 0.25,
                      }}
                    >
                      {lp.typeLabel}
                    </Typography>
                    <Typography
                      component={RouterLink}
                      to={lp.item ? `/product/${lp.item.id}` : '#'}
                      noWrap
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        direction: 'ltr',
                        display: 'block',
                        textAlign: 'start',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mb: 0.5,
                      }}
                    >
                      <bdi dir="ltr">{lp.item?.name || lp.typeLabel}</bdi>
                    </Typography>
                    <Typography sx={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>
                      سایز {lp.size} ·{' '}
                      {inStock
                        ? formatTomanPrice(priceUSD, exchangeRate)
                        : 'ناموجود'}
                    </Typography>
                  </Box>

                  {/* 40px Round + Button */}
                  <IconButton
                    disabled={!inStock}
                    onClick={() => handleAddSingle(idx, lp)}
                    aria-label={`افزودن ${lp.typeLabel} به سبد`}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: isAdded ? 'var(--accent)' : 'var(--cta-tint)',
                      color: isAdded ? '#ffffff' : 'var(--cta-ink)',
                      border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                      transition: 'all 0.2s var(--ease)',
                      '&:hover': {
                        background: 'var(--cta-tint-hover)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {isAdded ? (
                      <CheckIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <AddIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </Box>
              );
            })}
          </Box>

          {/* Total Row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2.5,
              mt: 1,
              borderTop: '1px solid var(--hair)',
            }}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>
              جمع ست
            </Typography>
            <Typography sx={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)' }}>
              {formatTomanPrice(totalSumUSD, exchangeRate)}
            </Typography>
          </Box>

          {/* Full-width Solid Button */}
          <Button
            fullWidth
            onClick={handleAddAll}
            disabled={inStockItems.length === 0}
            startIcon={
              addedAll ? (
                <CheckIcon sx={{ fontSize: 20 }} />
              ) : (
                <ShoppingBagOutlined sx={{ fontSize: 20 }} />
              )
            }
            sx={{
              height: 50,
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'none',
              background: addedAll ? 'var(--accent)' : 'var(--ink)',
              color: 'var(--page)',
              transition: 'all 0.2s var(--ease)',
              '&:hover': {
                background: 'var(--ink-2)',
                transform: 'scale(1.01)',
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
            }}
          >
            {addedAll ? 'هر سه به سبد اضافه شدند' : 'افزودن هر سه به سبد'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
