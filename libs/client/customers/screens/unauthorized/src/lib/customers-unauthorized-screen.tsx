import React from 'react';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';

export function CustomersUnauthorizedScreen() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.unauthorized());
  return (
    <UnauthorizedPath
      appName="Customers Portal"
      loginPath="/login"
      showAnimation={true}
      animationWidth={250}
      animationHeight={250}
    />
  );
}

export default CustomersUnauthorizedScreen;
