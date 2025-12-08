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

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $first: Int = 10
    $after: String
    $filter: ProductFilterInput
  ) {
    products(filter: $filter) {
      edges {
        node {
          id
          name
          description
          categories {
            id
            name
          }
          productInfos {
            id
            size
            color {
              id
              name
              hexCode
            }
            weight
            images
          }
          sellerProducts {
            id
            productInfoId
            price
            discount
            stockQuantity
            seller {
              id
              storeName
              shippingFee
              user {
                id
                name
              }
            }
            productInfo {
              id
              size
              color {
                id
                name
                hexCode
              }
            }
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

export const GET_MY_CART_QUERY = gql`
  query GetMyCart {
    myCart {
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
        sellerName
        productInfoId
        sellerProductId
        availableStock
      }
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

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_COLORS_QUERY = gql`
  query GetColors {
    colors {
      id
      name
      hexCode
    }
  }
`;
