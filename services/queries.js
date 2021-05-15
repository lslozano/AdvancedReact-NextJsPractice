import { gql } from '@apollo/client';

export const OBTAIN_CLIENTS_PER_SELLER = gql`
  query obtainClientsPerSeller {
    obtainClientsPerSeller {
      id
      name
      lastName
      company
      email
      phone
      created
      seller
    }
  }
`;

export const OBTAIN_CLIENT = gql`
  query obtainClient($id: ID!) {
    obtainClient(id: $id) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;