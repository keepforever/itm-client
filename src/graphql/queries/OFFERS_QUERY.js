import gql from 'graphql-tag';

export const OFFERS_QUERY = gql`
  query($after: String, $orderBy: OfferOrderByInput, $where: OfferWhereInput) {
    offersConnection(after: $after, first: 3, orderBy: $orderBy, where: $where) {
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
