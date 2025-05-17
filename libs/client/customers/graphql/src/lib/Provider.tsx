import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './client';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const CustomersGraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
