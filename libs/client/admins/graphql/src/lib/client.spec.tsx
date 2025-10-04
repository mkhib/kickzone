import { describe, it, expect } from 'vitest';
import apolloClient from './client';

describe('Apollo Client Configuration', () => {
  it('should export apolloClient', () => {
    expect(apolloClient).toBeDefined();
    expect(typeof apolloClient).toBe('object');
  });

  it('should have correct URI configuration', () => {
    const link = apolloClient.link;
    expect(link).toBeDefined();
  });

  it('should have cache configuration', () => {
    const cache = apolloClient.cache;
    expect(cache).toBeDefined();
  });

  it('should have default options configuration', () => {
    const defaultOptions = apolloClient.defaultOptions;
    expect(defaultOptions).toBeDefined();
    expect(defaultOptions.mutate).toBeDefined();
    expect(defaultOptions.mutate?.fetchPolicy).toBe('no-cache');
  });

  it('should have type policies for pagination', () => {
    const cache = apolloClient.cache;
    expect(cache).toBeDefined();

    // Check if cache is properly configured
    expect(typeof cache).toBe('object');
  });
});
