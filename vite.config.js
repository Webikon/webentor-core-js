import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'], // build both ESM and CJS
      fileName: (format) => `index.${format === 'es' ? 'esm.js' : 'cjs.js'}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        ...Object.keys(pkg.devDependencies), // don't bundle dev dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext', // transpile as little as possible
    sourcemap: true,
  },

  optimizeDeps: {
    // Fix imports from webpack built libraries
    include: ['@10up/block-components'],
  },

  plugins: [
    // emit TS declaration files
    dts({
      compilerOptions: {
        noCheck: true, // Maybe enable this in the future
      },
    }),
  ],
});
