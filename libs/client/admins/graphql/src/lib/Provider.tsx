import React from 'react';
import { AdminsApolloProvider } from './AdminsApolloProvider';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const AdminsGraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  return <AdminsApolloProvider>{children}</AdminsApolloProvider>;
};
