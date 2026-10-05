import { gql } from '@apollo/client';

export const GET_SITE_LANGUAGES = gql`
  query GetSiteLanguages($activeOnly: Boolean) {
    siteLanguages(activeOnly: $activeOnly) {
      id
      code
      name
      nativeName
      isRTL
      isActive
      isDefault
    }
  }
`;
