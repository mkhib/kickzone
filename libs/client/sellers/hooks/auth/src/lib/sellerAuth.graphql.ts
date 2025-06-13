import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const SETUP_PASSWORD_MUTATION = gql`
  mutation SetupPassword($token: String!, $newPassword: String!) {
    setupPassword(token: $token, newPassword: $newPassword) {
      id
      email
    }
  }
`;
