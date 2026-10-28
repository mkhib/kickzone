import { gql } from '@apollo/client';

/**
 * Seller orders query - NO customer PII (name, email, phone, address)
 * Security: Sellers should NOT see customer personal information
 */
export const GET_MY_ORDERS_QUERY = gql`
  query GetMySellerOrders($first: Int = 10, $after: String, $status: OrderStatus) {
    mySellerOrders(first: $first, after: $after, status: $status) {
      edges {
        cursor
        node {
          id
          orderNumber
          # Customer PII REMOVED for security:
          status
          subtotal
          shippingCost
          total
          notes
          trackingNumber
          createdAt
          updatedAt
          sellerId
          sellerStoreName
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

/**
 * NOTE: This query is for admins only - it includes customer PII
 * Sellers should use GET_MY_ORDERS_QUERY instead
 */
export const GET_SELLER_ORDERS_QUERY = gql`
  query GetSellerOrders(
    $first: Int = 10
    $after: String
    $status: OrderStatus
  ) {
    allSellerOrders(first: $first, after: $after, status: $status) {
      edges {
        cursor
        node {
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
          sellerId
          sellerStoreName
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($updateOrderStatusInput: UpdateOrderStatusInput!) {
    updateOrderStatus(updateOrderStatusInput: $updateOrderStatusInput) {
      id
      status
      trackingNumber
      updatedAt
    }
  }
`;

/**
 * Order details query - Returns SellerOrder for sellers (no customer PII)
 * Security: If user is seller, customer PII is automatically filtered out
 */
export const GET_ORDER_DETAILS_QUERY = gql`
  query GetOrderDetails($id: String!) {
    order(id: $id) {
      id
      orderNumber
      # Customer PII will be null/empty for sellers (handled by resolver)
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
      sellerId
      sellerStoreName
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

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: String!, $updateOrderInput: UpdateOrderInput!) {
    updateOrder(id: $id, updateOrderInput: $updateOrderInput) {
      id
      trackingNumber
      updatedAt
    }
  }
`;
