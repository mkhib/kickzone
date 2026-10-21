import { describe, it, expect } from 'vitest';
import {
  CUSTOMER_ROUTES,
  getCustomerProductDetailsRoute,
  getCustomerBrandRoute,
  getCustomerShopRoute,
} from './customer-routes';

describe('CUSTOMER_ROUTES', () => {
  it('defines all required customer routes including guides and favorites', () => {
    expect(CUSTOMER_ROUTES.HOME).toBe('/');
    expect(CUSTOMER_ROUTES.SHOP).toBe('/shop');
    expect(CUSTOMER_ROUTES.FAVORITES).toBe('/favorites');
    expect(CUSTOMER_ROUTES.GUIDE_AUTHENTICITY).toBe('/guide/authenticity');
    expect(CUSTOMER_ROUTES.GUIDE_PAYMENT).toBe('/guide/payment');
    expect(CUSTOMER_ROUTES.CONTACT).toBe('/contact');
    expect(CUSTOMER_ROUTES.SHIPPING_RETURNS).toBe('/shipping-returns');
    expect(CUSTOMER_ROUTES.PRIVACY_POLICY).toBe('/privacy-policy');
  });

  it('generates product details routes properly', () => {
    expect(getCustomerProductDetailsRoute(123)).toBe('/products/123');
    expect(getCustomerProductDetailsRoute('abc')).toBe('/products/abc');
  });

  it('generates brand routes properly', () => {
    expect(getCustomerBrandRoute('Nike')).toBe('/brands/nike');
  });

  it('generates shop routes with query parameters', () => {
    expect(getCustomerShopRoute()).toBe('/shop');
    expect(getCustomerShopRoute({ category: 'shoes', sort: 'cheapest' })).toBe(
      '/shop?category=shoes&sort=cheapest'
    );
    expect(getCustomerShopRoute({ brand: 'Adidas', category: 'hoodies' })).toBe(
      '/brands/adidas?category=hoodies'
    );
  });
});
