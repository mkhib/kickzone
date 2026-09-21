import { gql } from '@apollo/client';

export const GET_CART_QUERY = gql`
  query GetCart {
    myCart {
      id
      userId
      subtotal
      total
      createdAt
      updatedAt
      items {
        id
        cartId
        productId
        productName
        productImage
        quantity
        unitPrice
        totalPrice
        color
        size
        sellerId
        productInfoId
        sellerProductId
        availableStock
      }
    }
  }
`;

export const GET_SELLERS_BY_IDS_QUERY = gql`
  query GetSellersByIds($filter: SellerFilterInput) {
    sellers(filter: $filter) {
      edges {
        node {
          id
          shippingFee
        }
      }
    }
  }
`;

// Alias for backward compatibility with existing code
export const GET_MY_CART_QUERY = GET_CART_QUERY;

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          sku
          description
          archived
          productInfos {
            id
            size
            colors {
              id
              name
              hexCode
            }
            weight
            images
          }
          categories {
            id
            name
            slug
          }
          sellerProducts {
            id
            price
            costPrice
            discount
            stockQuantity
            productInfoId
            boxLess
            seller {
              id
              shippingFee
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_MY_ORDERS_QUERY = gql`
  query GetMyOrders($first: Int = 10, $after: String) {
    myOrders(first: $first, after: $after) {
      id
      orderNumber
      customerEmail
      customerPhone
      customerName
      shippingAddress
      city
      state
      zipCode
      country
      status
      subtotal
      shippingCost
      total
      notes
      trackingNumber
      createdAt
      updatedAt
      sellerPhone
      sellerAddress
      items {
        id
        productId
        productName
        productImage
        quantity
        unitPrice
        totalPrice
        color
        size
        originalPrice
        discountPercentage
        productInfoId
        sellerProductId
      }
    }
  }
`;

/**
 * Calculate shipping cost using smart shipping logic
 * Returns total shipping cost with breakdown per seller
 */
export const CALCULATE_SHIPPING_COST_QUERY = gql`
  query CalculateShippingCost(
    $cartSubtotal: Float!
    $sellerShippingFees: [SellerShippingInfoInput!]!
  ) {
    calculateShippingCost(
      cartSubtotal: $cartSubtotal
      sellerShippingFees: $sellerShippingFees
    ) {
      totalShippingCost
      freeShippingApplied
      strategyUsed
      shippingBreakdown {
        sellerId
        originalFee
        appliedFee
      }
    }
  }
`;
