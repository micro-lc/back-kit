import esbuild from 'esbuild'

import { entryPoints } from './glob'

esbuild.build({
  entryPoints,
  outdir: 'dist/es',
}).then(() => {
  console.log('✓ react es module')
}).catch((err) => {
  console.error('fialed to build es module', err)
})
