import gql from 'graphql-tag';

export const OFFERS_QUERY_NO_PAGEINATE = gql`
  query($after: String, $orderBy: OfferOrderByInput, $where: OfferWhereInput) {
    offersConnection(after: $after, orderBy: $orderBy, where: $where) {
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
