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
// - For local dev (127.0.0.1): always use http://127.0.0.1:4000/graphql (ignore relative paths in env)
// - For production: use VITE_GRAPHQL_ENDPOINT if set, otherwise /graphql (nginx proxy)
// - Fallback to http://127.0.0.1:4000/graphql for local development
const getGraphQLEndpoint = () => {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : 'no-window';

  // Read Vite env in a typed way to avoid any casts leaking around the codebase
  type ViteEnv = { VITE_GRAPHQL_ENDPOINT?: string };
  const viteEnv =
    (import.meta as unknown as { env?: ViteEnv }).env || ({} as ViteEnv);
  const fromEnv = viteEnv.VITE_GRAPHQL_ENDPOINT;

  let resolved: string;

  // For local dev, ALWAYS use absolute URL to API server (ignore relative paths)
  if (typeof window !== 'undefined' && hostname === '127.0.0.1') {
    // Only use env var if it's an absolute URL (http:// or https://)
    if (
      fromEnv &&
      (fromEnv.startsWith('http://') || fromEnv.startsWith('https://'))
    ) {
      resolved = fromEnv;
    } else {
      // Force absolute URL for local dev
      resolved = 'http://127.0.0.1:4000/graphql';
    }
  } else if (fromEnv) {
    resolved = fromEnv;
  } else if (typeof window !== 'undefined' && hostname !== '127.0.0.1') {
    resolved = '/graphql';
  } else {
    resolved = 'http://127.0.0.1:4000/graphql';
  }

  return resolved;
};

const graphqlUri = getGraphQLEndpoint();

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'include',
});

export const createAdminsApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, error, result, operation } =
      errorContext;

    const operationName = operation?.operationName;

    // Never treat login failures as "global auth errors" that trigger a full reload.
    // The login screen should show a validation error instead of redirecting.
    const isLoginOperation =
      typeof operationName === 'string' &&
      operationName.toLowerCase() === 'login';

    // Check the main error object
    if (error && error.message) {
      if (
        !isLoginOperation &&
        (error.message.toLowerCase().includes('not authenticated') ||
          error.message.toLowerCase().includes('unauthorized') ||
          error.message.toLowerCase().includes('forbidden'))
      ) {
        onAuthError();
        return;
      }
    }

    // Check result.errors array
    if (!isLoginOperation && result && result.errors) {
      result.errors.forEach((err: { message?: string }) => {
        if (
          err.message?.toLowerCase().includes('not authenticated') ||
          err.message?.toLowerCase().includes('unauthorized') ||
          err.message?.toLowerCase().includes('forbidden')
        ) {
          onAuthError();
          return;
        }
      });
    }

    if (!isLoginOperation && graphQLErrors) {
      graphQLErrors.forEach(
        ({
          message,
          extensions,
        }: {
          message: string;
          extensions?: { code?: string } | null;
        }) => {
          console.warn('[Apollo][admins] GraphQL error', {
            message,
            extensions,
          });
          if (
            message.toLowerCase().includes('not authenticated') ||
            message.toLowerCase().includes('unauthorized') ||
            (message.toLowerCase().includes('forbidden') &&
              !isLoginOperation) ||
            extensions?.code === 'UNAUTHENTICATED' ||
            extensions?.code === 'FORBIDDEN'
          ) {
            onAuthError();
          }
        }
      );
    }

    if (!isLoginOperation && networkError) {
      console.warn('[Apollo][admins] Network error', networkError);
      if (
        networkError.message?.toLowerCase().includes('not authenticated') ||
        networkError.message?.toLowerCase().includes('unauthorized') ||
        networkError.statusCode === 401 ||
        networkError.statusCode === 403
      ) {
        onAuthError();
      }
    }
  });

  return new ApolloClient({
    link: csrfLink.concat(authErrorLink).concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: relayStylePagination(['filter']),
            sellers: relayStylePagination(['filter']),
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
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
};

// Default client for backward compatibility (without error handling)
const apolloClient = new ApolloClient({
  link: csrfLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(['filter']),
          sellers: relayStylePagination(['filter']),
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
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
