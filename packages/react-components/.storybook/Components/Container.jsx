import React from 'react'

import ErrorBoundary from './ErrorBoundary'

const Container = ({story}) => {
  return (
    <ErrorBoundary>
      {story()}
    </ErrorBoundary>
  )
}

export default Container
