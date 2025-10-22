import React from 'react';
import { CustomersApolloProvider } from './CustomersApolloProvider';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const CustomersGraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  return <CustomersApolloProvider>{children}</CustomersApolloProvider>;
};
