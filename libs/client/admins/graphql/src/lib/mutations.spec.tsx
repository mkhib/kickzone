import { describe, it, expect } from 'vitest';
import { LOGIN_MUTATION, LOGOUT_MUTATION } from './mutations';

describe('GraphQL Mutations', () => {
  it('should export LOGIN_MUTATION', () => {
    expect(LOGIN_MUTATION).toBeDefined();
    expect(typeof LOGIN_MUTATION).toBe('object');
  });

  it('should export LOGOUT_MUTATION', () => {
    expect(LOGOUT_MUTATION).toBeDefined();
    expect(typeof LOGOUT_MUTATION).toBe('object');
  });

  it('should have valid GraphQL mutation structure for LOGIN_MUTATION', () => {
    const mutationString = LOGIN_MUTATION.loc?.source.body || '';
    expect(mutationString).toContain('mutation Login');
    expect(mutationString).toContain('$email: String!');
    expect(mutationString).toContain('$password: String!');
    expect(mutationString).toContain(
      'login(email: $email, password: $password)'
    );
    expect(mutationString).toContain('id');
    expect(mutationString).toContain('name');
    expect(mutationString).toContain('email');
    expect(mutationString).toContain('role');
  });

  it('should have valid GraphQL mutation structure for LOGOUT_MUTATION', () => {
    const mutationString = LOGOUT_MUTATION.loc?.source.body || '';
    expect(mutationString).toContain('mutation Logout');
    expect(mutationString).toContain('logout');
  });
});
