import React from 'react';
import { ApolloProviderBase } from '@kickzone-workspace/apollo-provider-base';
import { createAdminsApolloClient } from './client';
import { useCallback } from 'react';
import { ADMIN_ROUTES } from '@kickzone-workspace/admins-routes';

interface AdminsApolloProviderProps {
  children: React.ReactNode;
}

export const AdminsApolloProvider: React.FC<AdminsApolloProviderProps> = ({
  children,
}) => {
  const handleAuthError = useCallback(() => {
    console.log('Authentication error in Admins, redirecting to login...');

    // Clear only admin authentication data
    localStorage.removeItem('admin_user');

    // Redirect to login page using window.location
    window.location.href = ADMIN_ROUTES.LOGIN;
  }, []);

  const apolloClient = React.useMemo(
    () => createAdminsApolloClient(handleAuthError),
    [handleAuthError]
  );

  return (
    <ApolloProviderBase client={apolloClient}>{children}</ApolloProviderBase>
  );
};
