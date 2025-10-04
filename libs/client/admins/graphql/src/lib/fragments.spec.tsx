import { describe, it, expect } from 'vitest';
import {
  SELLER_INFO_FRAGMENT,
  ADMIN_SELLER_PRODUCT_FRAGMENT,
  ADMIN_PRODUCT_FRAGMENT,
  ADMIN_PRODUCT_MANAGEMENT_FRAGMENT,
} from './fragments';

describe('GraphQL Fragments', () => {
  it('should export SELLER_INFO_FRAGMENT', () => {
    expect(SELLER_INFO_FRAGMENT).toBeDefined();
    expect(typeof SELLER_INFO_FRAGMENT).toBe('object');
  });

  it('should export ADMIN_SELLER_PRODUCT_FRAGMENT', () => {
    expect(ADMIN_SELLER_PRODUCT_FRAGMENT).toBeDefined();
    expect(typeof ADMIN_SELLER_PRODUCT_FRAGMENT).toBe('object');
  });

  it('should export ADMIN_PRODUCT_FRAGMENT', () => {
    expect(ADMIN_PRODUCT_FRAGMENT).toBeDefined();
    expect(typeof ADMIN_PRODUCT_FRAGMENT).toBe('object');
  });

  it('should export ADMIN_PRODUCT_MANAGEMENT_FRAGMENT', () => {
    expect(ADMIN_PRODUCT_MANAGEMENT_FRAGMENT).toBeDefined();
    expect(typeof ADMIN_PRODUCT_MANAGEMENT_FRAGMENT).toBe('object');
  });

  it('should have valid GraphQL fragment structure for SELLER_INFO_FRAGMENT', () => {
    const fragmentString = SELLER_INFO_FRAGMENT.loc?.source.body || '';
    expect(fragmentString).toContain('fragment SellerInfoFields on SellerInfo');
    expect(fragmentString).toContain('id');
    expect(fragmentString).toContain('storeName');
    expect(fragmentString).toContain('phone');
    expect(fragmentString).toContain('address');
    expect(fragmentString).toContain('isActive');
    expect(fragmentString).toContain('user');
  });

  it('should have valid GraphQL fragment structure for ADMIN_SELLER_PRODUCT_FRAGMENT', () => {
    const fragmentString = ADMIN_SELLER_PRODUCT_FRAGMENT.loc?.source.body || '';
    expect(fragmentString).toContain(
      'fragment AdminSellerProductFields on SellerProduct'
    );
    expect(fragmentString).toContain('id');
    expect(fragmentString).toContain('price');
    expect(fragmentString).toContain('costPrice');
    expect(fragmentString).toContain('discount');
    expect(fragmentString).toContain('stockQuantity');
    expect(fragmentString).toContain('seller');
    expect(fragmentString).toContain('productInfo');
  });

  it('should have valid GraphQL fragment structure for ADMIN_PRODUCT_FRAGMENT', () => {
    const fragmentString = ADMIN_PRODUCT_FRAGMENT.loc?.source.body || '';
    expect(fragmentString).toContain('fragment AdminProductFields on Product');
    expect(fragmentString).toContain('id');
    expect(fragmentString).toContain('name');
    expect(fragmentString).toContain('archived');
    expect(fragmentString).toContain('description');
    expect(fragmentString).toContain('categories');
    expect(fragmentString).toContain('productInfos');
    expect(fragmentString).toContain('sellerProducts');
  });

  it('should have valid GraphQL fragment structure for ADMIN_PRODUCT_MANAGEMENT_FRAGMENT', () => {
    const fragmentString =
      ADMIN_PRODUCT_MANAGEMENT_FRAGMENT.loc?.source.body || '';
    expect(fragmentString).toContain(
      'fragment AdminProductManagementFields on Product'
    );
    expect(fragmentString).toContain('id');
    expect(fragmentString).toContain('name');
    expect(fragmentString).toContain('archived');
    expect(fragmentString).toContain('description');
    expect(fragmentString).toContain('categories');
    expect(fragmentString).toContain('productInfos');
  });
});
