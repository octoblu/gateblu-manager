// @TODO: Implement dynamic nav-items like breadcrumbs

import React, { PropTypes } from 'react'
import classNames from 'classnames'

import './index.css'

const TopBarNav = ({children, className}) => {
  const componentClass = classNames(
    'TopBar-section',
    'TopBar-section--nav',
    'TopBarNav',
    className
  )

  return <nav className={componentClass}>
    {children}
  </nav>
}

TopBarNav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default TopBarNav
