import { ApolloError } from '@apollo/client';

export type ErrorTranslationKey = 'unauthorized' | 'unknown';

export function mapApolloErrorToTranslationKey(
  error: ApolloError
): ErrorTranslationKey {
  const code = error?.graphQLErrors?.[0]?.extensions?.code;
  if (code === 'UNAUTHENTICATED') return 'unauthorized';

  const message = error?.message?.toLowerCase();
  if (message?.includes('unauthorized')) return 'unauthorized';

  return 'unknown';
}
