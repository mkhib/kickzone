import { gql, useQuery } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const Categories = gql`
  query Categories {
    categories {
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
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(Categories);

  return {
    categoriesData,
    categoriesLoading,
    categoriesError,
  };
};
