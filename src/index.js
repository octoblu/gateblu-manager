import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import ListGateblus from './containers/list-gateblus'
import ConfigureGateblu from './containers/configure-gateblu'
import ConfigureNode from './containers/configure-node'
import AddNode from './containers/add-node'
import {storeAuthentication} from './services/auth-service.js'

render((
  <Router history={browserHistory}>
    <Route path="/authenticated" onEnter={storeAuthentication}/>
    <Route path="/" component={Layout}>
      <IndexRoute component={ListGateblus}/>
      <Route path="/gateblu/:uuid" component={ConfigureGateblu}/>
      <Route path="/gateblu/:uuid/add/:type" component={AddNode}/>
      <Route path="/device/:uuid" component={ConfigureNode}/>
    </Route>
  </Router>
), document.getElementById('app'))
