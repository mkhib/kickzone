import { gql } from '@apollo/client';
import {
  ADMIN_PRODUCT_FRAGMENT,
  ADMIN_PRODUCT_MANAGEMENT_FRAGMENT,
} from './fragments';

// Query for admin to get all products with seller information
export const ADMIN_PRODUCTS_QUERY = gql`
  query AdminProducts($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        cursor
        node {
          ...AdminProductFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
  ${ADMIN_PRODUCT_FRAGMENT}
`;

// Query for admin to get a specific product by ID with seller information
export const ADMIN_PRODUCT_BY_ID_QUERY = gql`
  query AdminProductById($id: Int!) {
    product(id: $id) {
      ...AdminProductFields
    }
  }
  ${ADMIN_PRODUCT_FRAGMENT}
`;

// Query for admin product management (when editing products - no seller products needed)
export const ADMIN_PRODUCT_MANAGEMENT_QUERY = gql`
  query AdminProductManagement($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        node {
          ...AdminProductManagementFields
        }
      }
    }
  }
  ${ADMIN_PRODUCT_MANAGEMENT_FRAGMENT}
`;
