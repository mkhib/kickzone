import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

interface ApolloProviderBaseProps {
  client: ApolloClient<unknown>;
  children: React.ReactNode;
}

// Advanced error handling using Apollo Link's onError
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error('[GraphQL error]:', {
          message,
          locations,
          path,
          extensions,
          operationName: operation.operationName,
        });
      });
    }
    if (networkError) {
      console.error('[Network error]:', networkError, {
        operationName: operation.operationName,
      });
    }
    // Optionally, you can forward the operation or handle retries here
    return forward(operation);
  }
);

/**
 * ApolloProviderBase wraps ApolloProvider and injects advanced error handling via Apollo Link's onError.
 *
 * To use this, ensure your ApolloClient composes this errorLink as the first link in its link chain.
 * Example:
 *   const client = new ApolloClient({
 *     link: ApolloLink.from([errorLink, httpLink]),
 *     cache: new InMemoryCache(),
 *   });
 */
export { errorLink };

export const ApolloProviderBase: React.FC<ApolloProviderBaseProps> = ({
  client,
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
