import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
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

export interface BrandBlockItem {
  brand: string;
  mediaProduct?: KickzoneGraphqlTypes.Product;
  lineKey: 'nike' | 'jordan' | 'adidas';
  miniProducts: KickzoneGraphqlTypes.Product[];
  link: string;
}

interface BrandBlocksSectionProps {
  blocks: BrandBlockItem[];
  exchangeRate: number;
}

const BRAND_FALLBACKS: Record<string, string> = {
  NIKE: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
  JORDAN: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
  ADIDAS: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&auto=format&fit=crop&q=80',
};

export function BrandBlocksSection({ blocks, exchangeRate }: BrandBlocksSectionProps) {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();

  const brandLine = (key: BrandBlockItem['lineKey']) => {
    if (key === 'nike') return LL.home.brands.lineNike();
    if (key === 'jordan') return LL.home.brands.lineJordan();
    return LL.home.brands.lineAdidas();
  };

  return (
    <Box
      component="section"
      id="brands"
      aria-labelledby="brands-heading"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, sm: 4, md: 6 },
        maxWidth: 1280,
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }} className="rv">
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
          {LL.home.brands.kicker()}
        </Typography>
        <Typography
          id="brands-heading"
          component="h2"
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: { xs: '26px', sm: '32px', md: '38px' },
            fontWeight: 800,
            color: 'var(--ink)',
            lineHeight: 1.25,
          }}
        >
          {LL.home.brands.title()}
        </Typography>
      </Box>

      {/* 3 Columns Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: '44px', md: '28px' },
        }}
      >
        {blocks.map((block, idx) => {
          const mediaRawImg =
            block.mediaProduct?.productInfos?.[0]?.images?.[0] ||
            block.mediaProduct?.sellerProducts?.[0]?.productInfo?.images?.[0];
          const mediaImage =
            resolveImageUrl(mediaRawImg) || BRAND_FALLBACKS[block.brand.toUpperCase()] || '';

          return (
            <Box
              key={block.brand}
              className="rv"
              sx={{
                '--d': idx,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Media Card 4:5 */}
              <Box
                component={RouterLink}
                to={block.link}
                sx={{
                  position: 'relative',
                  display: 'block',
                  aspectRatio: '4 / 5',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  bgcolor: 'var(--frame)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.14)',
                    '& .brand-media-img': {
                      transform: 'scale(1.045)',
                    },
                  },
                }}
              >
                {/* Photo */}
                <Box
                  component="img"
                  className="brand-media-img"
                  src={mediaImage}
                  alt={block.mediaProduct?.name || block.brand}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Bottom Scrim */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(10, 10, 12, 0.72) 0%, rgba(10, 10, 12, 0.35) 38%, transparent 65%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Latin Wordmark at bottom 18px / inline-start 22px */}
                <Typography
                  component="span"
                  lang="en"
                  sx={{
                    position: 'absolute',
                    bottom: '18px',
                    insetInlineStart: '22px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    fontSize: '32px',
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    zIndex: 2,
                  }}
                >
                  {block.brand}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 2.2,
                  mb: 1.8,
                  fontSize: '15px',
                  color: 'var(--ink-2)',
                  lineHeight: 1.9,
                  minHeight: '3.8em',
                  fontWeight: 400,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {brandLine(block.lineKey)}
              </Typography>

              {/* Mini List of Products */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  mb: 2,
                }}
              >
                {block.miniProducts.map((prod) => {
                  const rawThumb =
                    prod.productInfos?.[0]?.images?.[0] ||
                    prod.sellerProducts?.[0]?.productInfo?.images?.[0];
                  const thumb = resolveImageUrl(rawThumb) || '';
                  const usdPrice = prod.sellerProducts?.[0]?.price || 0;
                  const discount = prod.sellerProducts?.[0]?.discount || 0;

                  return (
                    <Box
                      key={prod.id}
                      component={RouterLink}
                      to={`/product/${prod.id}`}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '56px 1fr auto',
                        gap: '12px',
                        alignItems: 'center',
                        p: '8px 10px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          bgcolor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                        },
                      }}
                    >
                      {/* 56px Thumbnail */}
                      <Box
                        component="img"
                        src={thumb}
                        alt={prod.name}
                        loading="lazy"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '10px',
                          objectFit: 'cover',
                          bgcolor: 'var(--frame)',
                          display: 'block',
                        }}
                      />

                      {/* Name with LTR ellipsis */}
                      <Box sx={{ overflow: 'hidden' }}>
                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            fontSize: '13.5px',
                            fontWeight: 500,
                            color: 'var(--ink)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <bdi dir="ltr" lang="en">
                            {prod.name}
                          </bdi>
                        </Typography>
                      </Box>

                      {/* Price in Persian */}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--ink)',
                          whiteSpace: 'nowrap',
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
                  );
                })}
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Box
                  component={RouterLink}
                  to={block.link}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    '&:hover': {
                      opacity: 0.85,
                      transform: 'translateX(-4px)',
                    },
                  }}
                >
                  <span>
                    {LL.home.brands.allProducts({ brand: block.brand })}
                  </span>
                  <ArrowBackIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default BrandBlocksSection;
