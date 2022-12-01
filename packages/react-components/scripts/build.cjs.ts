import esbuild from 'esbuild'

import { entryPoints } from './glob'

esbuild.build({
  entryPoints,
  format: 'cjs',
  outdir: 'dist/cjs',
}).then(() => {
  console.log('✓ react commonjs')
}).catch((err) => {
  console.error('fialed to build es module', err)
})
