import type { BusPool } from '@micro-lc/composer'

import type { Payload, Meta, Event } from './event'

export * from './event'
export * from './factory'

export type EventBus<P extends Payload = Payload, M extends Meta = Meta> = BusPool<Event<P, M>>
