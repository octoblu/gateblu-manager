import React, { Component } from 'react'

import Authenticated from '../containers/authenticated.js'

export default class Layout extends Component {
  render() {
    return <Authenticated>
      <h1>Gateblu Manager</h1>
      {this.props.children}
    </Authenticated>
  }
}
