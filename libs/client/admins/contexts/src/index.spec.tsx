import { describe, it, expect, vi } from 'vitest';

// Mock Apollo Client
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

// Mock GraphQL
vi.mock('@kickzone-workspace/admins-graphql', () => ({
  ME_QUERY: 'ME_QUERY',
  LOGOUT_MUTATION: 'LOGOUT_MUTATION',
}));

import * as exports from './index';

describe('admins-contexts exports', () => {
  it('should export AdminsAuthProvider', () => {
    expect(exports).toHaveProperty('AdminsAuthProvider');
    expect(typeof exports.AdminsAuthProvider).toBe('function');
  });

  it('should export useAdminsAuthContext', () => {
    expect(exports).toHaveProperty('useAdminsAuthContext');
    expect(typeof exports.useAdminsAuthContext).toBe('function');
  });
});
