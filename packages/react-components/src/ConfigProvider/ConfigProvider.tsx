import { ConfigProvider as AntdConfigProvider } from 'antd'
import type { ConfigProviderProps as AntdConfigProviderProps } from 'antd/lib/config-provider'
import type { PropsWithChildren } from 'react'
import React from 'react'

export type ConfigProviderProps = AntdConfigProviderProps

export const prefixCls = 'back-kit'

export default function ConfigProvider({ children, ...props }: PropsWithChildren<ConfigProviderProps>) {
  return (
    <AntdConfigProvider
      prefixCls={prefixCls}
      {...props}
    >{children}</AntdConfigProvider>
  )
}
