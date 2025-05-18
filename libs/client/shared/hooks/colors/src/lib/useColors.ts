import { useQuery, useMutation } from '@apollo/client';
import {
  GET_COLORS,
  CREATE_COLOR,
  UPDATE_COLOR,
  DELETE_COLOR,
} from './color.graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useColors() {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'colors'>,
    KickzoneGraphqlTypes.QueryColorArgs
  >(GET_COLORS);

  const [createColorMutation, { loading: createLoading, error: createError }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'createColor'>,
      KickzoneGraphqlTypes.MutationCreateColorArgs
    >(CREATE_COLOR, {
      refetchQueries: [{ query: GET_COLORS }],
    });

  const [updateColorMutation, { loading: updateLoading, error: updateError }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'updateColor'>,
      KickzoneGraphqlTypes.MutationUpdateColorArgs
    >(UPDATE_COLOR, {
      refetchQueries: [{ query: GET_COLORS }],
    });

  const [deleteColorMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'deleteColor'>,
      { id: number }
    >(DELETE_COLOR, {
      refetchQueries: [{ query: GET_COLORS }],
    });

  const createColor = async (name: string) => {
    const response = await createColorMutation({
      variables: { input: { name } },
    });
    return response.data?.createColor;
  };

  const updateColor = async (id: number, name: string) => {
    const response = await updateColorMutation({
      variables: { id, input: { name } },
    });
    return response.data?.updateColor;
  };

  const deleteColor = async (id: number) => {
    const response = await deleteColorMutation({ variables: { id } });
    return response.data?.deleteColor;
  };

  return {
    colors: data?.colors || [],
    loading: loading || createLoading || updateLoading || deleteLoading,
    error: error || createError || updateError || deleteError,
    refetchColors: refetch,
    createColor,
    updateColor,
    deleteColor,
  };
}
