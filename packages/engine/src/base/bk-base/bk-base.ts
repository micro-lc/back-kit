import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { Subscription, ReplaySubject } from 'rxjs'
import type { Observable } from 'rxjs'

import type { EventBus } from '../../events'

export type Listener = (eventBus: EventBus, kickoff: Observable<0>) => Subscription
export type Bootstrapper = (eventBus: EventBus) => void

function registerListeners<T extends BkBase>(
  this: T,
  eventBus: EventBus,
  subscription: Subscription,
  currentBusSubscriptions: Subscription[],
  context: Listener[],
  kickoff: Observable<0>
): void {
  if (!subscription.closed) {
    context.forEach((listener) => {
      const newSubscription = listener.call(this, eventBus, kickoff)
      currentBusSubscriptions.push(newSubscription)
      subscription.add(newSubscription)
    })
  }
}

function bootstrap<T extends BkBase>(
  this: T, eventBus: EventBus, context: Bootstrapper[]
): void {
  context.forEach((boot) => { boot.call(this, eventBus) })
}

/**
 * @superclass
 * @description BackOffice library base superclass for Lit-based webcomponents
 */
export class BkBase extends LitElement {
  /**
   * @description a window that might support sandboxed logic/methods
   */
  @property({ attribute: false }) proxyWindow = window

  /**
   * @deprecated
   * @description [micro-lc-element-composer](https://microlc.io/documentation/docs/micro-lc/core_plugins#microlc-element-composer)
   * default prop representing the authenticated user. It's context can be configured via micro-lc backend config files.
   * @see {@link https://microlc.io/documentation/docs/micro-lc/authentication}
   */
  @property({ attribute: false }) currentUser: Record<string, unknown> = {}

  /**
   * @description [micro-lc-element-composer](https://microlc.io/documentation/docs/micro-lc/core_plugins#microlc-element-composer)
   * default prop representing the `eventBus` default channel unless overridden by `busDiscriminator` prop.
   */
  @property({ attribute: false })
  get eventBus(): EventBus | undefined {
    return this._eventBus
  }

  /*
   * When an eventBus is set:
   * 1. check if there are subscriptions and if any pop them while removing the tead down logic
   * 2. if the eventBus is defined register all listeners with the subscription
   * 3. if the eventBus is defined then bootstrap
   * 4. set the eventBus
   */
  set eventBus(bus: EventBus | undefined) {
    const len = this._currentBusSubscriptions.length
    for (let i = 0; i < len; i++) {
      const tearDown = this._currentBusSubscriptions.pop() as Subscription
      this._subscription.remove(tearDown)
      tearDown.unsubscribe()
    }

    if (bus) {
      registerListeners.call(this, bus, this._subscription, this._currentBusSubscriptions, this._listeners, this._timeout$.asObservable())
      bootstrap.call(this, bus, this._bootstrap)
    }
    this._eventBus = bus
  }

  private _currentBusSubscriptions: Subscription[] = []

  private _eventBus?: EventBus

  private _listeners: Listener[]

  private _bootstrap: Bootstrapper[]

  private _subscription: Subscription = new Subscription()

  protected _timeout$ = new ReplaySubject<0>()

  protected get subscription() {
    return this._subscription
  }

  /*
   * When new subscription is set:
   * 1. unsubscribe all previous subscriptions
   * 2. clean the array of current subscription
   * 3. if an eventBus is present, register all listeners updating newly injected subscription and current subscription array
   * 4. set subscription
   */
  protected set subscription(subscription: Subscription) {
    this._subscription.unsubscribe()
    this._currentBusSubscriptions = []

    if (this._eventBus) {
      registerListeners.call(this, this._eventBus, subscription, this._currentBusSubscriptions, this._listeners, this._timeout$.asObservable())
    }

    this._subscription = subscription
  }

  constructor(
    listeners?: Listener | Listener[],
    boot?: Bootstrapper | Bootstrapper[]
  ) {
    super()

    if (listeners) {
      this._listeners = Array.isArray(listeners) ? listeners : [listeners]
    } else {
      this._listeners = []
    }

    if (boot) {
      this._bootstrap = Array.isArray(boot) ? boot : [boot]
    } else {
      this._bootstrap = []
    }
  }

  connectedCallback(): void {
    super.connectedCallback()

    if (this.subscription.closed) {
      this.subscription = new Subscription()
      this._currentBusSubscriptions = []
    }

    this._timeout$.next(0)
  }

  disconnectedCallback(): void {
    this._subscription.unsubscribe()
    this._currentBusSubscriptions = []
    this._timeout$ = new ReplaySubject()
    super.disconnectedCallback()
  }
}
