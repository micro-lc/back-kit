/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run `yarn make-types` to regenerate this file.
 */

/**
 * This interface was referenced by `MiaSchema`'s JSON-Schema
 * via the `definition` "localized-text".
 */
export type LocalizedText =
  | string
  | {
      [k: string]: string
    }
/**
 * @minItems 1
 *
 * This interface was referenced by `MiaSchema`'s JSON-Schema
 * via the `definition` "schemaArray".
 */
export type SchemaArray = [MiaSchema, ...MiaSchema[]]
/**
 * This interface was referenced by `MiaSchema`'s JSON-Schema
 * via the `definition` "stringArray".
 */
export type StringArray = string[]
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "fetchFactory".
 */
export type FetchFactory = (context: Record<string, unknown>) => Fetch
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "storageFactory".
 */
export type StorageFactory = (context: Record<string, unknown>) => Storage
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "method".
 */
export type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "OPTIONS" | "HEAD"
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "handler".
 */
export type ReducedFetchHandler = (info: URL, init?: RequestInit | undefined) => Promise<Response>
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "fetch".
 */
export type Fetch = {
  url: FetchUrl
  method?: Method
  notify?: boolean
  handler?: ReducedFetchHandler
  [k: string]: unknown
}[]

export interface Manifest {
  label?: LocalizedText
  definitions?: {
    [k: string]: MiaSchema
  }
  description?: LocalizedText
  docLink?: string
  type?: "layout" | "connector" | "adapter"
  mocks?: {
    fetch?: FetchFactory
    localStorage?: StorageFactory
    sessionStorage?: StorageFactory
    [k: string]: unknown
  }
  properties?: {
    [k: string]: MiaSchema
  }
  [k: string]: unknown
}
export interface MiaSchema {
  $id?: string
  $schema?: string
  $ref?: string
  $comment?: string
  title?: string
  description?: string
  type?:
    | ("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")
    | [
        "array" | "boolean" | "integer" | "null" | "number" | "object" | "string",
        ...("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")[]
      ]
  default?: unknown
  readOnly?: boolean
  writeOnly?: boolean
  examples?: unknown[]
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeInteger".
   */
  maxLength?: number
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeIntegerDefault0".
   */
  minLength?: number
  pattern?: string
  additionalItems?: MiaSchema
  items?: MiaSchema | SchemaArray
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeInteger".
   */
  maxItems?: number
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeIntegerDefault0".
   */
  minItems?: number
  uniqueItems?: boolean
  contains?: MiaSchema
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeInteger".
   */
  maxProperties?: number
  /**
   * This interface was referenced by `MiaSchema`'s JSON-Schema
   * via the `definition` "nonNegativeIntegerDefault0".
   */
  minProperties?: number
  properties?: {
    [k: string]: MiaSchema
  }
  additionalProperties?: boolean | MiaSchema
  patternProperties?: {
    [k: string]: MiaSchema
  }
  required?: StringArray
  dependencies?: {
    [k: string]: MiaSchema | StringArray
  }
  propertyNames?: MiaSchema
  const?: unknown
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]]
  format?: string
  contentMediaType?: string
  contentEncoding?: string
  if?: MiaSchema
  then?: MiaSchema
  else?: MiaSchema
  allOf?: SchemaArray
  anyOf?: SchemaArray
  oneOf?: SchemaArray
  not?: MiaSchema
  __mia_configuration?: MiaConfiguration
  [k: string]: unknown
}
/**
 * This interface was referenced by `MiaSchema`'s JSON-Schema
 * via the `definition` "__mia_configuration".
 */
export interface MiaConfiguration {
  deprecated?:
    | boolean
    | {
        since?: string
        description?: LocalizedText
        [k: string]: unknown
      }
  label?: LocalizedText
  description?: LocalizedText
  docLink?: string
  oneOfGuard?: string
  oneOfDefault?: number
  priority?: "high" | "medium" | "low"
  attribute?: boolean | string
  "schema-hint"?:
    | "localized-text"
    | "dynamic-icon"
    | "on-off-toggle"
    | "color"
    | "event"
    | "mia/endpoints"
    | "mia/endpoints/crud"
    | "micro-lc/applications"
  "shared-key"?: "back-kit/data-schema" | string
  enumLabels?: {
    [k: string]: LocalizedText
  }
}
/**
 * This interface was referenced by `Manifest`'s JSON-Schema
 * via the `definition` "url".
 */
export interface FetchUrl {
  origin?: string
  pathname: string
}
