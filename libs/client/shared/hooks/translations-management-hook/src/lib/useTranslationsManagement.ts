import { useMutation, useQuery } from '@apollo/client/react';
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

const GET_ENTITY_TRANSLATIONS = gql`
  query GetEntityTranslations($entityType: String!, $entityId: Int!) {
    getEntityTranslations(entityType: $entityType, entityId: $entityId) {
      id
      locale
      fieldName
      value
      isAutoTranslated
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
    awaitRefetchQueries: true,
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

export const useEntityTranslations = (entityType: string, entityId: number) => {
  const { data, loading, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'getEntityTranslations'>,
    KickzoneGraphqlTypes.QueryGetEntityTranslationsArgs
  >(GET_ENTITY_TRANSLATIONS, {
    variables: { entityType, entityId },
    skip: !entityId,
    fetchPolicy: 'network-only', // Always fetch fresh data from the server
  });

  const translations = new Map<string, string>();
  data?.getEntityTranslations?.forEach((t) => {
    if (t.fieldName === 'name') {
      translations.set(t.locale, t.value);
    }
  });

  return { translations, loading, refetch };
};
