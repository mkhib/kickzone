import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';

const csrfLink = new ApolloLink((operation, forward) => {
  // Get current locale from localStorage (used by LanguageContext)
  const currentLocale =
    typeof window !== 'undefined'
      ? localStorage.getItem('kickzone-language-preference') || 'en'
      : 'en';

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'apollo-require-preflight': 'true',
      'x-locale': currentLocale,
    },
  }));
  return forward(operation);
});

// Get GraphQL endpoint:
// - Local + production both prefer relative /graphql (Vite proxy locally, nginx in prod)
// - Absolute VITE_GRAPHQL_ENDPOINT wins when explicitly set
const getGraphQLEndpoint = () => {
  type ViteEnv = { VITE_GRAPHQL_ENDPOINT?: string };
  const viteEnv =
    (import.meta as unknown as { env?: ViteEnv }).env || ({} as ViteEnv);
  const fromEnv = viteEnv.VITE_GRAPHQL_ENDPOINT;

  if (fromEnv) {
    return fromEnv;
  }

  return '/graphql';
};

const graphqlUri = getGraphQLEndpoint();

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'include',
});

export const createSellersApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, operation, error, result } =
      errorContext;

    const operationName = operation?.operationName;
    const isLoginOperation =
      typeof operationName === 'string' &&
      operationName.toLowerCase() === 'login';

    // Never treat login failures as global auth errors; let the login screen show the message.
    if (isLoginOperation) {
      return;
    }

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
      result.errors.forEach((err: { message?: string }) => {
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
      graphQLErrors.forEach(
        ({
          message,
          extensions,
        }: {
          message: string;
          extensions?: { code?: string } | null;
        }) => {
          console.warn('[Apollo][sellers] GraphQL error', {
            message,
            extensions,
          });

          if (
            message.toLowerCase().includes('not authenticated') ||
            message.toLowerCase().includes('unauthorized') ||
            extensions?.code === 'UNAUTHENTICATED'
          ) {
            onAuthError();
          }
        }
      );
    }

    if (networkError) {
      console.warn('[Apollo][sellers] Network error', networkError);
      if (
        networkError.message?.toLowerCase().includes('not authenticated') ||
        networkError.message?.toLowerCase().includes('unauthorized') ||
        (networkError as { statusCode?: number }).statusCode === 401 ||
        (networkError as { statusCode?: number }).statusCode === 403
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
