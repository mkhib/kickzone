import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onError } from '@apollo/client/link/error';

const csrfLink = new ApolloLink((operation, forward) => {
  // Get current locale from localStorage (used by LanguageContext)
  const currentLocale =
    localStorage.getItem('kickzone-language-preference') || 'en';

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'apollo-require-preflight': 'true',
      'x-locale': currentLocale,
    },
  }));
  return forward(operation);
});

// Get GraphQL endpoint from environment variable or use default
// In production, nginx proxies /graphql to the API, so we use a relative path
// In development, we use the full localhost URL
const getGraphQLEndpoint = () => {
  // Check for Vite environment variable (VITE_ prefix required for client-side)
  if (import.meta.env.VITE_GRAPHQL_ENDPOINT) {
    return import.meta.env.VITE_GRAPHQL_ENDPOINT;
  }
  
  // In production, use relative path (nginx will proxy it)
  if (import.meta.env.PROD) {
    return '/graphql';
  }
  
  // Default to localhost for development
  return 'https://localhost:4000/graphql';
};

const httpLink = new HttpLink({
  uri: getGraphQLEndpoint(),
  credentials: 'include',
});

export const createSellersApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, operation, forward, error, result } =
      errorContext;

    // Check the main error object
    if (error && error.message) {
      if (
        error.message.toLowerCase().includes('not authenticated') ||
        error.message.toLowerCase().includes('unauthorized')
      ) {
        onAuthError();
        return;
      }
    }

    // Check result.errors array
    if (result && result.errors) {
      result.errors.forEach((err: any) => {
        if (
          err.message?.toLowerCase().includes('not authenticated') ||
          err.message?.toLowerCase().includes('unauthorized')
        ) {
          onAuthError();
          return;
        }
      });
    }

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, extensions }: any) => {
        // Check if this is an authentication error
        if (
          message.toLowerCase().includes('not authenticated') ||
          message.toLowerCase().includes('unauthorized') ||
          extensions?.code === 'UNAUTHENTICATED' ||
          extensions?.code === 'FORBIDDEN'
        ) {
          onAuthError();
        }
      });
    }

    if (networkError) {
      // Check for authentication-related network errors
      if (
        networkError.message?.toLowerCase().includes('not authenticated') ||
        networkError.message?.toLowerCase().includes('unauthorized') ||
        networkError?.statusCode === 401 ||
        networkError?.statusCode === 403
      ) {
        onAuthError();
      }
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([csrfLink, authErrorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: relayStylePagination(['filter']),
          },
        },
        Translation: {
          // Disable normalization for Translation objects since they have duplicate id=0
          keyFields: false,
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only', // Always fetch fresh data
      },
      query: {
        fetchPolicy: 'network-only', // Always fetch fresh data
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });
};

// Default client for backward compatibility (without error handling)
const apolloClient = new ApolloClient({
  link: ApolloLink.from([csrfLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(['filter']),
        },
      },
      Translation: {
        // Disable normalization for Translation objects since they have duplicate id=0
        keyFields: false,
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Always fetch fresh data
    },
    query: {
      fetchPolicy: 'network-only', // Always fetch fresh data
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default apolloClient;
