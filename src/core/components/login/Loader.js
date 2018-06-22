import React from 'react';
import { graphql, compose } from "react-apollo";

import LogIn from "../../../platform/ux/LogIn";
//locals core

const Loader = props => {

  return (
    <LogIn
      puffPuffPass="puffPuffPass"
    />
  )
}

export default Loader
