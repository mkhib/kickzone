import { gql } from '@apollo/client';

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

export const GET_SELLER_ORDERS_QUERY = gql`
  query GetSellerOrders(
    $first: Int = 10
    $after: String
    $status: OrderStatus
  ) {
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

export const GET_ORDER_DETAILS_QUERY = gql`
  query GetOrderDetails($id: String!) {
    order(id: $id) {
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

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: String!, $updateOrderInput: UpdateOrderInput!) {
    updateOrder(id: $id, updateOrderInput: $updateOrderInput) {
      id
      trackingNumber
      updatedAt
    }
  }
`;
