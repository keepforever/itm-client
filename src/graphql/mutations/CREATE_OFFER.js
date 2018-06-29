import gql from 'graphql-tag';

export const CREATE_OFFER = gql`
  mutation($title: String!, $text: String!) {
    createOffer(title: $title, text: $text){
      id
      title
      text
    }
  }
`
