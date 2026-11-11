import React, { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useCustomersCartService, getDiscountedUnitPrice } from '@kickzone-workspace/customers-cart-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  usePageTitle,
  useSeoMeta,
  buildHomeJsonLd,
  useJsonLd,
} from '@kickzone-workspace/shared-i18n';

import {
  HOME_PAGE_QUERY,
  HomePageData,
  selectHomePageData,
} from './home-selectors';
import { useScrollProgress } from './useScrollProgress';

import { HeroSection } from './components/HeroSection';
import { CategoryBentoSection } from './components/CategoryBentoSection';
import { PicksRailSection } from './components/PicksRailSection';
import { TrustStripSection } from './components/TrustStripSection';
import { HomeLoadingScreen } from './components/HomeLoadingScreen';

export interface CustomersHomeProps {
  initialData?: HomePageData;
  mockLoading?: boolean;
}

export function CustomersHome({
  initialData,
  mockLoading,
}: CustomersHomeProps) {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.navigation.home());
  useSeoMeta({
    canonicalPath: '/',
    description: LL.home.hero.subtitle(),
    ogType: 'website',
  });
  const homeJsonLd = useMemo(() => buildHomeJsonLd(), []);
  useJsonLd('home-schema', homeJsonLd);
  useScrollProgress();

  const { data: apolloData, loading: apolloLoading } = useQuery<HomePageData>(
    HOME_PAGE_QUERY,
    {
      fetchPolicy: 'cache-first',
      skip: Boolean(initialData),
    }
  );

  const data = initialData || apolloData;
  const loading = mockLoading ?? (apolloLoading && !data);

  const { addItem } = useCustomersCartService();

  const handleAddToCart = useCallback(
    (product: KickzoneGraphqlTypes.Product, preferredSize?: string) => {
      const sp =
        product.sellerProducts?.find((s) => (s.stockQuantity || 0) > 0) ||
        product.sellerProducts?.[0];
      if (!sp) return;

      const pInfo =
        product.productInfos?.find((pi) =>
          preferredSize ? pi.size === preferredSize : true
        ) || product.productInfos?.[0];

      const size = pInfo?.size || preferredSize || null;
      const color = pInfo?.colors?.[0]?.hexCode || pInfo?.colors?.[0]?.name || null;
      const image = pInfo?.images?.[0] || null;

      addItem({
        productId: String(product.id),
        productName: product.name,
        productImage: image,
        quantity: 1,
        unitPrice: getDiscountedUnitPrice(sp.price, sp.discount),
        color,
        size,
        sellerId: String(sp.seller?.id || 1),
        sellerName: '',
        sellerShippingFee: sp.seller?.shippingFee || 0,
        sellerShippingPaymentMode:
          (sp.seller as { shippingPaymentMode?: 'PAY_ON_DELIVERY' | 'PAY_ONLINE' })?.shippingPaymentMode ||
          'PAY_ON_DELIVERY',
        productInfoId: pInfo ? String(pInfo.id) : '',
        sellerProductId: String(sp.id),
        availableStock: sp.stockQuantity || 1,
      });
    },
    [addItem]
  );

  const pageData = useMemo(() => selectHomePageData(data), [data]);

  return (
    <>
      {loading && <HomeLoadingScreen />}
      <CustomersLayout disablePadding={true}>
        <Box
          component="main"
          id="main"
          sx={{
            bgcolor: 'var(--page)',
            color: 'var(--ink)',
            minHeight: '100vh',
            width: '100%',
            overflowX: 'clip',
            position: 'relative',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {!loading && (
            <>
              <HeroSection
                rightProduct={pageData.hero.right}
                centerProduct={pageData.hero.center}
                leftProduct={pageData.hero.left}
              />

              <CategoryBentoSection
                bento={pageData.bento}
                categories={pageData.categories}
              />

              <PicksRailSection
                products={pageData.picks}
                exchangeRate={pageData.exchangeRate}
                onAddItem={handleAddToCart}
              />

              <TrustStripSection />
            </>
          )}
        </Box>
      </CustomersLayout>
    </>
  );
}

export default CustomersHome;
