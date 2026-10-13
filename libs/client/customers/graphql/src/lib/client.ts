import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';

import {
  createSilentRefreshAuthLink,
} from '@kickzone-workspace/apollo-provider-base';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
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

interface ProductConnectionCache {
  edges?: Array<{ node?: { id?: number | string }; cursor?: string }>;
  pageInfo?: {
    endCursor?: string;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
  totalCount?: number;
}

export const productsPaginationPolicy = () => ({
  keyArgs: (args: Record<string, Record<string, unknown>> | null) => {
    if (!args || !args.filter) return false;
    const { first: _first, after: _after, ...rest } = args.filter;
    return JSON.stringify(rest);
  },
  merge(
    existing: ProductConnectionCache | undefined,
    incoming: ProductConnectionCache | undefined,
    { args }: { args: Record<string, { after?: string }> | null }
  ) {
    if (!existing) return incoming;
    if (!incoming) return existing;

    const existingEdges = existing.edges || [];
    const incomingEdges = incoming.edges || [];

    if (args?.filter?.after) {
      const existingIds = new Set(
        existingEdges.map((e) => e?.node?.id)
      );
      const uniqueIncomingEdges = incomingEdges.filter(
        (e) => e?.node?.id != null && !existingIds.has(e.node.id)
      );
      return {
        ...incoming,
        edges: [...existingEdges, ...uniqueIncomingEdges],
        pageInfo: incoming.pageInfo,
        totalCount:
          incoming.totalCount !== undefined
            ? incoming.totalCount
            : existing.totalCount,
      };
    }

    return incoming;
  },
});

const isCartRoute = () => {
  if (typeof window === 'undefined') return false;
  const currentPath = window.location.pathname;
  return (
    currentPath === CUSTOMER_ROUTES.CART ||
    currentPath.startsWith(`${CUSTOMER_ROUTES.CART}/`)
  );
};

export const createCustomersApolloClient = (onAuthError: () => void) => {
  const authErrorLink = createSilentRefreshAuthLink({
    graphqlUri,
    onAuthError,
    shouldSkipRedirect: isCartRoute,
  });

  return new ApolloClient({
    link: ApolloLink.from([csrfLink, authErrorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: productsPaginationPolicy(),
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
          products: productsPaginationPolicy(),
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
