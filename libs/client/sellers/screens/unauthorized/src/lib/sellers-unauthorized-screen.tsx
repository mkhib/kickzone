import React from 'react';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

export function SellersUnauthorizedScreen() {
  const { LL } = useI18nContext();

  return (
    <SellersLayout>
      <UnauthorizedPath
        appName={LL.navigation.sellersPortal()}
        loginPath={SELLER_ROUTES.LOGIN}
        showAnimation={true}
        animationWidth={250}
        animationHeight={250}
      />
    </SellersLayout>
  );
}

export default SellersUnauthorizedScreen;
