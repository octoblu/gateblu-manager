import React, { Component } from 'react'
import {Link} from 'react-router'
import { TopBar, TopBarTitle, OctobluAppBar } from 'zooid-ui'

import Authenticated from '../containers/authenticated.js'

import 'zooid-ui/dist/style.css'
import '../styles/layout.css'

const OCTOBLU_URI='https://app.octoblu.com'

export default class Layout extends Component {
  render() {
    return <Authenticated>
      <OctobluAppBar octobluUrl={OCTOBLU_URI}></OctobluAppBar>
      <TopBar>
        <TopBarTitle>Gateblu Manager</TopBarTitle>
        <Link className="Layout--get-started" to="/get-started">Get Started</Link>
      </TopBar>
      {this.props.children}
    </Authenticated>
  }
}
