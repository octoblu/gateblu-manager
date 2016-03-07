import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import ListGateblus from './containers/list-gateblus'
import ConfigureGateblu from './containers/configure-gateblu'
import AvailableConnectors from './containers/available-connectors'
import ClaimGateblu from './containers/claim-gateblu'
import ConfigureDevice from './containers/configure-device'
import AddDevice from './containers/add-device'
import GetStarted from './containers/get-started'
import {storeAuthentication} from './services/auth-service'

render((
  <Router history={browserHistory}>
    <Route path="/authenticated" onEnter={storeAuthentication}/>
    <Route path="/" component={Layout}>
      <IndexRoute component={ListGateblus}/>
      <Route path="/get-started" component={GetStarted}/>
      <Route path="/gateblu/:uuid" component={ConfigureGateblu}/>
      <Route path="/gateblu/:uuid/add" component={AvailableConnectors}/>
      <Route path="/gateblu/:uuid/add/:type" component={AddDevice}/>
      <Route path="/gateblu/:uuid/claim" component={ClaimGateblu}/>
      <Route path="/gateblu/:gatebluUuid/devices/:uuid" component={ConfigureDevice}/>
    </Route>
  </Router>
), document.getElementById('app'))
