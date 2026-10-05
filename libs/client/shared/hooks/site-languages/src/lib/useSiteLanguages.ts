import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { GET_SITE_LANGUAGES } from './site-languages.graphql';

export interface UseSiteLanguagesOptions {
  activeOnly?: boolean;
}

export function useSiteLanguages(
  options: UseSiteLanguagesOptions = { activeOnly: true }
) {
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'siteLanguages'>,
    KickzoneGraphqlTypes.QuerySiteLanguagesArgs
  >(GET_SITE_LANGUAGES, {
    variables: { activeOnly: options.activeOnly },
    fetchPolicy: 'cache-and-network',
  });

  return {
    siteLanguages: data?.siteLanguages || [],
    loading,
    error,
    refetch,
  };
}
