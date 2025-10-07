import { gql } from '@apollo/client';

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
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

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
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

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

export const BULK_TRANSLATE_CATEGORIES = gql`
  mutation BulkTranslateCategories($input: BulkTranslationInput!) {
    bulkTranslateEntities(input: $input)
  }
`;

export const SET_CATEGORY_TRANSLATION = gql`
  mutation SetCategoryTranslation($input: TranslationInput!) {
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
