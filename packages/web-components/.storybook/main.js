const rollupNodePolyFill = require('rollup-plugin-node-polyfills')
const {mergeConfig} = require('vite')
const {default: tsconfigPaths} = require('vite-tsconfig-paths')
// const {default: dynamicImport} = require('vite-plugin-dynamic-import')
// const {default: monacoEditorPlugin} = require('vite-plugin-monaco-editor')
// const {replaceCodePlugin} = require('vite-plugin-replace')
const {default: postcssAntDynamicTheme} = require('@micro-lc/interfaces/postcss-ant-dynamic-theme')

/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: { builder: '@storybook/builder-vite', disableTelemetry: true },
  staticDirs: ['./static'],
  viteFinal: (config) => mergeConfig(config, {
      plugins: [tsconfigPaths()],
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            modifyVars: {
              'html-selector': ':host'
            }
          }
        }
      },
      esbuild: {target: 'ES2015'},
      build: {
        rollupOptions: {
          plugins: [rollupNodePolyFill()]
        },
        chunkSizeWarningLimit: 4000
      },
      resolve: {
        alias: {
          './worker': require.resolve('./worker.js'),
          path: 'rollup-plugin-node-polyfills/polyfills/path',
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
        dedupe: [
          '@storybook/client-api',
          'react',
          'react-dom',
          'monaco-editor',
        ]
      },
      server: {
        proxy: {
          '/dist/fas': 'http://localhost:8000/'
        }
      }
    })
}
