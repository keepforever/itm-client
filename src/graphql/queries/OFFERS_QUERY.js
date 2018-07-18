import gql from "graphql-tag";

export const OFFERS_QUERY = gql`
  query userOffersConnection($after: String, $orderBy: OfferOrderByInput, $id: ID!) {
    offersConnection(
      after: $after
      first: 3
      orderBy: $orderBy
      where: { recipient: { id: $id } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          text
          author {
            id
            name
          }
        }
      }
    }
  }
`;

//
// export const OFFERS_QUERY = gql`
//   query($after: String, $orderBy: OfferOrderByInput, $where: OfferWhereInput) {
//     offersConnection(after: $after, first: 3, orderBy: $orderBy, where: $where) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       edges {
//         node {
//           id
//           title
//           text
//           author {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `;
