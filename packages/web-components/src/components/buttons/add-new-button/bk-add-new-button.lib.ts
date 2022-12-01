import type { ButtonProps } from '@micro-lc/bk-react-components'

import { addNew } from '../../../events'

import type { BkAddNewButton } from './bk-add-new-button'

function handleButtonClick(this: BkAddNewButton) {
  this.eventBus?.next(addNew(this.initialValues))
}

export function createProps(this: BkAddNewButton): ButtonProps {
  return {
    content: 'Add New',
    disabled: this._loading || this.inObject || this.readonly,
    iconId: 'PlusOutlined',
    iconLibrary: '@ant-design/icons-svg',
    onClick: handleButtonClick.bind(this),
    shape: 'round',
    type: 'primary',
  }
}
