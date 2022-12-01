import type { FunctionComponent } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'

export interface LitCreatable<P = {children?: React.ReactNode}> {
  Component: FunctionComponent<P>
  container?: HTMLElement | null
  create?: () => P
  reactRoot?: ReactDOM.Root
  renderRoot: HTMLElement | ShadowRoot
}

export function unmount<P, T extends LitCreatable<P>>(this: T): void {
  this.reactRoot?.unmount()
  this.reactRoot = undefined
}

export function reactRender<P extends Record<string, unknown>, T extends LitCreatable<P>>(
  this: T,
  ...children: React.ReactNode[]
): P | undefined {
  const {
    Component, create, container: container_, renderRoot,
  } = this

  let container = renderRoot
  if (container_) {
    container = container_
  }

  const props = create?.call(this)
  this.reactRoot = this.reactRoot ?? ReactDOM.createRoot(container)
  if (props) {
    this.reactRoot.render(React.createElement(Component, { ...props }, ...children))
  }
  return props
}
