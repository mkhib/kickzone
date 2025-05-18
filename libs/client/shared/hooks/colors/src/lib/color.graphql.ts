import { gql } from '@apollo/client';

export const GET_COLORS = gql`
  query GetColors {
    colors {
      id
      name
      hexCode
    }
  }
`;

export const CREATE_COLOR = gql`
  mutation CreateColor($input: CreateColorInput!) {
    createColor(input: $input) {
      id
      name
      hexCode
    }
  }
`;

export const UPDATE_COLOR = gql`
  mutation UpdateColor($id: Int!, $input: UpdateColorInput!) {
    updateColor(id: $id, input: $input) {
      id
      name
      hexCode
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation DeleteColor($id: Int!) {
    deleteColor(id: $id)
  }
`;
