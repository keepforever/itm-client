import React from 'react';
import { graphql, compose } from "react-apollo";

import Home from "../../../platform/ux/Home";

//locals core
import HELLO_FEED from "../../GraphQl/Queries/HELLO_FEED";

const Loader = props => {
  //TODO if (prop.helloFeed.loading {return <OverlaySpinner/>})
  const helloFeed = props.helloFeed
  console.log('helloFeed', helloFeed)

  return (
    <Home
      helloFeed={helloFeed}
      puffPuffPass="puffPuffPass"
    />
  )
}

export default compose(
  graphql(HELLO_FEED, {
    options: {fetchPolicy: 'cache-and-network'},
    name: 'helloFeed'
  }),
)(Loader)
