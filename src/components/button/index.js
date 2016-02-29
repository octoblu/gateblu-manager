
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import './index.css'
import Spinner from '../spinner'

class Button extends Component {
  constructor() {
    super()
  }

  renderChildren(children) {
    const {loading, loadingLabel} = this.props
    if (loading) {
      if (!loadingLabel) return <Spinner size="small"/>
      return loadingLabel
    }
    return children
  }

  render() {
    const {
      children,
      className,
      disabled,
      href,
      kind,
      draggable,
      loading,
      onClick,
      size,
      type
    } = this.props


    const componentClass = classNames(
      'Button',
      `Button--${kind}`,
      `Button--${size}`,
      {'Button--loading': loading},
      {'Button--disabled': disabled},
      className
    )

    let tag = 'button'
    if (href) tag = 'a'

    const childrenNode = this.renderChildren(children)

    const properties = {
      className: componentClass,
      onClick,
      disabled: disabled,
      type,
      href,
      draggable
    }

    return React.createElement(tag, properties, childrenNode)
  }
}

const BUTTON_SIZES = ['regular', 'large', 'small']
const BUTTON_KINDS = [
  'primary',
  'approve',
  'danger',
  'neutral',
  'hollow-primary',
  'hollow-approve',
  'hollow-danger',
  'hollow-neutral',
  'jumbo',
  'no-style'
]

Button.defaultProps = {
  disabled: false,
  kind: BUTTON_KINDS[0],
  loading: false,
  size: BUTTON_SIZES[0]
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  kind: PropTypes.oneOf(BUTTON_KINDS),
  loading: PropTypes.bool,
  loadingLabel: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  type: PropTypes.string,
  draggable: PropTypes.string
}

export default Button
