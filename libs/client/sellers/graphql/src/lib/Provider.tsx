import React from 'react';
import { SellersApolloProvider } from './SellersApolloProvider';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const SellersGraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  return <SellersApolloProvider>{children}</SellersApolloProvider>;
};
