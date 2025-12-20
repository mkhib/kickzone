import { gql } from '@apollo/client';
import {
  CATEGORY_FRAGMENT,
  PRODUCT_INFO_FRAGMENT,
} from '@kickzone-workspace/client-shared-graphql';

// SellerProduct fragment (for seller side - no seller info needed)
export const SELLER_PRODUCT_FRAGMENT = gql`
  fragment SellerProductFields on SellerProduct {
    id
    price
    costPrice
    discount
    stockQuantity
    productInfoId
    productInfo {
      ...ProductInfoFields
    }
  }
  ${PRODUCT_INFO_FRAGMENT}
`;

// Product fragment (for seller side - includes seller products)
export const SELLER_PRODUCT_PRODUCT_FRAGMENT = gql`
  fragment SellerProductProductFields on Product {
    id
    name
    archived
    description
    categories {
      ...CategoryFields
    }
    productInfos {
      ...ProductInfoFields
    }
    sellerProducts {
      ...SellerProductFields
    }
  }
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_INFO_FRAGMENT}
  ${SELLER_PRODUCT_FRAGMENT}
`;

// Product fragment for seller product management (when selecting products to add as seller products)
export const SELLER_PRODUCT_MANAGEMENT_FRAGMENT = gql`
  fragment SellerProductManagementFields on Product {
    id
    name
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
