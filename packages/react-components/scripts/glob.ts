import glob from 'glob'

const entryPoints = glob
  .sync('src/**/*.{j,t}s?(x)')
  .filter((name) => !name.match(/(stories|test)\.(j|t)sx?$/))

export { entryPoints }
