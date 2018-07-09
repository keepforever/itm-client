import gql from "graphql-tag";

export const EDIT_OFFER = gql`
  mutation($id: ID!, $title: String, $text: String) {
    updateOffer(id: $id, text: $text, title: $title) {
      __typename
      id
      text
      title
      author {
        id
        name
      }
    }
  }
`;
