import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CreateCategoryInput } from '@kickzone-workspace/inputs';
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  BULK_TRANSLATE_CATEGORIES,
  SET_CATEGORY_TRANSLATION,
} from './categories.graphql';

export function useCategoriesQuery() {
  const {
    data,
    loading: getCategoriesLoading,
    error: getCategoriesError,
    refetch: refetchCategories,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(
    CATEGORIES_QUERY
  );
  return {
    categories: data?.categories || [],
    getCategoriesLoading,
    getCategoriesError,
    refetchCategories,
  };
}

export const useCategories = () => {
  const [createCategoryMutation, { loading: isCreatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createCategory'>,
    KickzoneGraphqlTypes.MutationCreateCategoryArgs
  >(CREATE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const [updateCategoryMutation, { loading: isUpdatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateCategory'>,
    KickzoneGraphqlTypes.MutationUpdateCategoryArgs
  >(UPDATE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const [deleteCategoryMutation, { loading: isDeletingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'deleteCategory'>,
    KickzoneGraphqlTypes.MutationDeleteCategoryArgs
  >(DELETE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const [bulkTranslateMutation, { loading: isBulkTranslating }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'bulkTranslateEntities'>,
    KickzoneGraphqlTypes.MutationBulkTranslateEntitiesArgs
  >(BULK_TRANSLATE_CATEGORIES);

  const [setTranslationMutation, { loading: isSettingTranslation }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'setTranslation'>,
      KickzoneGraphqlTypes.MutationSetTranslationArgs
    >(SET_CATEGORY_TRANSLATION);

  const createCategory = (slug: string, sortOrder = 0, name?: string) =>
    createCategoryMutation({
      variables: {
        input: { slug, sortOrder },
        ...(name && { name }),
      } as { input: CreateCategoryInput; name?: string },
    });

  const updateCategory = (
    id: number,
    slug: string,
    sortOrder?: number,
    isActive?: boolean
  ) =>
    updateCategoryMutation({
      variables: {
        input: { id, slug, sortOrder, isActive },
      },
    });

  const deleteCategory = (id: number) =>
    deleteCategoryMutation({
      variables: { id },
      optimisticResponse: {
        deleteCategory: true,
      },
    });

  const bulkTranslateCategories = (
    entityIds: number[],
    sourceLocale: string,
    targetLocales: string[]
  ) =>
    bulkTranslateMutation({
      variables: {
        input: {
          entityType: 'category',
          entityIds,
          sourceLocale,
          targetLocales,
        },
      },
    });

  const setCategoryTranslation = (
    entityId: number,
    locale: string,
    fieldName: string,
    value: string,
    isAutoTranslated = false
  ) =>
    setTranslationMutation({
      variables: {
        input: {
          entityType: 'category',
          entityId,
          locale,
          fieldName,
          value,
          isAutoTranslated,
        },
      },
    });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    bulkTranslateCategories,
    setCategoryTranslation,
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
    isBulkTranslating,
    isSettingTranslation,
  };
};
