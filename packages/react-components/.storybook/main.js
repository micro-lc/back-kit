const {mergeConfig} = require('vite')
// const {default: dynamicImport} = require('vite-plugin-dynamic-import')
// const {replaceCodePlugin} = require('vite-plugin-replace')
const {default: tsconfigPaths} = require('vite-tsconfig-paths')

/** @type {import('vite').UserConfig} */
const viteConfig = {
  plugins: [
    tsconfigPaths(),
    // dynamicImport({
    //   viteIgnore: (_, id) => id.match(/src\/common\/(dynamic-icon)/) !== null ? true : undefined
    // }),
    // replaceCodePlugin({
    //   replacements: [
    //     {
    //       from: './../icons',
    //       to: './../../node_modules/icons'
    //     }
    //   ]
    // })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'ant-prefix': 'back-kit'
        }
      }
    }
  },
  // build: {
  //   dynamicImportVarsOptions: {
  //     exclude: ['./src/common/dynamic-icon.tsx']
  //   }
  // }
} 

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  features: {
    storyStoreV7: true
  },
  viteFinal: (config) =>  mergeConfig(config, viteConfig)
}
