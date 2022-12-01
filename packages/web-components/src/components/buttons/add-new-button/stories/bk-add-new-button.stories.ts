import type { Story } from '@storybook/web-components'
import { html } from 'lit'

import type { BkAddNewButton } from '../bk-add-new-button'

import '../bk-add-new-button'

export default {
  title: 'Buttons',
}

const Template = () => html`<bk-add-new-button>Hi</bk-add-new-button>`

export const AddNewButton = Template.bind({}) as unknown as Story<BkAddNewButton>
AddNewButton.storyName = 'add new button'
