import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export function getClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'https://graphql-pokemon2.vercel.app/', // Pokemon GraphQL endpoint
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}