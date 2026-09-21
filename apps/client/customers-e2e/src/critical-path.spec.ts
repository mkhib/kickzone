import { expect, test } from '@playwright/test';

/**
 * Critical-path smoke for customers (Chromium).
 * Public browse/cart shells load without auth; login/signup forms are reachable.
 */
test.describe('Customers critical path', () => {
  test('home / products browse shell loads', async ({ page }) => {
    await page.goto('/home');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#root')).not.toBeEmpty({ timeout: 15_000 });
  });

  test('login and signup screens show credentials forms', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="email"]')).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    await page.goto('/signup');
    await expect(page.locator('input[name="email"]').first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test('cart / checkout entry shell loads', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('#root')).not.toBeEmpty({ timeout: 15_000 });
    await expect(page.locator('body')).toBeVisible();
  });
});
