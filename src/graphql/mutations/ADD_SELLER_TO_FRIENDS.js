import gql from "graphql-tag";

export const ADD_SELLER_TO_FRIENDS = gql`
  mutation (
    $id: ID!,
    $friendsBecause: [String!]!,
    $offerAllowance: Int!
  ) {
    createFriendship(data:{
      friendsBecause: {set: $friendsBecause},
      friend:{connect:{id:$id}},
      offerAllowance: $offerAllowance
    }) {
      id
      friend{
        name
      }
      offerAllowance
    }
  }
`;
