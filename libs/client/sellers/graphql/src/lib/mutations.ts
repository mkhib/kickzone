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

export const CREATE_SELLER_PRODUCT_MUTATION = gql`
  mutation CreateMySellerProduct($input: CreateSellerProductInput!) {
    createMySellerProduct(input: $input) {
      id
      price
      costPrice
      discount
      stockQuantity
      boxLess
      productInfo {
        id
        size
        colors {
          name
        }
      }
      product {
        name
      }
    }
  }
`;

export const UPDATE_SELLER_PRODUCT_MUTATION = gql`
  mutation UpdateMySellerProduct($input: UpdateSellerProductInput!) {
    updateMySellerProduct(input: $input) {
      id
      price
      costPrice
      discount
      stockQuantity
      boxLess
      productInfo {
        id
        size
        colors {
          name
        }
      }
      product {
        id
        name
      }
    }
  }
`;
