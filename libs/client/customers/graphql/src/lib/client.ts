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
// - Prefer VITE_GRAPHQL_ENDPOINT (set at build time, see deployment scripts)
// - Otherwise, on non-localhost hosts use relative /graphql (nginx will proxy it)
// - Fallback to http://localhost:4000/graphql for local development
const getGraphQLEndpoint = () => {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : 'no-window';

  type ViteEnv = { VITE_GRAPHQL_ENDPOINT?: string };
  const viteEnv =
    (import.meta as unknown as { env?: ViteEnv }).env || ({} as ViteEnv);
  const fromEnv = viteEnv.VITE_GRAPHQL_ENDPOINT;

  let resolved: string;

  if (fromEnv) {
    resolved = fromEnv;
  } else if (typeof window !== 'undefined' && hostname !== 'localhost') {
    resolved = '/graphql';
  } else {
    resolved = 'http://localhost:4000/graphql';
  }

  return resolved;
};

const graphqlUri = getGraphQLEndpoint();

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'include',
});

export const createCustomersApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, error, result, operation } =
      errorContext;

    const operationName = operation?.operationName;
    const isLoginOperation =
      typeof operationName === 'string' &&
      operationName.toLowerCase() === 'login';

    // Never treat login failures as global auth errors; the login page shows the message.
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
          console.warn('[Apollo][customers] GraphQL error', {
            message,
            extensions,
          });
          if (
            message.toLowerCase().includes('not authenticated') ||
            message.toLowerCase().includes('unauthorized') ||
            extensions?.code === 'UNAUTHENTICATED' ||
            extensions?.code === 'FORBIDDEN'
          ) {
            onAuthError();
          }
        }
      );
    }

    if (networkError) {
      console.warn('[Apollo][customers] Network error', networkError);
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
