import { useIcon } from '@micro-lc/iconic'
import type { Library } from '@micro-lc/iconic'
import type { ButtonProps as AntdButtonProps } from 'antd'
import { Button as AntdButton } from 'antd'
import React from 'react'

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

  // TODO remove check on iconId when iconic fix is released
  return (
    <AntdButton
      icon={
        <React.Suspense fallback={<svg viewBox={'0 0 0 0'}/>}>
          {iconId ? <Icon /> : undefined}
        </React.Suspense>
      }
      {...buttonStyle}
      {...rest}
    >
      {content}
    </AntdButton>
  )
}
