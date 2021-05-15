import { gql } from '@apollo/client';

export const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

export const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;
