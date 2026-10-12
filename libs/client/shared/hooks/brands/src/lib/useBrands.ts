import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CreateBrandInput } from '@kickzone-workspace/inputs';
import {
  BRANDS_QUERY,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
  BULK_TRANSLATE_BRANDS,
  SET_BRAND_TRANSLATION,
} from './brands.graphql';

export function useBrandsQuery() {
  const {
    data,
    loading: getBrandsLoading,
    error: getBrandsError,
    refetch: refetchBrands,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'brands'>>(BRANDS_QUERY);
  return {
    brands: data?.brands || [],
    getBrandsLoading,
    getBrandsError,
    refetchBrands,
  };
}

export const useBrands = () => {
  const [createBrandMutation, { loading: isCreatingBrand }] = useMutation(
    CREATE_BRAND,
    {
      refetchQueries: [{ query: BRANDS_QUERY }],
    }
  );

  const [updateBrandMutation, { loading: isUpdatingBrand }] = useMutation(
    UPDATE_BRAND,
    {
      refetchQueries: [{ query: BRANDS_QUERY }],
    }
  );

  const [deleteBrandMutation, { loading: isDeletingBrand }] = useMutation(
    DELETE_BRAND,
    {
      refetchQueries: [{ query: BRANDS_QUERY }],
    }
  );

  const [bulkTranslateMutation, { loading: isBulkTranslating }] = useMutation(
    BULK_TRANSLATE_BRANDS
  );

  const [setTranslationMutation, { loading: isSettingTranslation }] =
    useMutation(SET_BRAND_TRANSLATION);

  const createBrand = (slug: string, sortOrder = 0, name?: string) =>
    createBrandMutation({
      variables: {
        input: { slug, sortOrder },
        ...(name && { name }),
      } as { input: CreateBrandInput; name?: string },
    });

  const updateBrand = (
    id: number,
    slug: string,
    sortOrder?: number,
    isActive?: boolean,
    name?: string
  ) =>
    updateBrandMutation({
      variables: {
        input: { id, slug, sortOrder, isActive },
        ...(name?.trim() ? { name: name.trim() } : {}),
      },
    });

  const deleteBrand = (id: number) =>
    deleteBrandMutation({
      variables: { id },
      optimisticResponse: {
        deleteBrand: true,
      },
    });

  const bulkTranslateBrands = (
    entityIds: number[],
    sourceLocale: string,
    targetLocales: string[]
  ) =>
    bulkTranslateMutation({
      variables: {
        input: {
          entityType: 'brand',
          entityIds,
          sourceLocale,
          targetLocales,
        },
      },
    });

  const setBrandTranslation = (
    entityId: number,
    locale: string,
    fieldName: string,
    value: string,
    isAutoTranslated = false
  ) =>
    setTranslationMutation({
      variables: {
        input: {
          entityType: 'brand',
          entityId,
          locale,
          fieldName,
          value,
          isAutoTranslated,
        },
      },
    });

  return {
    createBrand,
    updateBrand,
    deleteBrand,
    bulkTranslateBrands,
    setBrandTranslation,
    isCreatingBrand,
    isUpdatingBrand,
    isDeletingBrand,
    isBulkTranslating,
    isSettingTranslation,
  };
};
