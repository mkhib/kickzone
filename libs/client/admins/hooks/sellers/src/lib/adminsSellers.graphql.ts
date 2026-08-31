import { gql } from '@apollo/client';

export const SELLER_FIELDS = gql`
  fragment SellerFields on SellerInfo {
    id
    storeName
    phone
    address
    isActive
    canManageCatalog
    shippingFee
    user {
      id
      name
      lastName
      username
      email
    }
  }
`;

export const GET_SELLERS = gql`
  query GetSellers($filter: SellerFilterInput) {
    sellers(filter: $filter) {
      edges {
        node {
          ...SellerFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${SELLER_FIELDS}
`;

export const CREATE_SELLER = gql`
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      ...SellerFields
    }
  }
  ${SELLER_FIELDS}
`;

export const UPDATE_SELLER = gql`
  mutation UpdateSeller($updateSellerInput: UpdateSellerInput!) {
    updateSeller(updateSellerInput: $updateSellerInput) {
      ...SellerFields
    }
  }
  ${SELLER_FIELDS}
`;

export const TOGGLE_SELLER_ACTIVE = gql`
  mutation ToggleSellerActive($id: Int!) {
    toggleSellerActive(id: $id) {
      id
      isActive
    }
  }
`;

export const INITIATE_SELLER_PASSWORD_SETUP = gql`
  mutation InitiateSellerPasswordSetup($email: String!, $baseUrl: String!) {
    initiatePasswordSetup(email: $email, baseUrl: $baseUrl)
  }
`;
