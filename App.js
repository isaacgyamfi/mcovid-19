import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigation from './navigation/MainTabNavigation';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://covid19-graphql.netlify.app/' }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <MainTabNavigation />
      </ApolloProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
