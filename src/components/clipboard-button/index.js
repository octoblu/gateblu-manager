import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import classNames from 'classnames'
import Clipboard from 'clipboard'

import './index.css'

import Button from '../button'

class ClipboardButton extends Component {
  static defaultProps = {
    onSuccess: _.noop(),
    onFailure: _.noop()
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    className: PropTypes.string
  }

  componentDidMount() {
    let { onSuccess, onFailure, text } = this.props
    let button = ReactDom.findDOMNode(this.refs.clipboardButton)

    this.clipboard = new Clipboard(button, { text: () => text })
    this.clipboard.on('success', onSuccess)
    this.clipboard.on('error', onFailure)
  }

  componentWillUnmount() {
    this.clipboard.destroy()
    delete this.clipboard
  }

  render() {
    const componentClass = classNames('ClipboardButton', this.props.className)
    return <Button ref="clipboardButton" className={this.componentClass}>
      <i className="zmdi zmdi-copy zmdi-hc-fw"/>
    </Button>
  }
}

export default ClipboardButton
