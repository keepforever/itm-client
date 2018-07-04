import gql from 'graphql-tag';

export const OFFERS_QUERY = gql`
  query($orderBy: OfferOrderByInput, $where: OfferWhereInput){
    offers (orderBy: $orderBy, where: $where) {
      id
      text
      title
      author{
        id
      }
    }
  }
`;
//
// import gql from "graphql-tag";
// const CREATE_BRAND = gql`
//   mutation createBrand {
//     createBrand(input: { featured: true }) {
//       id
//       createdAt
//       featured
//     }
//   }
// `;
//
// export default CREATE_BRAND;
