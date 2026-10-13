import { ApolloClient, ApolloLink, InMemoryCache, gql } from '@apollo/client';
import { Observable } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createSilentRefreshAuthLink,
  refreshAuthSession,
  resetRefreshAuthSessionForTests,
} from './createSilentRefreshAuthLink';

const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.empty(),
});

describe('refreshAuthSession', () => {
  beforeEach(() => {
    resetRefreshAuthSessionForTests();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetRefreshAuthSessionForTests();
  });

  it('returns true when refresh mutation succeeds', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({ data: { refresh: true } }),
    } as Response);

    await expect(refreshAuthSession('/graphql')).resolves.toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      '/graphql',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: expect.stringContaining('Refresh'),
      })
    );
  });

  it('returns false when refresh mutation fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({
        errors: [{ message: 'Unauthorized' }],
        data: null,
      }),
    } as Response);

    await expect(refreshAuthSession('/graphql')).resolves.toBe(false);
  });

  it('returns false when fetch throws', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'));

    await expect(refreshAuthSession('/graphql')).resolves.toBe(false);
  });

  it('single-flights concurrent refresh calls', async () => {
    let resolveFetch: (value: Response) => void = () => undefined;
    vi.mocked(fetch).mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
    );

    const first = refreshAuthSession('/graphql');
    const second = refreshAuthSession('/graphql');

    expect(fetch).toHaveBeenCalledTimes(1);

    resolveFetch({
      json: async () => ({ data: { refresh: true } }),
    } as Response);

    await expect(Promise.all([first, second])).resolves.toEqual([true, true]);
  });
});

describe('createSilentRefreshAuthLink', () => {
  const protectedQuery = gql`
    query Protected {
      me {
        id
      }
    }
  `;

  const loginMutation = gql`
    mutation Login {
      login(email: "a", password: "b") {
        id
      }
    }
  `;

  beforeEach(() => {
    resetRefreshAuthSessionForTests();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetRefreshAuthSessionForTests();
  });

  const runLink = (
    authLink: ApolloLink,
    terminating: ApolloLink,
    query = protectedQuery
  ) =>
    new Promise<{ next?: unknown; error?: unknown }>((resolve) => {
      ApolloLink.execute(
        ApolloLink.from([authLink, terminating]),
        { query },
        { client: mockClient }
      ).subscribe({
        next: (value) => resolve({ next: value }),
        error: (error) => resolve({ error }),
        complete: () => resolve({}),
      });
    });

  it('refreshes and retries the operation on unauthenticated errors', async () => {
    const onAuthError = vi.fn();
    let attempts = 0;

    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({ data: { refresh: true } }),
    } as Response);

    const terminating = new ApolloLink(() => {
      attempts += 1;
      if (attempts === 1) {
        return new Observable((observer) => {
          const err = Object.assign(new Error('User not authenticated'), {
            statusCode: 401,
          });
          observer.error(err);
        });
      }
      return new Observable((observer) => {
        observer.next({ data: { me: { id: '1' } } });
        observer.complete();
      });
    });

    const result = await runLink(
      createSilentRefreshAuthLink({
        graphqlUri: '/graphql',
        onAuthError,
      }),
      terminating
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(onAuthError).not.toHaveBeenCalled();
    expect(result.next).toEqual({ data: { me: { id: '1' } } });
    expect(attempts).toBe(2);
  });

  it('calls onAuthError when refresh fails', async () => {
    const onAuthError = vi.fn();

    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({ data: { refresh: false } }),
    } as Response);

    const terminating = new ApolloLink(
      () =>
        new Observable((observer) => {
          observer.error(new Error('not authenticated'));
        })
    );

    const result = await runLink(
      createSilentRefreshAuthLink({
        graphqlUri: '/graphql',
        onAuthError,
      }),
      terminating
    );

    expect(onAuthError).toHaveBeenCalledTimes(1);
    expect(result.error).toBeTruthy();
  });

  it('skips redirect when shouldSkipRedirect returns true', async () => {
    const onAuthError = vi.fn();

    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({ data: { refresh: false } }),
    } as Response);

    const terminating = new ApolloLink(
      () =>
        new Observable((observer) => {
          observer.error(new Error('unauthorized'));
        })
    );

    await runLink(
      createSilentRefreshAuthLink({
        graphqlUri: '/graphql',
        onAuthError,
        shouldSkipRedirect: () => true,
      }),
      terminating
    );

    expect(onAuthError).not.toHaveBeenCalled();
  });

  it('does not attempt refresh for login operations', async () => {
    const onAuthError = vi.fn();
    const terminating = new ApolloLink(
      () =>
        new Observable((observer) => {
          observer.error(new Error('unauthorized'));
        })
    );

    const result = await runLink(
      createSilentRefreshAuthLink({
        graphqlUri: '/graphql',
        onAuthError,
      }),
      terminating,
      loginMutation
    );

    expect(fetch).not.toHaveBeenCalled();
    expect(onAuthError).not.toHaveBeenCalled();
    expect(result.error).toBeTruthy();
  });

  it('does not attempt refresh for non-auth errors', async () => {
    const onAuthError = vi.fn();
    const terminating = new ApolloLink(
      () =>
        new Observable((observer) => {
          observer.error(new Error('Internal server error'));
        })
    );

    await runLink(
      createSilentRefreshAuthLink({
        graphqlUri: '/graphql',
        onAuthError,
      }),
      terminating
    );

    expect(fetch).not.toHaveBeenCalled();
    expect(onAuthError).not.toHaveBeenCalled();
  });
});
