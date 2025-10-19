import { gql } from '@apollo/client';
import {
  SELLER_PRODUCT_MANAGEMENT_FRAGMENT,
  SELLER_PRODUCT_FRAGMENT,
  SELLER_PRODUCT_PRODUCT_FRAGMENT,
} from './fragments';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      role
    }
  }
`;

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        node {
          ...SellerProductManagementFields
        }
      }
    }
  }
  ${SELLER_PRODUCT_MANAGEMENT_FRAGMENT}
`;

export const GET_SELLER_PRODUCT_BY_ID_QUERY = gql`
  query GetSellerProductById($id: String!) {
    mySellerProductById(id: $id) {
      ...SellerProductFields
      product {
        ...SellerProductManagementFields
      }
    }
  }
  ${SELLER_PRODUCT_FRAGMENT}
  ${SELLER_PRODUCT_MANAGEMENT_FRAGMENT}
`;

export const SELLER_PRODUCTS_FOR_ME_QUERY = gql`
  query SellerProductsForMe($filter: ProductFilterInput) {
    sellerProductsForMe(filter: $filter) {
      edges {
        cursor
        node {
          ...SellerProductProductFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
  ${SELLER_PRODUCT_PRODUCT_FRAGMENT}
`;

export {
  GET_MY_ORDERS_QUERY,
  GET_SELLER_ORDERS_QUERY,
  GET_ORDER_DETAILS_QUERY,
  UPDATE_ORDER_STATUS_MUTATION,
  UPDATE_ORDER_MUTATION,
} from './seller-orders.graphql';
