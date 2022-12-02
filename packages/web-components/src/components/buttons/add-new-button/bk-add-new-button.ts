import { BkComponent } from '@micro-lc/back-kit-engine/base'
import { Button } from '@micro-lc/bk-react-components'
import type { ButtonProps } from '@micro-lc/bk-react-components'
import { html } from 'lit'
import {
  customElement, property, query, state,
} from 'lit/decorators.js'

import type { AddNewPayload } from '../../../events'
import { cssResult } from '../../../style'

import { createProps } from './bk-add-new-button.lib'

@customElement('bk-add-new-button')
export class BkAddNewButton extends BkComponent<ButtonProps> {
  static styles = cssResult

  @state() _loading = false
  @state() inObject = false
  @state() readonly = false

  // /**
  //  * @description when provided with a valid schema, overrides the button JavaScript `onclick` listener handler allowing an `href` linking
  //  * @typeDescription `LinkQueryParams` is a key-value object containing query parameters
  //  */
  // @property({ attribute: false }) browseOnButtonClick: ClickPayload = {}

  /**
   * @description arguments to pass upon click
   */
  @property({ attribute: false }) initialValues: AddNewPayload | undefined

  constructor() {
    super(
      Button,
      createProps
    )
  }

  @query('#back-kit-container') container!: HTMLDivElement

  protected render(): unknown {
    return html`<div id="back-kit-container"></div>`
  }
}
