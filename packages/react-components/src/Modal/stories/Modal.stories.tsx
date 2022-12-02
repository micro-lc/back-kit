import type { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'

import type { ModalProps } from '../Modal'
import Modal from '../Modal'

export default {
  component: Modal,
  title: 'Back-Kit/Modal',
} as Meta

const modalContent = () =>
  <div style={{ backgroundColor: '#faebd7', height: '300px', padding: '10px', width: '100%' }}>
    {'I\'m the content'}
  </div>

const AllScreenTemplate: Story<ModalProps> = (args) => {
  const ref = useRef<HTMLDivElement>()
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <div ref={(innerRef) => { if (innerRef) { ref.current = innerRef } }}></div>
      <Modal
        getContainer={() => ref.current as HTMLDivElement}
        onCancel={() => setOpen(false)}
        open={open}
        {...args}
      >{modalContent()}</Modal>
    </>
  )
}

export const Mo = AllScreenTemplate.bind({})
Mo.storyName = 'With icon and content'
Mo.args = {
  mask: true,
  title: 'Title of the modal',
  titleIcon: 'MessageOutlined',
  width: '400px',
}
