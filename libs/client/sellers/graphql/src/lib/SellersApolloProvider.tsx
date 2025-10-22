import React from 'react';
import { ApolloProviderBase } from '@kickzone-workspace/apollo-provider-base';
import { createSellersApolloClient } from './client';
import { useCallback } from 'react';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';

interface SellersApolloProviderProps {
  children: React.ReactNode;
}

export const SellersApolloProvider: React.FC<SellersApolloProviderProps> = ({
  children,
}) => {
  const handleAuthError = useCallback(() => {
    // Clear only seller authentication data
    localStorage.removeItem('seller_user');

    // Redirect to login page using window.location
    window.location.href = SELLER_ROUTES.LOGIN;
  }, []);

  const apolloClient = React.useMemo(
    () => createSellersApolloClient(handleAuthError),
    [handleAuthError]
  );

  return (
    <ApolloProviderBase client={apolloClient}>{children}</ApolloProviderBase>
  );
};
