import { expect, test } from '@playwright/test';

/**
 * Critical-path smoke for sellers (Chromium).
 * Does not require a live API — asserts auth shell and protected redirects.
 */
test.describe('Sellers critical path', () => {
  test('login screen shows email, password, and sign-in', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="email"]')).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('catalog and manage-product redirect unauthenticated users to login', async ({
    page,
  }) => {
    await page.goto('/catalog');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });

    await page.goto('/manage-product');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });

  test('orders route redirects unauthenticated users to login', async ({
    page,
  }) => {
    await page.goto('/orders');
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });
});
