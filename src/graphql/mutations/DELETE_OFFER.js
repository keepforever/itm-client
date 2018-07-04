import gql from "graphql-tag";

export const DELETE_OFFER = gql`
  mutation($id: ID!) {
    deleteOffer(where: { id: $id }) {
      id
    }
  }
`;
