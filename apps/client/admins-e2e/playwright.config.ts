import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const baseURL = process.env['BASE_URL'] || 'https://127.0.0.1:4300';

/**
 * Vite preview inherits HTTPS from `server.https`.
 * On Windows, prefer installed Google Chrome when Playwright's headless-shell
 * download is incomplete; CI installs browsers via `playwright install`.
 */
const chromiumUse = process.env.CI
  ? { ...devices['Desktop Chrome'] }
  : {
      ...devices['Desktop Chrome'],
      channel: 'chrome' as const,
    };

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn nx run kickzone-admins:preview',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
    timeout: 180_000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: chromiumUse,
    },
  ],
});
