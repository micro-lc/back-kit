import { copyFile, mkdir } from 'fs/promises'
import { dirname } from 'path'

import glob from 'glob'

Promise.all(
  glob.sync('src/**/*.*ss').map(async (file) => {
    const filepath = file.match(/^src\/(.*)/)?.[1]
    if (filepath === undefined) {
      throw new TypeError(`${file} is not a filepath contained in "src"`)
    }

    const destDir = dirname(filepath)
    return mkdir(`dist/styles/${destDir}`, { recursive: true }).then(() =>
      copyFile(file, file.replace(/^src/, 'dist/styles'))
    )
  })
).then(() => {
  console.log('✓ less stylesheets copied')
}).catch((err) => {
  console.error('failed to copy less stylesheets', err)
})
