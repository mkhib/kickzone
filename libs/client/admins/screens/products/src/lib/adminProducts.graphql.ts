import { gql } from '@apollo/client';

export const SELLER_PRODUCTS_BY_PRODUCT = gql`
  query SellerProductsByProduct($productId: Int!) {
    sellerProductsByProduct(productId: $productId) {
      id
      price
      discount
      stockQuantity
      recommended
      boxLess
      seller {
        id
        user {
          name
        }
      }
      productInfo {
        id
        size
        colors {
          name
        }
      }
    }
  }
`;

export const UPDATE_SELLER_PRODUCT_RECOMMENDED = gql`
  mutation UpdateSellerProductRecommended(
    $sellerId: Int!
    $input: UpdateSellerProductInput!
  ) {
    updateSellerProduct(sellerId: $sellerId, input: $input) {
      id
      recommended
    }
  }
`;
