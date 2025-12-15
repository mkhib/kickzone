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
// - Prefer VITE_GRAPHQL_ENDPOINT (set at build time, see windows-deploy-client.bat)
// - Otherwise, on non-localhost hosts use relative /graphql (nginx will proxy it)
// - Fallback to https://localhost:4000/graphql for local development
const getGraphQLEndpoint = () => {
  try {
    const hostname =
      typeof window !== 'undefined' ? window.location.hostname : 'no-window';

    // Read Vite env in a typed way to avoid any casts leaking around the codebase
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
      resolved = 'https://localhost:4000/graphql';
    }

    console.log('[Apollo][admins] GraphQL endpoint resolved', {
      hostname,
      fromEnv,
      resolved,
    });

    return resolved;
  } catch (error) {
    console.error(
      '[Apollo][admins] Failed to resolve GraphQL endpoint, using /graphql fallback',
      error
    );
    return '/graphql';
  }
};

const graphqlUri = getGraphQLEndpoint();

console.log('[Apollo][admins] Creating HttpLink', { graphqlUri });

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'include',
});

export const createAdminsApolloClient = (onAuthError: () => void) => {
  const authErrorLink = onError((errorContext: any) => {
    const { graphQLErrors, networkError, error, result } = errorContext;

    console.log('[Apollo][admins] onError triggered', {
      hasGraphQLErrors: !!graphQLErrors?.length,
      hasNetworkError: !!networkError,
      errorMessage: error?.message,
    });

    // Check the main error object
    if (error && error.message) {
      if (
        error.message.toLowerCase().includes('not authenticated') ||
        error.message.toLowerCase().includes('unauthorized') ||
        error.message.toLowerCase().includes('forbidden')
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
          err.message?.toLowerCase().includes('unauthorized') ||
          err.message?.toLowerCase().includes('forbidden')
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
          console.warn('[Apollo][admins] GraphQL error', {
            message,
            extensions,
          });
          if (
            message.toLowerCase().includes('not authenticated') ||
            message.toLowerCase().includes('unauthorized') ||
            message.toLowerCase().includes('forbidden') ||
            extensions?.code === 'UNAUTHENTICATED' ||
            extensions?.code === 'FORBIDDEN'
          ) {
            onAuthError();
          }
        }
      );
    }

    if (networkError) {
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
