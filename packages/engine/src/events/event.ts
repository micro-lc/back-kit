interface Unique {
  readonly __id: symbol
}

export interface Labelled {
  label: string
}

export type Payload = Record<string, unknown>;

export type Meta = Record<string, unknown>

export interface Event<P extends Payload = Payload, M extends Meta = Meta> extends Unique, Labelled {
  readonly __same: (other: Unique) => boolean
  meta?: M
  payload?: P
}

export function createEvent<P extends Payload = Payload, M extends Meta = Meta>(label: string, payload?: P, meta?: M): Event<P, M> {
  const unique = {
    __id: Symbol('__id'),
    __same(this: Unique, other: Unique) {
      return this.__id === other.__id
    },
  }

  return {
    ...Object.freeze(unique),
    label,
    meta,
    payload,
  }
}
