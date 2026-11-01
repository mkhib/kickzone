/** Minimal structural shape of an Apollo/GraphQL client error, for narrowing unknown catch values. */
export interface GraphQLErrorItemLike {
  message: string;
  path?: readonly (string | number)[];
  extensions?: { message?: string; [key: string]: unknown };
}

export interface NetworkErrorLike extends Error {
  statusCode?: number;
  statusText?: string;
  result?: Record<string, unknown>;
}

export interface ApolloErrorLike {
  message?: string;
  graphQLErrors?: readonly GraphQLErrorItemLike[];
  networkError?: NetworkErrorLike | null;
}

export function isApolloErrorLike(err: unknown): err is ApolloErrorLike {
  return (
    typeof err === 'object' &&
    err !== null &&
    ('graphQLErrors' in err || 'networkError' in err)
  );
}

/** Returns the value typed as ApolloErrorLike when it carries Apollo error fields, otherwise undefined. */
export function asApolloErrorLike(err: unknown): ApolloErrorLike | undefined {
  return isApolloErrorLike(err) ? err : undefined;
}
