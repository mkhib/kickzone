import React, { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

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

export interface CustomersHomeProps {
  initialData?: HomePageData;
  mockLoading?: boolean;
}

export function CustomersHome({
  initialData,
  mockLoading,
}: CustomersHomeProps) {
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

      const size = pInfo?.size || preferredSize || 'L';
      const color = pInfo?.colors?.[0]?.name || null;
      const image = pInfo?.images?.[0] || null;

      addItem({
        productId: String(product.id),
        productName: product.name,
        productImage: image,
        quantity: 1,
        unitPrice: sp.price,
        color,
        size,
        sellerId: String(sp.seller?.id || 1),
        sellerName: '',
        sellerShippingFee: sp.seller?.shippingFee || 0,
        productInfoId: pInfo ? String(pInfo.id) : '',
        sellerProductId: String(sp.id),
        availableStock: sp.stockQuantity || 1,
      });
    },
    [addItem]
  );

  const pageData = useMemo(() => selectHomePageData(data), [data]);

  return (
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
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 20,
              minHeight: '60vh',
            }}
          >
            <CircularProgress sx={{ color: 'var(--accent)' }} />
          </Box>
        )}

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
      </Box>
    </CustomersLayout>
  );
}

export default CustomersHome;
