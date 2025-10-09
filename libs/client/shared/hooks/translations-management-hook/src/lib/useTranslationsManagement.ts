import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const SET_TRANSLATION = gql`
  mutation SetTranslation($input: TranslationInput!) {
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

const BULK_TRANSLATE_ENTITIES = gql`
  mutation BulkTranslateEntities($input: BulkTranslationInput!) {
    bulkTranslateEntities(input: $input)
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      slug
      sortOrder
      isActive
      name
    }
  }
`;

const GET_COLORS = gql`
  query GetColors {
    colors {
      id
      hexCode
      sortOrder
      isActive
      name
    }
  }
`;

export const useTranslationsManagement = () => {
  const [setTranslationMutation, { loading: isSettingTranslation }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'setTranslation'>,
      KickzoneGraphqlTypes.MutationSetTranslationArgs
    >(SET_TRANSLATION, {
      refetchQueries: [{ query: GET_CATEGORIES }, { query: GET_COLORS }],
    });

  const [bulkTranslateMutation, { loading: isBulkTranslating }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'bulkTranslateEntities'>,
    KickzoneGraphqlTypes.MutationBulkTranslateEntitiesArgs
  >(BULK_TRANSLATE_ENTITIES, {
    refetchQueries: [{ query: GET_CATEGORIES }, { query: GET_COLORS }],
  });

  const setTranslation = (
    entityType: string,
    entityId: number,
    locale: string,
    fieldName: string,
    value: string,
    isAutoTranslated = false
  ) =>
    setTranslationMutation({
      variables: {
        input: {
          entityType,
          entityId,
          locale,
          fieldName,
          value,
          isAutoTranslated,
        },
      },
    });

  const bulkTranslate = (
    entityType: string,
    entityIds: number[],
    sourceLocale: string,
    targetLocales: string[]
  ) =>
    bulkTranslateMutation({
      variables: {
        input: {
          entityType,
          entityIds,
          sourceLocale,
          targetLocales,
        },
      },
    });

  return {
    setTranslation,
    bulkTranslate,
    isSettingTranslation,
    isBulkTranslating,
  };
};
