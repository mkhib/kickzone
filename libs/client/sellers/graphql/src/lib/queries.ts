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
  UPDATE_ORDER_STATUS_MUTATION,
} from './seller-orders.graphql';
