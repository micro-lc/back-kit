import cp from 'child_process'
import fs from 'fs'
import path from 'path'

import type IPackageJson from '@ts-type/package-dts'

type Semver = 'major' | 'minor' | 'patch'

const workingDir = path.resolve(__dirname, '..', 'packages/templates')

const semverRegex = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/

const isSemverHint = (input: unknown): input is Semver =>
  typeof input === 'string' && ['major', 'minor', 'patch'].includes(input)

const exec = async (cmd: string, args: string[], opts: cp.ExecFileOptionsWithBufferEncoding = { encoding: 'buffer' }) =>
  new Promise((resolve, reject) => {
    cp.execFile(cmd, args, opts, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        console.error(stderr)
        reject(err)
      } else {
        console.log(`[${[cmd, ...args].join(' ')}]: done`)
        resolve([true, stdout])
      }
    })
  })

const getArgs = () => {
  const { argv: [,, nextVersion] } = process

  if (typeof nextVersion !== 'string') {
    throw new TypeError('First arg must be a string: either "major", "minor", "patch", or any valid semver')
  }

  return {
    hint: isSemverHint(nextVersion),
    required: nextVersion,
  }
}

const queryVersion = async (dir: string) =>
  fs.promises.readFile(`${dir}/package.json`)
    .then((content) => JSON.parse(content.toString('utf-8')) as IPackageJson)
    .then(({ version }) => (version?.match(semverRegex) ? version : undefined))
    .catch(() => {
      throw new TypeError(`No package.json file found at ${dir}`)
    })

const updateChangelog = async (dir: string, version: string) => {
  const changelogPath = path.resolve(dir, 'CHANGELOG.md')
  // eslint-disable-next-line no-sync
  if (!fs.existsSync(changelogPath)) {
    console.warn('No CHANGELOG.md file found')
    return
  }

  return fs.promises.readFile(changelogPath)
    .then((content) => {
      const lines = content.toString().split(/(?:\r\n|\r|\n)/g)
      const unreleasedLine = lines
        .findIndex((line) =>
          line
            .trim()
            .replace(/\s/g, '')
            .toLowerCase()
            .match(/^##unreleased/)
        )

      const date = new Date().toISOString()
      const tIndex = date.indexOf('T')

      const output = lines
        .slice(0, unreleasedLine + 1)
        .concat('')
        .concat(`## [${version}] - ${date.slice(0, tIndex)}`)
        .concat('')
        .concat(lines.slice(unreleasedLine + 2))
      return fs.promises.writeFile(changelogPath, output.join('\n'))
    })
    .then(() => changelogPath)
    .catch((err: TypeError) => {
      console.error(err.message)
      return undefined
    })
}

const main = async () => {
  const { required, hint } = getArgs()

  await exec('yarn', ['workspace', '@micro-lc/back-kit-templates', 'version', required])

  let newVersion: string = required
  if (hint) {
    newVersion = await queryVersion(workingDir) ?? required
  }

  const changelogPath = await updateChangelog(workingDir, newVersion)

  const tagScope = '@micro-lc/back-kit-templates'
  const tag = `${tagScope}@${newVersion}`
  const message = `${tagScope} tagged at version ${newVersion}`

  const files = [
    '.yarn/versions',
    path.resolve(workingDir, 'package.json'),
    changelogPath,
  ].filter(Boolean) as string[]

  await exec('git', ['reset'])
  await exec('git', ['add', ...files])
  await exec('git', ['commit', '-nm', message])
  await exec('git', ['tag', '-a', tag, '-m', message])

  const pushCommand = `"git push && git push origin ${tag}"`
  console.group()
  console.log(pushCommand)
  console.groupEnd()
}

main()
  .catch((err) => {
    console.error(err)
    throw err
  })
