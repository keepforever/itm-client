import gql from "graphql-tag";

export const CREATE_USER_REQUEST = gql`
  mutation($title: String!, $text: String!, $expiresAt: DateTime!, $id: ID!) {
    createOffer(
      data: {
        title: $title,
        text: $text,
        expiresAt: $expiresAt,
        author: { connect: { id: $id } }
      }
    ) {
        id
        text
        title
        author{
          id
          name
        }
    }
  }
`;
