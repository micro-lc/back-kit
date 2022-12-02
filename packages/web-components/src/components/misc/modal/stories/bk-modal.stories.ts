import type { Story } from '@storybook/web-components'
import { html } from 'lit'

import type { BkModal } from '../bk-modal'

import '../bk-modal'

export default {
  title: 'Modal',
}

const Template = (({ modalTitle, zIndex, visible }: BkModal) =>
  html`
    <button
      @click=${
        () => document
          .querySelector('bk-modal')?.setAttribute('visible', '')
      }>Open me!
    </button>
    <div style="position: absolute; z-index: 2; background-color: red; color: white">2</div>
    <bk-modal
      .visible=${visible}
      .titleIcon=${'MessageOutlined'}
      .modalTitle=${modalTitle}
      .zIndex=${zIndex}
    ></bk-modal>
  `) as unknown as Story<BkModal>

export const Modal = Template.bind({})
Modal.args = {
  modalTitle: 'Title of the modal',
}
Modal.storyName = 'Opened modal'

export const LowerIndexModal = Template.bind({})
LowerIndexModal.args = {
  modalTitle: 'Title of the modal',
  zIndex: 1,
}
LowerIndexModal.storyName = 'lower z-index modal'
