import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($addToCartInput: AddToCartInput!) {
    addToCart(addToCartInput: $addToCartInput) {
      id
      subtotal
      total
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
        sellerId
      }
    }
  }
`;

export const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UpdateCartItem(
    $itemId: String!
    $updateInput: UpdateCartItemInput!
  ) {
    updateCartItem(itemId: $itemId, updateInput: $updateInput) {
      id
      subtotal
      total
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
        sellerId
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($itemId: String!) {
    removeFromCart(itemId: $itemId) {
      id
      subtotal
      total
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
        sellerId
      }
    }
  }
`;

export const CLEAR_CART_MUTATION = gql`
  mutation ClearCart {
    clearCart {
      id
      subtotal
      total
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
        sellerId
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
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

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!, $baseUrl: String!) {
    forgotPassword(email: $email, baseUrl: $baseUrl)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      id
      name
      email
      role
    }
  }
`;
