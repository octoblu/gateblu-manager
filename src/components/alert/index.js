import React, { PropTypes } from 'react'
import classNames from 'classnames'

import './index.css'

import Button from '../button'

const Alert = ({ children, className, type, dismissible }) => {
  const componentClass = classNames(
    'Alert',
    `Alert--${type}`,
    className
  )

  let dismissBtn = null
  if (dismissible) {
    dismissBtn = (
      <Button
        aria-hidden="true"
        className="Alert-dismissButton"
        kind="no-style">
      ×
      </Button>
    )
  }

  return <div className={componentClass}>
    {children}
    {dismissBtn}
  </div>
}

const ALERT_TYPES = [
  'neutral',
  'success',
  'failure'
]

Alert.defaultProps = {
  type: ALERT_TYPES[0],
  dismissible: false
}

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(ALERT_TYPES),
  dismissible: PropTypes.bool
}

export default Alert
