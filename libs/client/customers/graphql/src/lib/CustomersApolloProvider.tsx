import React from 'react';
import { ApolloProviderBase } from '@kickzone-workspace/apollo-provider-base';
import { createCustomersApolloClient } from './client';
import { useCallback } from 'react';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';

interface CustomersApolloProviderProps {
  children: React.ReactNode;
}

export const CustomersApolloProvider: React.FC<
  CustomersApolloProviderProps
> = ({ children }) => {
  const handleAuthError = useCallback(() => {
    console.log('Authentication error in Customers, redirecting to login...');

    // Clear only customer authentication data
    localStorage.removeItem('customer_user');

    // Redirect to login page using window.location
    window.location.href = CUSTOMER_ROUTES.LOGIN;
  }, []);

  const apolloClient = React.useMemo(
    () => createCustomersApolloClient(handleAuthError),
    [handleAuthError]
  );

  return (
    <ApolloProviderBase client={apolloClient}>{children}</ApolloProviderBase>
  );
};
