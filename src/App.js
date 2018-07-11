import React from "react";
import { ApolloProvider } from "react-apollo";
//import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
//To pass Auth token in Header
import { AsyncStorage } from "react-native";
import { setContext } from 'apollo-link-context';
import { TOKEN_KEY } from './appConstants';
//For Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
//locals
import Routes from "./platform/routes";
//utils
import {clearLog} from './utils';
//For Apollo
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
    uri: 'https://itm-adv-server-fcldmxwfjj.now.sh' })
  ),
  cache: new InMemoryCache(),
});

clearLog("src/App.js, Client: ", client.link.request)

//For Redux
const store = createStore(rootReducer);

// Main Export
const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Provider>
);

export default App;
