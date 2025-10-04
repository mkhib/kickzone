import { describe, it, expect } from 'vitest';
import {
  ADMIN_PRODUCTS_QUERY,
  ADMIN_PRODUCT_BY_ID_QUERY,
  ADMIN_PRODUCT_MANAGEMENT_QUERY,
} from './queries';

describe('GraphQL Queries', () => {
  it('should export ADMIN_PRODUCTS_QUERY', () => {
    expect(ADMIN_PRODUCTS_QUERY).toBeDefined();
    expect(typeof ADMIN_PRODUCTS_QUERY).toBe('object');
  });

  it('should export ADMIN_PRODUCT_BY_ID_QUERY', () => {
    expect(ADMIN_PRODUCT_BY_ID_QUERY).toBeDefined();
    expect(typeof ADMIN_PRODUCT_BY_ID_QUERY).toBe('object');
  });

  it('should export ADMIN_PRODUCT_MANAGEMENT_QUERY', () => {
    expect(ADMIN_PRODUCT_MANAGEMENT_QUERY).toBeDefined();
    expect(typeof ADMIN_PRODUCT_MANAGEMENT_QUERY).toBe('object');
  });

  it('should have valid GraphQL query structure for ADMIN_PRODUCTS_QUERY', () => {
    const queryString = ADMIN_PRODUCTS_QUERY.loc?.source.body || '';
    expect(queryString).toContain('query AdminProducts');
    expect(queryString).toContain('products(filter: $filter)');
    expect(queryString).toContain('edges');
    expect(queryString).toContain('node');
    expect(queryString).toContain('pageInfo');
    expect(queryString).toContain('totalCount');
  });

  it('should have valid GraphQL query structure for ADMIN_PRODUCT_BY_ID_QUERY', () => {
    const queryString = ADMIN_PRODUCT_BY_ID_QUERY.loc?.source.body || '';
    expect(queryString).toContain('query AdminProductById');
    expect(queryString).toContain('product(id: $id)');
    expect(queryString).toContain('$id: Int!');
  });

  it('should have valid GraphQL query structure for ADMIN_PRODUCT_MANAGEMENT_QUERY', () => {
    const queryString = ADMIN_PRODUCT_MANAGEMENT_QUERY.loc?.source.body || '';
    expect(queryString).toContain('query AdminProductManagement');
    expect(queryString).toContain('products(filter: $filter)');
    expect(queryString).toContain('edges');
    expect(queryString).toContain('node');
  });
});
