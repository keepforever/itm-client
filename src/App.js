import React from "react";
import { ApolloProvider } from "react-apollo";
//import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
//To pass Auth token in Header
import { AsyncStorage } from "react-native";
import { setContext } from 'apollo-link-context';
import { TOKEN_KEY } from './appConstants'
//locals
import Routes from "./platform/routes";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(createUploadLink({
    uri: 'https://itm-adv-server-nzeeuxluan.now.sh' })
  ),
  cache: new InMemoryCache(),
});

console.log("Client: ", client.link.request)

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
