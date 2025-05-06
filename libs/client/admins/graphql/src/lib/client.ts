import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

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
  link: csrfLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
  credentials: 'include',
});

export default apolloClient;
