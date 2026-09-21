import { gql } from '@apollo/client';
import {
  CATEGORY_FRAGMENT,
  USER_FRAGMENT,
  PRODUCT_INFO_FRAGMENT,
} from '@kickzone-workspace/client-shared-graphql';

// SellerInfo fragment (for admin side)
export const SELLER_INFO_FRAGMENT = gql`
  fragment SellerInfoFields on SellerInfo {
    id
    storeName
    phone
    address
    isActive
    canManageCatalog
    user {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

// SellerProduct fragment (for admin side - includes seller info)
export const ADMIN_SELLER_PRODUCT_FRAGMENT = gql`
  fragment AdminSellerProductFields on SellerProduct {
    id
    price
    costPrice
    discount
    stockQuantity
    seller {
      ...SellerInfoFields
    }
    productInfo {
      ...ProductInfoFields
    }
  }
  ${SELLER_INFO_FRAGMENT}
  ${PRODUCT_INFO_FRAGMENT}
`;

// Product fragment (for admin side - includes all seller products with seller info)
export const ADMIN_PRODUCT_FRAGMENT = gql`
  fragment AdminProductFields on Product {
    id
    name
    sku
    archived
    description
    categories {
      ...CategoryFields
    }
    productInfos {
      ...ProductInfoFields
    }
    sellerProducts {
      ...AdminSellerProductFields
    }
  }
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_INFO_FRAGMENT}
  ${ADMIN_SELLER_PRODUCT_FRAGMENT}
`;

// Product fragment for admin product management (when editing products)
export const ADMIN_PRODUCT_MANAGEMENT_FRAGMENT = gql`
  fragment AdminProductManagementFields on Product {
    id
    name
    sku
    archived
    description
    categories {
      ...CategoryFields
    }
    productInfos {
      ...ProductInfoFields
    }
  }
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_INFO_FRAGMENT}
`;
