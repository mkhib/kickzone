import { gql, useQuery, useMutation } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
    }
  }
`;

export const useCategories = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(
    CATEGORIES_QUERY
  );

  const [createCategoryMutation, { loading: isCreatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createCategory'>,
    KickzoneGraphqlTypes.MutationCreateCategoryArgs
  >(CREATE_CATEGORY, {
    update(cache, { data }) {
      if (!data?.createCategory) return;

      const existingData = cache.readQuery<
        Pick<KickzoneGraphqlTypes.Query, 'categories'>
      >({
        query: CATEGORIES_QUERY,
      });

      cache.writeQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>({
        query: CATEGORIES_QUERY,
        data: {
          categories: [
            ...(existingData?.categories ?? []),
            data.createCategory,
          ],
        },
      });
    },
  });

  const [updateCategoryMutation, { loading: isUpdatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateCategory'>,
    KickzoneGraphqlTypes.MutationUpdateCategoryArgs
  >(UPDATE_CATEGORY, {
    update(cache, { data }) {
      if (!data?.updateCategory) return;

      const existingData = cache.readQuery<
        Pick<KickzoneGraphqlTypes.Query, 'categories'>
      >({
        query: CATEGORIES_QUERY,
      });

      cache.writeQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>({
        query: CATEGORIES_QUERY,
        data: {
          categories: (existingData?.categories ?? []).map(
            (cat: KickzoneGraphqlTypes.Category) =>
              cat.id === data.updateCategory.id ? data.updateCategory : cat
          ),
        },
      });
    },
  });

  const createCategory = (name: string) =>
    createCategoryMutation({
      variables: {
        input: { name },
      },
    });

  const updateCategory = (id: number, name: string) =>
    updateCategoryMutation({
      variables: {
        input: { id: id.toString(), name },
      },
    });

  return {
    categoriesData,
    categoriesLoading,
    categoriesError,
    createCategory,
    updateCategory,
    isCreatingCategory,
    isUpdatingCategory,
  };
};
