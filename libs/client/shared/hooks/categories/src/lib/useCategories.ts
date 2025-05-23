import { useQuery, useMutation } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from './categories.graphql';

export function useCategoriesQuery() {
  const { data, loading, error, refetch } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(CATEGORIES_QUERY);
  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
}

export const useCategories = () => {
  const [createCategoryMutation, { loading: isCreatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createCategory'>,
    KickzoneGraphqlTypes.MutationCreateCategoryArgs
  >(CREATE_CATEGORY);

  const [updateCategoryMutation, { loading: isUpdatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateCategory'>,
    KickzoneGraphqlTypes.MutationUpdateCategoryArgs
  >(UPDATE_CATEGORY);

  const [deleteCategoryMutation, { loading: isDeletingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'deleteCategory'>,
    KickzoneGraphqlTypes.MutationDeleteCategoryArgs
  >(DELETE_CATEGORY);

  const createCategory = (name: string) =>
    createCategoryMutation({
      variables: {
        input: { name },
      },
    });

  const updateCategory = (id: number, name: string) =>
    updateCategoryMutation({
      variables: {
        input: { id, name },
      },
    });

  const deleteCategory = (id: number) =>
    deleteCategoryMutation({
      variables: { id },
      optimisticResponse: {
        deleteCategory: true,
      },
    });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
  };
};
