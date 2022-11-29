import { randomUUID } from 'crypto'

import { expect } from 'chai'

import type { Event } from '../event'
import { makeFactoryFor } from '../factory'

describe('factory tests', () => {
  it('should spawn a new kind of event', () => {
    const label = randomUUID()
    const event = makeFactoryFor(label)

    expect(event).to.have.property('is')
    expect(event.is({ label } as unknown as Event)).to.be.true
    expect(event.is({ label: '' } as unknown as Event)).to.be.false
    expect(event).to.have.property('label', label)
    expect(typeof event).to.equal('function')
  })

  it('should spawn a new kind of event with scope', () => {
    const label = randomUUID()
    const scope = randomUUID()
    const event = makeFactoryFor(label, { scope })

    expect(event.label).to.equal(`${scope}/${label}`)
  })

  it('should spawn a new kind of event with scope and custom divider', () => {
    const label = randomUUID()
    const scope = randomUUID()
    const event = makeFactoryFor(label, { divider: '#', scope })

    expect(event.label).to.equal(`${scope}#${label}`)
  })

  it('should spawn a new kind of event with alias', () => {
    const label = randomUUID()
    const alias = randomUUID()
    const event = makeFactoryFor(label, { aliases: alias })

    expect(event.label).to.equal(label)
    expect(event.is({ label: alias } as unknown as Event)).to.be.true
  })

  it('should spawn a new kind of event with aliases', () => {
    const label = randomUUID()
    const alias = randomUUID()
    const event = makeFactoryFor(label, { aliases: [alias] })

    expect(event.label).to.equal(label)
    expect(event.is({ label: alias } as unknown as Event)).to.be.true
  })

  it('should create events from factory', () => {
    const label = randomUUID()
    const factory = makeFactoryFor(label)

    const event1 = factory()
    const event2 = factory()

    expect(typeof event1.__id).to.equal('symbol')
    expect(event1.__same(event1)).to.be.true
    expect(event1.__same(event2)).to.be.false
  })
})
