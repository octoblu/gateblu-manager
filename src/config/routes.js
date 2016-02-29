import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import { createHistory } from 'history'

import Gateblu from '../containers/gateblu'
import Gateblus from '../containers/gateblus'
import Layout from '../containers/layout'

const Routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Gateblus} />
      <Route path="/gateblu/:gatebluUuid" component={Gateblu} />
    </Route>
  </Router>
)

export default Routes
