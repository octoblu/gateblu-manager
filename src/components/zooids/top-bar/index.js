import React, { Component, PropTypes } from 'react'
import './index.css'

export default class TopBar extends Component {
  render() {
    const { children } = this.props
    return <header className="TopBar">
      {children}
    </header>
  }
}

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
}
