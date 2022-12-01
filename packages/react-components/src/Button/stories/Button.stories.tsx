import type { Meta, Story } from '@storybook/react'
import React from 'react'

import type { ButtonProps } from '../Button'
import Button from '../Button'

export default {
  component: Button,
  title: 'Back-Kit/Buttons/Button',
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} />

export const ButtonWithNoIcon = Template.bind({})
ButtonWithNoIcon.storyName = 'ButtonWithNoIcon'
ButtonWithNoIcon.args = { content: 'Content' }


export const ButtonWithFasIcon = Template.bind({})
ButtonWithFasIcon.storyName = 'ButtonWithFasIcon'
ButtonWithFasIcon.args = { content: 'Content', iconId: 'faHouse', iconLibrary: '@fortawesome/free-solid-svg-icons' }

export const ButtonWithFarIcon = Template.bind({})
ButtonWithFarIcon.storyName = 'ButtonWithFarIcon'
ButtonWithFarIcon.args = { content: 'Content', iconId: 'faCopy', iconLibrary: '@fortawesome/free-regular-svg-icons' }

export const ButtonWithAntIcon = Template.bind({})
ButtonWithAntIcon.storyName = 'ButtonWithAntIcon'
ButtonWithAntIcon.args = { content: 'Content', iconId: 'DownloadOutlined', iconLibrary: '@ant-design/icons-svg' }
