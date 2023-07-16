import { defineConfig } from 'unocss';
import variantGroup from '@unocss/transformer-variant-group';
import atype from '@a-type/ui/uno-preset';

const config = defineConfig({
  presets: [atype()],
  // required to support styling in this library
  transformers: [variantGroup()],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include @a-type/ui files
        // /@a-type\/ui\/.*\.js$/,
        // '@a-type/ui/**/*.js',
        // '**/*.{js,ts}',
      ],
    },
    // filesystem: ['./node_modules/@a-type/**/*'],
  },
});

console.log(config);
export default config;
