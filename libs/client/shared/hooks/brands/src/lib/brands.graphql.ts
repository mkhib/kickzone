import { gql } from '@apollo/client';

export const BRANDS_QUERY = gql`
  query Brands {
    brands {
      id
      slug
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($input: CreateBrandInput!, $name: String) {
    createBrand(input: $input, name: $name) {
      id
      slug
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($input: UpdateBrandInput!, $name: String) {
    updateBrand(input: $input, name: $name) {
      id
      slug
      sortOrder
      isActive
      createdAt
      updatedAt
      name
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: Int!) {
    deleteBrand(id: $id)
  }
`;

export const BULK_TRANSLATE_BRANDS = gql`
  mutation BulkTranslateBrands($input: BulkTranslationInput!) {
    bulkTranslateEntities(input: $input)
  }
`;

export const SET_BRAND_TRANSLATION = gql`
  mutation SetBrandTranslation($input: TranslationInput!) {
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
