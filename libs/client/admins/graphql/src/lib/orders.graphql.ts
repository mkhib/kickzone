import { gql } from '@apollo/client';

export const GET_ALL_ORDERS_QUERY = gql`
  query GetAllOrders($first: Int = 10, $after: String, $status: OrderStatus) {
    allSellerOrders(first: $first, after: $after, status: $status) {
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
`;

export const GET_SELLER_ORDERS_QUERY = gql`
  query GetSellerOrders(
    $sellerId: String!
    $first: Int = 10
    $after: String
    $status: OrderStatus
  ) {
    adminSellerOrders(
      sellerId: $sellerId
      first: $first
      after: $after
      status: $status
    ) {
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
`;

export const GET_SELLERS_QUERY = gql`
  query GetSellers(
    $first: Int = 100
    $after: String
    $filter: SellerFilterInput
  ) {
    sellers(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          id
          businessName
          storeName
          phone
          address
          city
          state
          zipCode
          country
          user {
            id
            name
            email
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

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: String!, $updateOrderInput: UpdateOrderInput!) {
    updateOrder(id: $id, updateOrderInput: $updateOrderInput) {
      id
      trackingNumber
      updatedAt
    }
  }
`;
