import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { createSilentRefreshAuthLink } from '@kickzone-workspace/apollo-provider-base';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';

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

const httpLink = new UploadHttpLink({
  uri: graphqlUri,
  credentials: 'include',
}) as unknown as ApolloLink;

export const createAdminsApolloClient = (onAuthError: () => void) => {
  const authErrorLink = createSilentRefreshAuthLink({
    graphqlUri,
    onAuthError,
  });

  return new ApolloClient({
    link: ApolloLink.from([csrfLink, authErrorLink, httpLink]),
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
  link: ApolloLink.from([csrfLink, httpLink]),
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
