import React from 'react';
import { ApolloProviderBase } from '@kickzone-workspace/apollo-provider-base';
import apolloClient from './client';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const CustomersGraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  return (
    <ApolloProviderBase client={apolloClient}>{children}</ApolloProviderBase>
  );
};
