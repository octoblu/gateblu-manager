import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createHistory } from 'history'
import { reduxReactRouter, ReduxRouter } from 'redux-router';

import reducers from './reducers/'
import routes from './config/routes'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
)

const reduxRouterMiddleware = reduxReactRouter({
  routes,
  createHistory
})

const store = compose(
  createStoreWithMiddleware,
  reduxRouterMiddleware
)(createStore)(reducers)

render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  document.getElementById('app')
)
