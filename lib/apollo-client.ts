import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/', // Pokemon GraphQL API
  cache: new InMemoryCache(),
});

export default client;