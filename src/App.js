import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
//locals
import Routes from "./platform/routes";

// old
//uri: "https://itm-adv-server-kdoqbnzkzt.now.sh"
const client = new ApolloClient({
  uri: "https://itm-adv-server-hfklkaopec.now.sh"
});
const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
