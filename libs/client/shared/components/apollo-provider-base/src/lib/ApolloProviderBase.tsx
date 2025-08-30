import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient } from '@apollo/client';

interface ApolloProviderBaseProps {
  client: ApolloClient;
  children: React.ReactNode;
}

// Note: Error handling is now done at the client level or through error policies
// The errorLink is no longer needed in the same way in Apollo Client 4
export const errorLink = null;

/**
 * ApolloProviderBase wraps ApolloProvider and provides a base for Apollo Client configuration.
 *
 * In Apollo Client 4, error handling is typically done through error policies
 * and the client configuration rather than through custom error links.
 */

export const ApolloProviderBase: React.FC<ApolloProviderBaseProps> = ({
  client,
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
