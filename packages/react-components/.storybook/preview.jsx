// import {Anchor, DocsContainer} from '@storybook/addon-docs/blocks'
import React from 'react'

import {Container} from './Components'

import './preview.less'

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  storyshots: false,
  // docs: {
  //   container: ({children, context}) => (
  //     // <DocsContainer context={context}>
  //       <Anchor storyId={context.id} />
  //       {children}
  //     // </DocsContainer>
  //   )
  // }
}

export const decorators = [story => <Container story={story} />]
