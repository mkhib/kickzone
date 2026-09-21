import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_COLORS,
  CREATE_COLOR,
  UPDATE_COLOR,
  DELETE_COLOR,
  BULK_TRANSLATE_COLORS,
  SET_COLOR_TRANSLATION,
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
      KickzoneGraphqlTypes.MutationDeleteColorArgs
    >(DELETE_COLOR, {
      refetchQueries: [{ query: GET_COLORS }],
    });

  const [bulkTranslateMutation, { loading: isBulkTranslating }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'bulkTranslateEntities'>,
    KickzoneGraphqlTypes.MutationBulkTranslateEntitiesArgs
  >(BULK_TRANSLATE_COLORS);

  const [setTranslationMutation, { loading: isSettingTranslation }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'setTranslation'>,
      KickzoneGraphqlTypes.MutationSetTranslationArgs
    >(SET_COLOR_TRANSLATION);

  const createColor = async (
    name: string,
    hexCode: string,
    sortOrder = 0
  ) => {
    const response = await createColorMutation({
      variables: { input: { hexCode, sortOrder }, name },
    });
    return response.data?.createColor;
  };

  const updateColor = async (
    id: number,
    name: string,
    hexCode: string,
    sortOrder?: number,
    isActive?: boolean
  ) => {
    const response = await updateColorMutation({
      variables: {
        id,
        input: { hexCode, sortOrder, isActive },
        ...(name?.trim() ? { name: name.trim() } : {}),
      },
    });
    return response.data?.updateColor;
  };

  const deleteColor = async (id: number) => {
    const response = await deleteColorMutation({ variables: { id } });
    return response.data?.deleteColor;
  };

  const bulkTranslateColors = (
    entityIds: number[],
    sourceLocale: string,
    targetLocales: string[]
  ) =>
    bulkTranslateMutation({
      variables: {
        input: {
          entityType: 'color',
          entityIds,
          sourceLocale,
          targetLocales,
        },
      },
    });

  const setColorTranslation = (
    entityId: number,
    locale: string,
    fieldName: string,
    value: string,
    isAutoTranslated = false
  ) =>
    setTranslationMutation({
      variables: {
        input: {
          entityType: 'color',
          entityId,
          locale,
          fieldName,
          value,
          isAutoTranslated,
        },
      },
    });

  return {
    colors: data?.colors || [],
    loading: loading || createLoading || updateLoading || deleteLoading,
    error: error || createError || updateError || deleteError,
    refetchColors: refetch,
    createColor,
    updateColor,
    deleteColor,
    bulkTranslateColors,
    setColorTranslation,
    isBulkTranslating,
    isSettingTranslation,
  };
}
