import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
//locals
import Routes from "./platform/routes";

//uri: "https://itm-node-basic-kchjtaklfo.now.sh"
//uri: "https://itm-adv-server-gqzwermccg.now.sh"
const client = new ApolloClient({
  uri: "https://itm-adv-server-mnsdyyfqqc.now.sh"
});
const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
