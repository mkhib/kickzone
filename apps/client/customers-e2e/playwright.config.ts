import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const baseURL = process.env['BASE_URL'] || 'https://127.0.0.1:4400';

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
    command: 'yarn nx run kickzone-customers:preview',
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
