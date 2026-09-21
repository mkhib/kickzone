import { expect, test } from '@playwright/test';

/**
 * Critical-path smoke for admins (Chromium).
 * Does not require a live API — asserts public/auth shells and protected redirects.
 */
test.describe('Admins critical path', () => {
  test('login screen shows email, password, and sign-in', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="email"]')).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('protected products route redirects unauthenticated users to login', async ({
    page,
  }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('product editor route redirects unauthenticated users to login', async ({
    page,
  }) => {
    await page.goto('/products/new');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });

  test('orders and sellers routes redirect unauthenticated users to login', async ({
    page,
  }) => {
    await page.goto('/orders');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });

    await page.goto('/sellers');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });
});
