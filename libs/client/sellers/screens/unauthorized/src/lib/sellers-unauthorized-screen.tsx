import React from 'react';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';

export function SellersUnauthorizedScreen() {
  return (
    <SellersLayout>
      <UnauthorizedPath
        appName="Sellers Portal"
        loginPath={SELLER_ROUTES.LOGIN}
        showAnimation={true}
        animationWidth={250}
        animationHeight={250}
      />
    </SellersLayout>
  );
}

export default SellersUnauthorizedScreen;
