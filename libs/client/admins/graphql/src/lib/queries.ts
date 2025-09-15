import { gql } from '@apollo/client';

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

export const GET_SELLERS_QUERY = gql`
  query GetSellers(
    $first: Int = 10
    $after: String
    $filter: SellerFilterInput
  ) {
    sellers(filter: $filter) {
      edges {
        node {
          id
          storeName
          phone
          address
          isActive
          user {
            id
            name
            lastName
            email
          }
        }
        cursor
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

export const GET_ADMIN_SELLER_ORDERS_QUERY = gql`
  query GetAdminSellerOrders(
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
      }
    }
  }
`;

export const GET_ALL_ORDERS_QUERY = gql`
  query GetAllOrders(
    $first: Int = 10
    $after: String
    $sellerId: String
    $status: OrderStatus
  ) {
    orders(first: $first, after: $after, sellerId: $sellerId, status: $status) {
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
      }
    }
  }
`;
