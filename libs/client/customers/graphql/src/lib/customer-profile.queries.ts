import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      userId
      phone
      address
      city
      state
      zipCode
      country
      clothingSize
      shoeSize
      favorites
    }
  }
`;

export const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateCustomerProfileInput!) {
    updateMyProfile(input: $input) {
      id
      userId
      phone
      address
      city
      state
      zipCode
      country
      clothingSize
      shoeSize
      favorites
    }
  }
`;
