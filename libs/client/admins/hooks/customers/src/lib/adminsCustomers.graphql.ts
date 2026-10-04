import { gql } from '@apollo/client';

export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on User {
    id
    name
    lastName
    username
    email
    role
    locale
    customerProfile {
      id
      phone
      address
      city
      state
      zipCode
      country
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomers($first: Int, $after: String, $searchTerm: String) {
    customers(first: $first, after: $after, searchTerm: $searchTerm) {
      edges {
        node {
          ...CustomerFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${CUSTOMER_FIELDS}
`;
