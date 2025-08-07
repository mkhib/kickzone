import React from 'react';
import { UnauthorizedPath } from '@kickzone-workspace/unauthorized-path';

export function CustomersUnauthorizedScreen() {
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
