import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/shared/shared-i18n',
  plugins: [react(), nxViteTsPaths()],
  test: {
    setupFiles: ['../../../setupTests.ts'],
    passWithNoTests: true,
    name: 'shared-i18n',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/shared/shared-i18n',
      provider: 'v8' as const,
    },
  },
}));
