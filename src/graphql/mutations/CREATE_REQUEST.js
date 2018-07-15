import gql from "graphql-tag";

export const CREATE_REQUEST = gql`
  mutation(
    $author: ID!
    $recipient: ID!
    $title: String!
    $text: String!
    $wants: [String!]!
    $isPublished: Boolean!
  ) {
    createRequest(
      data: {
        author: { connect: { id: $author } }
        recipient: { connect: { id: $recipient } }
        title: $title
        text: $text
        wants: { set: $wants }
        isPublished: true
      }
    ) {
      id
      wants
      recipient {
        name
      }
      author {
        name
      }
    }
  }
`;
