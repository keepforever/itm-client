import gql from "graphql-tag";

export const EDIT_OFFER = gql`
  mutation($text: String, $title: String, $id: ID!) {
    updateOffer(text: $text, title: $title, id: $id) {
      id
      text
      title
      author {
        id
      }
    }
  }
`;
