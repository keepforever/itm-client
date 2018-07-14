import gql from 'graphql-tag';

export const SELLERS_QUERY = gql`
  query {
    sellers{
      id
      name
      about
      sells
    }
  }
`;
