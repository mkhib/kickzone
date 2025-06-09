import { gql } from '@apollo/client';

export const GET_SELLERS = gql`
  query GetSellers($filter: SellerFilterInput) {
    sellers(filter: $filter) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

export const CREATE_SELLER = gql`
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

export const UPDATE_SELLER = gql`
  mutation UpdateSeller($updateSellerInput: UpdateSellerInput!) {
    updateSeller(updateSellerInput: $updateSellerInput) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

export const TOGGLE_SELLER_ACTIVE = gql`
  mutation ToggleSellerActive($id: Int!) {
    toggleSellerActive(id: $id) {
      id
      isActive
    }
  }
`;
