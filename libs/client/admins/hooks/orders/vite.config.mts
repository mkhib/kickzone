/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default mergeConfig(
  defineConfig({
    root: __dirname,
    cacheDir:
      '../../../../../node_modules/.vite/libs/client/admins/hooks/orders',
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
  }),
  defineVitestConfig({
    test: {
    setupFiles: ['../../../../../setupTests.ts'],
    passWithNoTests: true,
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory:
          '../../../../../coverage/libs/client/admins/hooks/orders',
        provider: 'v8',
      },
    },
  })
);
