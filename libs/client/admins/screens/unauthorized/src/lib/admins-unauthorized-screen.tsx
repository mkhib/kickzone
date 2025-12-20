import React from 'react';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';

export function AdminsUnauthorizedScreen() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.unauthorized());
  return (
    <AdminsLayout>
      <UnauthorizedPath
        appName="Admins Portal"
        loginPath="/login"
        showAnimation={true}
        animationWidth={250}
        animationHeight={250}
      />
    </AdminsLayout>
  );
}

export default AdminsUnauthorizedScreen;
