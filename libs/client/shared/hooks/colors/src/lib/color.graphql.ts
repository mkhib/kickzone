import { gql } from '@apollo/client';

export const GET_COLORS = gql`
  query GetColors {
    colors {
      id
      hexCode
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const CREATE_COLOR = gql`
  mutation CreateColor($input: CreateColorInput!, $name: String) {
    createColor(input: $input, name: $name) {
      id
      hexCode
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const UPDATE_COLOR = gql`
  mutation UpdateColor($id: Int!, $input: UpdateColorInput!, $name: String) {
    updateColor(id: $id, input: $input, name: $name) {
      id
      hexCode
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation DeleteColor($id: Int!) {
    deleteColor(id: $id)
  }
`;

export const BULK_TRANSLATE_COLORS = gql`
  mutation BulkTranslateColors($input: BulkTranslationInput!) {
    bulkTranslateEntities(input: $input)
  }
`;

export const SET_COLOR_TRANSLATION = gql`
  mutation SetColorTranslation($input: TranslationInput!) {
    setTranslation(input: $input) {
      id
      entityType
      entityId
      locale
      fieldName
      value
      isAutoTranslated
      translatedBy
      createdAt
      updatedAt
    }
  }
`;
