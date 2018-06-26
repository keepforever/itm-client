import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { AsyncStorage } from "react-native";
import { setContext } from 'apollo-link-context';
import { TOKEN_KEY } from './appConstants'
//locals
import Routes from "./platform/routes";
//To pass Auth token in Header

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
  },
  // return {
  //   headers: {
  //     ...headers,
  //     authorization: token ? `Bearer ${token}` : '',
  //   },
  // };
});

console.log('AuthLink from App.js: ', authLink)

const client = new ApolloClient({
  uri: "https://itm-adv-server-nzeeuxluan.now.sh",
  headers: authLink
});
const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
