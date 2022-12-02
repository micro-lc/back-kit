import { BkComponent } from '@micro-lc/back-kit-engine/base'
import type { ModalProps } from '@micro-lc/bk-react-components'
import { Modal } from '@micro-lc/bk-react-components'
import { html } from 'lit'
import {
  customElement, property, query, state,
} from 'lit/decorators.js'

import { cssResult } from '../../../style'

import type { LocalizedText } from './bk-modal.lib'
import { createProps } from './bk-modal.lib'


@customElement('bk-modal')
export class BkModal extends BkComponent<ModalProps> {
  static styles = cssResult

  @state() protected _visible?: boolean

  @property({ attribute: false }) onopen: (() => unknown) | null = null

  @property({ attribute: false }) oncancel: (() => unknown) | null = null

  @property({ type: Boolean })
  set visible(vis: boolean | undefined) {
    this._visible = vis
  }

  get visible(): boolean | undefined {
    return this._visible
  }

  /**
   * @description zIndex of the modal
   */
  @property({ attribute: 'z-index', state: true, type: Number }) zIndex?: number

  /**
   * @description root element to append the modal to
   */
  @property({ attribute: 'root-element-selector' }) rootElementSelector?: string

  /**
   * @description icon to place next to to the title
   */
  @property() titleIcon?: string

  /**
   * @description title of the modal
   */
  @property() modalTitle?: LocalizedText

  /**
   * @description sub-title of the modal
   */
  @property() subTitle?: LocalizedText

  /**
   * @description width of the modal
   */
  @property() width?: string | number

  /**
   * @description height of the modal
   */
  @property() height?: string | number

  constructor() {
    super(
      Modal,
      createProps
    )
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties)
    changedProperties.has('_visible') && this._visible && this.onopen?.call(this)
  }

  disconnectedCallback(): void {
    this.visible = false
    super.disconnectedCallback()
  }

  @query('#modal-container') container!: HTMLDivElement

  protected render(): unknown {
    return html`<div id="modal-container"></div>`
  }
}
