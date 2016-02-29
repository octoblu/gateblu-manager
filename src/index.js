import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import ListGateblus from './containers/list-gateblus'
import ConfigureGateblu from './containers/configure-gateblu'
import {storeAuthentication} from './services/auth-service.js'

if(process.env.NODE_ENV === 'production') {
  window.location='https://gateblu.readme.io'
}

render((
  <Router history={browserHistory}>
    <Route path="/authenticated" onEnter={storeAuthentication}/>
    <Route path="/" component={Layout}>
      <IndexRoute component={ListGateblus}/>
      <Route path="/gateblu/:uuid" component={ConfigureGateblu}/>
    </Route>
  </Router>
), document.getElementById('app'))
