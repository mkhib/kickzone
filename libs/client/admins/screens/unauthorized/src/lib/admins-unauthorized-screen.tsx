import React from 'react';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';

export function AdminsUnauthorizedScreen() {
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
