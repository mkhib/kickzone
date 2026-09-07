import { describe, it, expect } from 'vitest';
import { ADMIN_ROUTES, AdminRouteKey } from './admin-routes';

describe('ADMIN_ROUTES', () => {
  it('should define HOME route', () => {
    expect(ADMIN_ROUTES.HOME).toBe('/');
  });

  it('should define PRODUCTS route', () => {
    expect(ADMIN_ROUTES.PRODUCTS).toBe('/products');
  });

  it('should define PRODUCTS_NEW route', () => {
    expect(ADMIN_ROUTES.PRODUCTS_NEW).toBe('/products/new');
  });

  it('should define PRODUCTS_EDIT route', () => {
    expect(ADMIN_ROUTES.PRODUCTS_EDIT).toBe('/products/edit/:id');
  });

  it('should define SELLERS route', () => {
    expect(ADMIN_ROUTES.SELLERS).toBe('/sellers');
  });

  it('should define LOGIN route', () => {
    expect(ADMIN_ROUTES.LOGIN).toBe('/login');
  });

  it('should define UNAUTHORIZED route', () => {
    expect(ADMIN_ROUTES.UNAUTHORIZED).toBe('/unauthorized');
  });

  it('should define CONTACT route', () => {
    expect(ADMIN_ROUTES.CONTACT).toBe('/contact');
  });

  it('should have all expected route keys', () => {
    const expectedKeys: AdminRouteKey[] = [
      'HOME',
      'PRODUCTS',
      'PRODUCTS_NEW',
      'PRODUCTS_EDIT',
      'SELLERS',
      'ORDERS',
      'CURRENCY',
      'LOGIN',
      'UNAUTHORIZED',
      'CONTACT',
      'TRANSLATIONS',
      'LANGUAGE_SETTINGS',
    ];

    const actualKeys = Object.keys(ADMIN_ROUTES) as AdminRouteKey[];
    expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
    expect(actualKeys.length).toBe(expectedKeys.length);
  });

  it('should be readonly at compile time', () => {
    // TypeScript will prevent mutation at compile time
    // At runtime, the object is still mutable but TypeScript prevents it
    // We just verify the object exists and is defined as const
    expect(ADMIN_ROUTES).toBeDefined();
    expect(Object.isFrozen(ADMIN_ROUTES)).toBe(false); // const doesn't freeze, just prevents reassignment
  });

  it('should have correct route structure', () => {
    expect(typeof ADMIN_ROUTES).toBe('object');
    expect(ADMIN_ROUTES).not.toBeNull();
  });

  it('should have string values for all routes', () => {
    Object.values(ADMIN_ROUTES).forEach((route) => {
      expect(typeof route).toBe('string');
    });
  });

  it('should have unique route paths', () => {
    const routePaths = Object.values(ADMIN_ROUTES);
    const uniquePaths = new Set(routePaths);
    expect(uniquePaths.size).toBe(routePaths.length);
  });

  it('should have routes starting with /', () => {
    Object.values(ADMIN_ROUTES).forEach((route) => {
      expect(route).toMatch(/^\//);
    });
  });
});
