import AntdIcon from '@ant-design/icons'
import type { Library } from '@micro-lc/iconic'
import { useIcon } from '@micro-lc/iconic'
import type { ModalProps as AntdModalProps } from 'antd'
import { Modal as AntdModal } from 'antd'
import React, { Suspense } from 'react'

import { ConfigProvider, prefixCls } from '../ConfigProvider'

export type ModalProps = AntdModalProps & {
  height?: string | number
  iconLibrary?: Library
  loading?: boolean
  subTitle?: string
  title?: string
  titleIcon?: string
}

function Modal({
  title,
  subTitle,
  titleIcon = '',
  iconLibrary = '@ant-design/icons-svg',
  height,
  children,
  ...rest
}: ModalProps): JSX.Element {
  const Icon = useIcon(titleIcon, iconLibrary)
  const Title = (
    <div className='modal-title'>
      {
        <Suspense fallback={<span></span>}>
          <AntdIcon>
            <Icon />
          </AntdIcon>
        </Suspense>
      }
      <div className='title-text'>{title}</div>
    </div>
  )

  return (
    <ConfigProvider>
      <div className={`${prefixCls}__modal`}>
        <AntdModal
          bodyStyle={{ height, overflowY: 'auto' }}
          closable={true}
          footer={<slot name='footer'></slot>}
          keyboard={true}
          maskClosable={true}
          title={Title}
          {...rest}
        >
          <div className='modal-subtitle'>
            {subTitle}
            <slot name='subtitle'></slot>
          </div>
          {children}
          <slot name='content'></slot>
        </AntdModal>
      </div>
    </ConfigProvider>
  )
}

export default Modal
