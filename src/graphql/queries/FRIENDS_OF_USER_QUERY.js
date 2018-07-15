import gql from "graphql-tag";

export const FRIENDS_OF_USER_QUERY = gql`
  query($id: ID!) {
    users(where: { id: $id }) {
      name
      about
      friends {
        id
        friend {
          name
          id
          about
          sells
        }
      }
    }
  }
`;
