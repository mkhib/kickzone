import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://localhost:4000/graphql',
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
  credentials: 'include',
});

export default apolloClient;
