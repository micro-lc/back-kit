import type { Payload } from '@micro-lc/back-kit-engine/events'
import { makeFactoryFor } from '@micro-lc/back-kit-engine/events'

/**
 * @registeredEvent
 * @title Add New
 * @description notifies adding a new item
 * @payload {
 *    [key: string]: any
 *}
 */

export type AddNewPayload = Payload
export const addNew = makeFactoryFor('add-new')
