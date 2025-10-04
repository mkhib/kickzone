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

export {
  GET_SELLER_ORDERS_QUERY,
  GET_ORDER_DETAILS_QUERY,
  UPDATE_ORDER_STATUS_MUTATION,
  UPDATE_ORDER_MUTATION,
} from './seller-orders.graphql';
