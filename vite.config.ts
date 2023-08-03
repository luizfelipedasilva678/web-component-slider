import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import cssnano from 'cssnano';
import postcssNested from 'postcss-nested';
import postcssPixToRem from 'postcss-pxtorem';

export default defineConfig({
  plugins: [
    dts({
      outDir: './dist/types',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'web-component-slider',
      fileName: 'web-component-slider',
    },
  },
  css: {
    postcss: {
      plugins: [
        cssnano,
        postcssNested,
        postcssPixToRem({
          propList: ['*'],
          rootValue: 16,
        }),
      ],
    },
  },
});
