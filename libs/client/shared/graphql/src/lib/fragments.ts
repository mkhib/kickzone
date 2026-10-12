import { gql } from '@apollo/client';

// Basic shared fragments for common types
export const COLOR_FRAGMENT = gql`
  fragment ColorFields on Color {
    id
    name
    hexCode
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    name
    slug
  }
`;

export const BRAND_FRAGMENT = gql`
  fragment BrandFields on Brand {
    id
    name
    slug
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    name
    email
    role
  }
`;

export const PRODUCT_INFO_FRAGMENT = gql`
  fragment ProductInfoFields on ProductInfo {
    id
    size
    sizeKind
    colors {
      ...ColorFields
    }
    weight
    images
  }
  ${COLOR_FRAGMENT}
`;

// Basic product fragment (without seller products - for general use)
export const BASIC_PRODUCT_FRAGMENT = gql`
  fragment BasicProductFields on Product {
    id
    name
    sku
    archived
    description
    categories {
      ...CategoryFields
    }
    brand {
      ...BrandFields
    }
    brandId
    productInfos {
      ...ProductInfoFields
    }
  }
  ${CATEGORY_FRAGMENT}
  ${BRAND_FRAGMENT}
  ${PRODUCT_INFO_FRAGMENT}
`;
