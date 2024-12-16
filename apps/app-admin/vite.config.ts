/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/apps/app-admin',
  server: {
    port: 4500,
    host: 'localhost',
  },
  preview: {
    port: 4400,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

  resolve: {
      alias: {
        '@shared-ui': path.resolve(__dirname, '../../libs/shared-ui/src'),
      },
    },

  build: {
    outDir: 'dist/apps/app-admin',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
