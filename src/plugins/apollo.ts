import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '@/stores/auth';

// HTTP connection to the API
const httpLink = createHttpLink({
  // Use environment variable for the API URL
  uri: import.meta.env.VITE_API_URL || 'http://localhost:5000/graphql',
});

// Auth middleware
const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore();
  const token = authStore.access_token;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getMyTrainings: {
          merge: false
        },
        getAllOrgTrainings: {
          merge: false
        }
      }
    }
  }
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
}); 