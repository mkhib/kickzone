import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { resolveProductBrand } from '@kickzone-workspace/customers-product-card';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import { formatTomanPrice } from '../home-selectors';

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

interface PicksRailSectionProps {
  products: KickzoneGraphqlTypes.Product[];
  exchangeRate: number;
  onAddItem?: (product: KickzoneGraphqlTypes.Product, size?: string) => void;
}

export function PicksRailSection({
  products,
  exchangeRate,
  onAddItem,
}: PicksRailSectionProps) {
  const { LL } = useI18nContext();
  const { currentLocale, isRTL } = useLanguageContext();
  const railRef = useRef<HTMLDivElement | null>(null);
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});

  const scroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const step = railRef.current.clientWidth * 0.75;
    railRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: KickzoneGraphqlTypes.Product) => {
    e.preventDefault();
    e.stopPropagation();

    const size = product.productInfos?.[0]?.size || 'L';
    if (onAddItem) {
      onAddItem(product, size);
    }

    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  if (!products || products.length === 0) return null;

  return (
    <Box
      component="section"
      id="picks"
      aria-labelledby="picks-heading"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        className="rv"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          maxWidth: 1280,
          margin: '0 auto',
          px: { xs: 2.5, sm: 4, md: 6 },
          mb: { xs: 3.5, md: 5 },
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              mb: 1,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.picks.kicker()}
          </Typography>
          <Typography
            id="picks-heading"
            component="h2"
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: { xs: '26px', sm: '32px', md: '38px' },
              fontWeight: 800,
              color: 'var(--ink)',
              lineHeight: 1.25,
            }}
          >
            {LL.home.picks.title()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            direction: 'ltr',
          }}
        >
          <IconButton
            onClick={() => scroll('left')}
            aria-label={isRTL ? LL.home.picks.next() : LL.home.picks.prev()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--hair)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'var(--page)',
                borderColor: 'var(--ink-3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton
            onClick={() => scroll('right')}
            aria-label={isRTL ? LL.home.picks.prev() : LL.home.picks.next()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--hair)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'var(--page)',
                borderColor: 'var(--ink-3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Horizontal Rail */}
      <Box
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={LL.home.picks.title()}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: {
            xs: '70%',
            sm: '44%',
            md: 'clamp(200px, 19vw, 256px)',
          },
          gap: { xs: '14px', md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          px: {
            xs: '20px',
            md: 'max(24px, calc((100% - 1180px) / 2))',
          },
          scrollPaddingInline: {
            xs: '20px',
            md: 'max(24px, calc((100% - 1180px) / 2))',
          },
          py: 1,
          outline: 'none',
          '&:focus-visible': {
            outline: '2px solid var(--focus)',
            outlineOffset: '2px',
          },
        }}
      >
        {products.map((prod, idx) => {
          const images = prod.productInfos?.[0]?.images || [];
          const img1 = resolveImageUrl(images[0]) || '';
          const img2 = resolveImageUrl(images[1]) || null;
          const brand = resolveProductBrand(prod);
          const usdPrice = prod.sellerProducts?.[0]?.price || 0;
          const discount = prod.sellerProducts?.[0]?.discount || 0;
          const size = prod.productInfos?.[0]?.size || 'L';
          const isAdded = Boolean(addedMap[prod.id]);

          return (
            <Box
              key={prod.id}
              className="rv"
              sx={{
                '--d': idx % 4,
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Media Square */}
              <Box
                component={RouterLink}
                to={`/product/${prod.id}`}
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  bgcolor: 'var(--frame)',
                  display: 'block',
                  textDecoration: 'none',
                  '&:hover': {
                    '& .picks-img-primary': {
                      transform: img2 ? 'none' : 'scale(1.04)',
                      opacity: img2 ? 0 : 1,
                    },
                    '& .picks-img-secondary': {
                      opacity: 1,
                    },
                    '& .quick-add-btn': {
                      maxWidth: { xs: 40, md: 170 },
                      px: { xs: 0, md: 1.5 },
                      '& .quick-add-label': {
                        opacity: { xs: 0, md: 1 },
                        display: { xs: 'none', md: 'inline' },
                      },
                    },
                  },
                }}
              >
                {/* Primary Image */}
                <Box
                  component="img"
                  className="picks-img-primary"
                  src={img1}
                  alt={prod.name}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                  }}
                />

                {/* Secondary Image for cross-fade */}
                {img2 && (
                  <Box
                    component="img"
                    className="picks-img-secondary"
                    src={img2}
                    alt={`${prod.name} view 2`}
                    loading="lazy"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                )}

                {/* Quick-Add Button at bottom-end corner */}
                <ButtonBase
                  className="quick-add-btn"
                  onClick={(e) => handleQuickAdd(e, prod)}
                  aria-label={`سایز ${size} · افزودن به سبد`}
                  sx={{
                    position: 'absolute',
                    bottom: '12px',
                    insetInlineEnd: '12px',
                    height: 40,
                    minWidth: 40,
                    maxWidth: 40,
                    borderRadius: '20px',
                    bgcolor: isAdded ? 'var(--accent)' : 'var(--paper)',
                    color: isAdded ? '#ffffff' : 'var(--ink)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)',
                    border: '1px solid var(--hair)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.75,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    transition:
                      'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, padding 0.3s ease',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: isAdded ? 'var(--accent)' : 'var(--page)',
                    },
                  }}
                >
                  {isAdded ? (
                    <>
                      <CheckIcon sx={{ fontSize: 18 }} />
                      <Typography
                        component="span"
                        className="quick-add-label"
                        sx={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                        }}
                      >
                        اضافه شد
                      </Typography>
                    </>
                  ) : (
                    <>
                      <AddIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                      <Typography
                        component="span"
                        className="quick-add-label"
                        sx={{
                          fontSize: '12px',
                          fontWeight: 600,
                          opacity: 0,
                          display: 'none',
                        }}
                      >
                        سایز {size} · افزودن
                      </Typography>
                    </>
                  )}
                </ButtonBase>
              </Box>

              {/* Info Below Image */}
              <Box sx={{ pt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {/* Brand */}
                <Typography
                  component="span"
                  lang="en"
                  sx={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: 'var(--ink-3)',
                    textTransform: 'uppercase',
                  }}
                >
                  {brand}
                </Typography>

                {/* Name */}
                <Typography
                  component={RouterLink}
                  to={`/product/${prod.id}`}
                  sx={{
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '2.8em',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'var(--accent)',
                    },
                  }}
                >
                  <bdi dir="ltr" lang="en">
                    {prod.name}
                  </bdi>
                </Typography>

                {/* Price */}
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    mt: 0.5,
                  }}
                >
                  {formatTomanPrice(
                    usdPrice,
                    exchangeRate,
                    discount,
                    LL.home.currency.toman(),
                    currentLocale === 'fa' ? 'fa' : 'en'
                  )}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PicksRailSection;
