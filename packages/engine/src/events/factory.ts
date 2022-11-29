import { createEvent } from './event'
import type { Payload, Meta, Event, Labelled } from './event'

export interface FactoryOptions {
  aliases?: string | string[]
  divider?: string
  scope?: string
}

export interface Factory<P extends Payload = Payload, M extends Meta = Meta> extends Labelled {
  (payload?: P, meta?: M): Event<P, M>
  is: <T extends Event, S extends T>(event: T) => event is S
}

export function makeFactoryFor<P extends Payload = Payload, M extends Meta = Meta>(
  label: string, options: FactoryOptions = {}
): Factory<P, M> {
  const {
    scope, divider = '/', aliases = [],
  } = options

  const scopedLabel = scope ? `${scope}${divider}${label}` : label

  const currentFactory = function currentFactory(payload?: P, meta?: M): Event<P, M> {
    return createEvent<P, M>(
      scopedLabel, payload, meta
    )
  } as Factory<P, M>

  currentFactory.label = scopedLabel
  currentFactory.is = function is<T extends Event, S extends T>(event: T): event is S {
    let akas = aliases
    if (!Array.isArray(aliases)) {
      akas = [aliases]
    }

    return [scopedLabel, ...akas].includes(event.label)
  }

  return currentFactory
}
