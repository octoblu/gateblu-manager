import React, { Component } from 'react'
import { TopBar, TopBarTitle, OctobluAppBar } from 'zooid-ui'

import Authenticated from '../containers/authenticated.js'

import 'zooid-ui/dist/style.css'

const OCTOBLU_URI='https://app.octoblu.com'

export default class Layout extends Component {
  render() {
    return <Authenticated>
      <OctobluAppBar octobluUrl={OCTOBLU_URI}></OctobluAppBar>
      <TopBar>
        <TopBarTitle>Gateblu Manager</TopBarTitle>
      </TopBar>
      {this.props.children}
    </Authenticated>
  }
}
