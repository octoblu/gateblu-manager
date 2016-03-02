import React, { Component } from 'react'
import { TopBar, TopBarTitle } from 'zooid-ui'

import Authenticated from '../containers/authenticated.js'

import 'zooid-ui/dist/style.css'

export default class Layout extends Component {
  render() {
    return <Authenticated>
      <TopBar>
        <TopBarTitle>Gateblu Manager</TopBarTitle>
      </TopBar>
      {this.props.children}
    </Authenticated>
  }
}
