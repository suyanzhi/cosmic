/* eslint-env node */

import {chrome} from '../../electron-vendors.config.json';
import {join} from 'path';
import { builtinModules } from 'module';
import {defineConfig} from 'vite';
import {loadAndSetEnv} from '../../scripts/loadAndSetEnv.mjs';
import svelte from '@sveltejs/vite-plugin-svelte';


const PACKAGE_ROOT = __dirname;

/**
 * Vite looks for `.env.[mode]` files only in `PACKAGE_ROOT` directory.
 * Therefore, you must manually load and set the environment variables from the root directory above
 */
loadAndSetEnv(process.env.MODE, process.cwd());


/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  plugins: [svelte()],
  base: '',
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [
        ...builtinModules,
      ],
    },
    emptyOutDir: true,
  },
});

