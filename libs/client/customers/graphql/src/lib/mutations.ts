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
        productInfoId
        sellerProductId
        availableStock
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

export const REQUEST_ZARINPAL_PAYMENT_MUTATION = gql`
  mutation RequestZarinPalPayment($input: ZarinPalPaymentRequestInput!) {
    requestZarinPalPayment(input: $input) {
      code
      message
      authority
      fee_type
      fee
    }
  }
`;

export const VERIFY_ZARINPAL_PAYMENT_MUTATION = gql`
  mutation VerifyZarinPalPayment($input: ZarinPalVerificationRequestInput!) {
    verifyZarinPalPayment(input: $input) {
      code
      message
      ref_id
      card_pan
      card_hash
      fee_type
      fee
      orderIds
      orderId
      orderNumber
    }
  }
`;

export const GET_ZARINPAL_GATEWAY_URL_MUTATION = gql`
  mutation GetZarinPalGatewayUrl($authority: String!) {
    getZarinPalGatewayUrl(authority: $authority) {
      url
    }
  }
`;

export const CANCEL_PENDING_ZARINPAL_ORDER_MUTATION = gql`
  mutation CancelPendingZarinPalOrder($orderId: String, $authority: String!) {
    cancelPendingZarinPalOrder(orderId: $orderId, authority: $authority)
  }
`;
