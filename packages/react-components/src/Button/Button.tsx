import AntdIcon from '@ant-design/icons'
import { useIcon } from '@micro-lc/iconic'
import type { Library } from '@micro-lc/iconic'
import type { ButtonProps as AntdButtonProps } from 'antd'
import { Button as AntdButton } from 'antd'
import React from 'react'

import { ConfigProvider } from '../ConfigProvider'

export type ButtonProps = AntdButtonProps & {
  content?: string
  iconId?: string
  iconLibrary?: Library
}

export default function Button({
  content,
  iconId = '',
  iconLibrary = '@ant-design/icons-svg',
  type,
  ...rest
}: ButtonProps): JSX.Element {
  const buttonStyle = type === 'link' ? { style: { padding: 0 } } : {}
  const Icon = useIcon(iconId, iconLibrary)

  return (
    <ConfigProvider>
      <AntdButton
        icon={
          <React.Suspense fallback={<span />}>
            {iconId
              ? <AntdIcon>
                <Icon />
              </AntdIcon>
              : undefined
            }
          </React.Suspense>
        }
        {...buttonStyle}
        {...rest}
      >
        {content}
      </AntdButton>
    </ConfigProvider>
  )
}
