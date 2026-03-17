import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql';

const link = new HttpLink({
  uri: API_URL
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
