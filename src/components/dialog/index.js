import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import './index.css'

import Button from '../button'

class Dialog extends Component{
  constructor() {
    super()
  }

  state = { dismissed: false }

  dismissDialog = () => {
    this.setState({dismissed: true})
    this.props.onDismiss()
  }


  render() {
    let { children, className, title } = this.props
    let titleNode = null
    if (title) titleNode = <h1 className="Dialog-cardTitle">{title}</h1>

    const componentClass = classNames('Dialog', className)

    if (this.state.dismissed) return null

    return <div className={componentClass}>
      <div className="Dialog-card">
        {titleNode}

        <div className="Dialog-cardBody">
          {children}
        </div>

        <div className="Dialog-cardActions">
          <Button onClick={this.dismissDialog} kind="hollow-primary" size="small">Okay!</Button>
        </div>
      </div>
    </div>
  }
}

Dialog.defaultProps = {
  onDismiss: _.noop
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  title: PropTypes.string
}

export default Dialog
