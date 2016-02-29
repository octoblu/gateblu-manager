import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import ListGateblus from './containers/list-gateblus'
import ConfigureGateblu from './containers/configure-gateblu'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={ListGateblus}/>
      <Route path="/gateblu/:uuid" component={ConfigureGateblu}/>
    </Route>
  </Router>
), document.getElementById('app'))
