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
// In production, nginx proxies /graphql to the API, so we use a relative path.
// In local development (when running on localhost), we use the full localhost URL.
const getGraphQLEndpoint = () => {
  // Prefer explicit env override (avoid `any` by using a local typed helper)
  type ViteEnv = { VITE_GRAPHQL_ENDPOINT?: string };
  const viteEnv = (import.meta as unknown as { env?: ViteEnv }).env;
  if (viteEnv?.VITE_GRAPHQL_ENDPOINT) {
    return viteEnv.VITE_GRAPHQL_ENDPOINT;
  }

  // If we're NOT on localhost, always use relative path
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost'
  ) {
    return '/graphql';
  }

  // Fallback: local development on localhost
  return 'https://localhost:4000/graphql';
};

const httpLink = new HttpLink({
  uri: getGraphQLEndpoint(),
  credentials: 'include',
});

export const createCustomersApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, error, result } = errorContext;

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
      if (
        networkError.message?.toLowerCase().includes('not authenticated') ||
        networkError.message?.toLowerCase().includes('unauthorized') ||
        (networkError as any)?.statusCode === 401 ||
        (networkError as any)?.statusCode === 403
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
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
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
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default apolloClient;
