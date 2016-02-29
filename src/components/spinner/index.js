import './index.css'
import classNames from 'classnames'
import React, { PropTypes } from 'react'

const Spinner = ({ className, size, type }) => {
  const componentClass = classNames(
    'Spinner',
    `Spinner--${size}`,
    `Spinner--${type}`,
    className
  )

  return <div className={componentClass}>
    <div className="Spinner-dot Spinner-dot--first"></div>
    <div className="Spinner-dot Spinner-dot--second"></div>
    <div className="Spinner-dot Spinner-dot--third"></div>
  </div>
}
const SPINNER_SIZES = ['regular', 'large', 'small']
const SPINNER_TYPES = ['neutral ', 'primary', 'inverted']

Spinner.defaultProps = {
  size: SPINNER_SIZES[0],
  type: SPINNER_TYPES[0]
}

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string
}

export default Spinner
