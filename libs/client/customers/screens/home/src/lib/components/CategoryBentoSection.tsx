import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import {
  getCustomerBrandRoute,
  getCustomerShopRoute,
} from '@kickzone-workspace/customers-routes';
import {
  HomeCategory,
  resolveCategoryLabel,
  toPersianDigits,
} from '../home-selectors';

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

interface BentoTileProps {
  title: string;
  countLabel: string;
  link: string;
  product?: KickzoneGraphqlTypes.Product;
  isBig?: boolean;
  kicker?: string;
  tagline?: string;
  fallbackImage: string;
}

function BentoTile({
  title,
  countLabel,
  link,
  product,
  isBig = false,
  kicker,
  tagline,
  fallbackImage,
}: BentoTileProps) {
  const rawImg =
    product?.productInfos?.[0]?.images?.[0] ||
    product?.sellerProducts?.[0]?.productInfo?.images?.[0];
  const image = resolveImageUrl(rawImg) || fallbackImage;

  return (
    <Box
      component={RouterLink}
      to={link}
      className="rv"
      sx={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        backgroundColor: 'var(--frame)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: '22px 20px',
        gridColumn: isBig ? { xs: 'span 2', md: 'span 2' } : 'span 1',
        gridRow: isBig ? 'span 2' : 'span 1',
        fontFamily: 'var(--font-sans)',
        transition: 'transform 0.4s var(--ease)',
        '&:hover img': {
          transform: 'scale(1.04)',
        },
        '&:hover .bento-arrow': {
          backgroundColor: '#ffffff',
          color: '#111111',
          transform: 'translateX(-4px)',
        },
      }}
    >
      <Box
        component="img"
        src={image}
        alt=""
        loading="lazy"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 22%',
          transition: 'transform 0.9s var(--ease)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isBig
            ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, transparent 65%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Box sx={{ color: '#ffffff', maxWidth: isBig ? '75%' : '80%' }}>
          {isBig && kicker && (
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'rgba(255, 255, 255, 0.85)',
                mb: 1,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {kicker}
            </Typography>
          )}

          <Typography
            component="h3"
            sx={{
              fontSize: isBig ? 'clamp(48px, 5.4vw, 80px)' : '24px',
              fontWeight: isBig ? 900 : 800,
              lineHeight: 1.1,
              color: '#ffffff',
              mb: 0.5,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {title}
          </Typography>

          {isBig && tagline && (
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 1,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {tagline}
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {countLabel}
          </Typography>
        </Box>

        <Box
          className="bento-arrow"
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.25s var(--ease)',
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: 20,
              transform: (theme) =>
                theme.direction === 'rtl' ? 'none' : 'scaleX(-1)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

interface CategoryBentoSectionProps {
  bento: {
    jordan: { product?: KickzoneGraphqlTypes.Product; count: number };
    women: { product?: KickzoneGraphqlTypes.Product; count: number };
    men: { product?: KickzoneGraphqlTypes.Product; count: number };
    hoodies: { product?: KickzoneGraphqlTypes.Product; count: number };
    pants: { product?: KickzoneGraphqlTypes.Product; count: number };
  };
  categories?: HomeCategory[];
}

export function CategoryBentoSection({
  bento,
  categories,
}: CategoryBentoSectionProps) {
  const { LL } = useI18nContext();
  const { currentLocale, formatNumber } = useLanguageContext();

  const labels = useMemo(
    () => ({
      women: resolveCategoryLabel(
        'women',
        categories,
        LL.home.categories.women()
      ),
      men: resolveCategoryLabel('men', categories, LL.home.categories.men()),
      hoodies: resolveCategoryLabel(
        'hoodies',
        categories,
        LL.home.categories.hoodies()
      ),
      pants: resolveCategoryLabel(
        'pants',
        categories,
        LL.home.categories.pants()
      ),
      jordan: LL.home.categories.jordan(),
    }),
    [LL, categories]
  );

  const formatCount = (count: number) => {
    const n =
      currentLocale === 'fa' ? toPersianDigits(count) : String(formatNumber(count));
    return LL.home.categories.productCount({ count: n });
  };

  return (
    <Box
      component="section"
      aria-labelledby="bento-title"
      sx={{
        width: 'min(var(--wrap, 1180px), 100% - 2 * clamp(20px, 4vw, 48px))',
        mx: 'auto',
        pt: 'clamp(72px, 9vw, 120px)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box className="rv" sx={{ mb: '32px' }}>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: '0.02em',
            mb: 0.5,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {LL.home.categories.kicker()}
        </Typography>
        <Typography
          id="bento-title"
          component="h2"
          sx={{
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {LL.home.categories.title()}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gridAutoRows: {
            xs: '200px',
            sm: '220px',
            md: 'clamp(240px, 22vw, 320px)',
          },
          gap: '16px',
        }}
      >
        <BentoTile
          isBig
          title={labels.jordan}
          countLabel={formatCount(bento.jordan.count)}
          kicker="AIR JORDAN"
          tagline={LL.home.categories.jordanTagline()}
          link={getCustomerBrandRoute('jordan')}
          product={bento.jordan.product}
          fallbackImage="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800"
        />

        <BentoTile
          title={labels.women}
          countLabel={formatCount(bento.women.count)}
          link={getCustomerShopRoute({ category: 'women' })}
          product={bento.women.product}
          fallbackImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"
        />

        <BentoTile
          title={labels.men}
          countLabel={formatCount(bento.men.count)}
          link={getCustomerShopRoute({ category: 'men' })}
          product={bento.men.product}
          fallbackImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600"
        />

        <BentoTile
          title={labels.hoodies}
          countLabel={formatCount(bento.hoodies.count)}
          link={getCustomerShopRoute({ category: 'hoodies' })}
          product={bento.hoodies.product}
          fallbackImage="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600"
        />

        <BentoTile
          title={labels.pants}
          countLabel={formatCount(bento.pants.count)}
          link={getCustomerShopRoute({ category: 'pants' })}
          product={bento.pants.product}
          fallbackImage="https://images.unsplash.com/photo-1542272604-780c96856592?w=600"
        />
      </Box>
    </Box>
  );
}
