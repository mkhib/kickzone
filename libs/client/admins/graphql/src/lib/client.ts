import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import { errorLink } from '@kickzone-workspace/apollo-provider-base';

const csrfLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'apollo-require-preflight': 'true',
  },
}));

const httpLink = createUploadLink({
  uri: 'https://localhost:4000/graphql',
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
  },
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, csrfLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(['filter']),
          sellers: relayStylePagination(['input']),
        },
      },
    },
  }),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
  credentials: 'include',
});

export default apolloClient;
