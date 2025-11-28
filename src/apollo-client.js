import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    // uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql', // adjust to your GraphQL endpoint
    uri: import.meta.env.VITE_API_URL, // adjust to your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
