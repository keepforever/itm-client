import gql from "graphql-tag";
const HELLO_FEED = gql`
  query feedMe {
    feed {
      id
      title
      text
    }
  }
`;
export default HELLO_FEED;
