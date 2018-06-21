import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
//locals
import Routes from "./platform/routes";

const client = new ApolloClient({
  uri: "https://itm-node-basic-kchjtaklfo.now.sh"
});
const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
