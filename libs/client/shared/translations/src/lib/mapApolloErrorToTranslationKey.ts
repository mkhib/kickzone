// ApolloError type definition
interface ApolloError extends Error {
  graphQLErrors?: Array<{
    extensions?: { code?: string };
  }>;
}

export type ErrorTranslationKey =
  | 'unauthorized'
  | 'emailAlreadyExists'
  | 'userNotFound'
  | 'invalidToken'
  | 'wrongEmailOrPassword'
  | 'networkError'
  | 'serverError'
  | 'unknown';

export function mapApolloErrorToTranslationKey(
  error: ApolloError | Error
): ErrorTranslationKey {
  // Check for Apollo GraphQL errors
  if ('graphQLErrors' in error) {
    const code = error?.graphQLErrors?.[0]?.extensions?.code;
    if (code === 'UNAUTHENTICATED') return 'unauthorized';
  }

  // Check error message for specific patterns
  const message = error?.message?.toLowerCase() || '';

  if (message.includes('email already exists')) return 'emailAlreadyExists';
  if (message.includes('user not found')) return 'userNotFound';
  if (message.includes('invalid or expired token')) return 'invalidToken';
  if (message.includes('invalid') && message.includes('token'))
    return 'invalidToken';
  if (message.includes('unauthorized')) return 'unauthorized';
  if (message.includes('wrong') || message.includes('credentials'))
    return 'wrongEmailOrPassword';
  if (message.includes('network') || message.includes('fetch'))
    return 'networkError';
  if (
    message.includes('internal server error') ||
    message.includes('500') ||
    message.includes('503')
  )
    return 'serverError';

  return 'unknown';
}

/**
 * Get a user-friendly error message from an error object
 * Returns the translation key for auth errors, or the raw message for others
 */
export function getErrorMessage(error: ApolloError | Error): {
  translationKey?: ErrorTranslationKey;
  rawMessage?: string;
} {
  const translationKey = mapApolloErrorToTranslationKey(error);

  // If we have a known translation key, return it
  if (translationKey !== 'unknown') {
    return { translationKey };
  }

  // Otherwise return the raw error message (in English)
  return { rawMessage: error.message };
}
