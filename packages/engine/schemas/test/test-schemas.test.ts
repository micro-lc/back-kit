import { randomUUID } from 'crypto'
import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import * as path from 'path'

import type { SchemaObject } from 'ajv'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { expect } from 'chai'
import { glob } from 'glob'
import { mkdirpSync } from 'mkdirp'

export type SchemaWithDefinitions = SchemaObject & { definitions?: Record<string, SchemaObject> }

interface LoadedSchema {
  absPath: string
  id: string
  schema: SchemaWithDefinitions
}

const loadJson = (schemaAbsPath: string): SchemaObject => {
  const fileBuffer = readFileSync(schemaAbsPath)
  return JSON.parse(fileBuffer.toString()) as SchemaObject
}

export const loadSchemas = async (schemasPaths: string[]): Promise<LoadedSchema[]> => {
  const tmp = mkdirpSync(`/tmp/${randomUUID()}`) as string
  const extras = ['https://raw.githubusercontent.com/micro-lc/micro-lc/main/packages/interfaces/schemas/v2/plugin.schema.json#']
  await Promise.all(extras.map((url, idx) => fetch(url).then(res => res.text()).then((text) => writeFile(resolve(tmp, `${idx}.json`), text))))
  const loadedSchemas: LoadedSchema[] = extras.map((id, idx) => {
    const currPath = resolve(tmp, `${idx}.json`)
    return { absPath: currPath, id, schema: loadJson(currPath) }
  })

  return schemasPaths.reduce((acc, currPath) => {
    const schema = loadJson(currPath) as SchemaWithDefinitions
    return [
      ...acc,
      { absPath: currPath, id: schema.$id ?? currPath, schema },
    ]
  }, loadedSchemas)
}

describe('Test schemas', () => {
  const schemasDirPath = resolve(__dirname, '..')
  const schemaTestDirPath = resolve(__dirname, '.')

  const schemasAbsPaths = glob.sync(`${schemasDirPath}/**/*.schema.json`)

  schemasAbsPaths.forEach(schemaAbsPath => {
    const schemaRelPath = schemaAbsPath.replace(schemasDirPath, '')

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    describe(schemaRelPath, async () => {
      const loadedSchemas = await loadSchemas(schemasAbsPaths)
      const configSchema = loadedSchemas.find(({ absPath }) => absPath === schemaAbsPath)?.schema

      const auxiliarySchemas = loadedSchemas
        .filter(({ absPath }) => absPath !== schemaAbsPath)
        .map(({ schema: auxiliarySchema }) => auxiliarySchema)

      const ajv = addFormats(new Ajv({ keywords: [{ keyword: 'instanceOf', schemaType: 'string' }, { keyword: 'tsType', schemaType: 'string' }] }))
      ajv.addSchema(auxiliarySchemas)

      const validate = ajv.compile(configSchema as SchemaObject)

      const pathSegments = path.parse(schemaAbsPath)
      const [schemaName] = pathSegments.name.split('.')

      const testFilesAbsPaths = glob.sync(`${schemaTestDirPath}/${schemaName}/*.json`)

      testFilesAbsPaths.forEach(testFileAbsPath => {
        const testFileRelPath = testFileAbsPath.replace(schemaTestDirPath, '')

        it(testFileRelPath, () => {
          const testJson = loadJson(testFileAbsPath)

          const isValid = validate(testJson)
          expect(isValid, JSON.stringify(validate.errors)).to.be.true
        })
      })
    })
  })
})
