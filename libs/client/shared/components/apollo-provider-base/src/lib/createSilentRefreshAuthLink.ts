import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { onError } from '@apollo/client/link/error';
import type { ApolloLink } from '@apollo/client';
import { Observable } from 'rxjs';

const REFRESH_MUTATION = `
  mutation Refresh {
    refresh
  }
`;

const DEFAULT_SKIP_OPERATIONS = new Set([
  'login',
  'refresh',
  'logout',
  'register',
]);

export interface SilentRefreshAuthLinkOptions {
  graphqlUri: string;
  onAuthError: () => void;
  /** Extra operation names (lowercase) that should not trigger refresh/redirect */
  skipOperations?: string[];
  /** When true, do not redirect on failed refresh (e.g. public cart page) */
  shouldSkipRedirect?: () => boolean;
}

let refreshInFlight: Promise<boolean> | null = null;

/** Test helper to clear single-flight state between cases */
export function resetRefreshAuthSessionForTests(): void {
  refreshInFlight = null;
}

export function refreshAuthSession(graphqlUri: string): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch(graphqlUri, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'apollo-require-preflight': 'true',
      },
      body: JSON.stringify({
        query: REFRESH_MUTATION,
        operationName: 'Refresh',
      }),
    })
      .then(async (response) => {
        const json = (await response.json()) as {
          data?: { refresh?: boolean };
        };
        return json?.data?.refresh === true;
      })
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}

function isUnauthenticatedError(error: unknown): boolean {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((graphQLError) => {
      const message = graphQLError.message?.toLowerCase() ?? '';
      const code = graphQLError.extensions?.code;
      return (
        code === 'UNAUTHENTICATED' ||
        message.includes('not authenticated') ||
        message.includes('unauthorized')
      );
    });
  }

  const err = error as { message?: string; statusCode?: number } | null;
  const message = err?.message?.toLowerCase() ?? '';
  return (
    message.includes('not authenticated') ||
    message.includes('unauthorized') ||
    err?.statusCode === 401
  );
}

export function createSilentRefreshAuthLink(
  options: SilentRefreshAuthLinkOptions
): ApolloLink {
  const skipOperations = new Set([
    ...DEFAULT_SKIP_OPERATIONS,
    ...(options.skipOperations ?? []).map((name) => name.toLowerCase()),
  ]);

  return onError(({ error, operation, forward }) => {
    const operationName = operation.operationName?.toLowerCase() ?? '';

    if (skipOperations.has(operationName)) {
      return;
    }

    if (!isUnauthenticatedError(error)) {
      return;
    }

    if (operation.getContext()._authRefreshRetried) {
      if (!options.shouldSkipRedirect?.()) {
        options.onAuthError();
      }
      return;
    }

    return new Observable((observer) => {
      let innerSub: { unsubscribe: () => void } | undefined;

      refreshAuthSession(options.graphqlUri)
        .then((success) => {
          if (!success) {
            if (!options.shouldSkipRedirect?.()) {
              options.onAuthError();
            }
            observer.error(error);
            return;
          }

          operation.setContext({ _authRefreshRetried: true });
          innerSub = forward(operation).subscribe({
            next: (value) => observer.next(value),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
        })
        .catch((err) => {
          if (!options.shouldSkipRedirect?.()) {
            options.onAuthError();
          }
          observer.error(err);
        });

      return () => {
        innerSub?.unsubscribe();
      };
    });
  });
}
