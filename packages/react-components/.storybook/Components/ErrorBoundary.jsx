import React, {Component, Fragment} from 'react'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: '',
  }

  componentDidCatch(error, errorInfo) {
    console.error(error)
    this.setState({hasError: true, errorInfo})
  }

  render() {
    const {hasError, errorInfo} = this.state
    const {children} = this.props

    return hasError ? <Fragment>{`Error: ${JSON.stringify(errorInfo)}`}</Fragment> : children
  }
}
