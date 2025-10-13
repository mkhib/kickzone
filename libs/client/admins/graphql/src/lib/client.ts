import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const csrfLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'apollo-require-preflight': 'true',
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'https://localhost:4000/graphql',
  credentials: 'include',
});

const apolloClient = new ApolloClient({
  link: csrfLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(['filter']),
          sellers: relayStylePagination(['input']),
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
