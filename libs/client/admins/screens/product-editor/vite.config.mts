/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir:
    '../../../../../node_modules/.vite/libs/client/admins/screens/product-editor',
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    setupFiles: ['../../../../../setupTests.ts'],
    passWithNoTests: true,
    watch: false,
    globals: true,
    // Heavy MUI editor flows (pants range T1-T5) take 3-4s each; 5s default flakes under load.
    testTimeout: 15000,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory:
        '../../../../../coverage/libs/client/admins/screens/product-editor',
      provider: 'v8',
    },
  },
}));
