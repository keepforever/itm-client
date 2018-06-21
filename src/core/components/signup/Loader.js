import React from 'react';
import { graphql, compose } from "react-apollo";

import SignUp from "../../../platform/ux/SignUp";
//locals core


const Loader = props => {

  return (
    <SignUp
      puffPuffPass="puffPuffPass"
    />
  )
}

export default Loader
