import _ from 'lodash'
import request from 'superagent'
import {getMeshbluConfig} from './auth-service'

const OCTOBLU_URL='https://api.octoblu.com'

export function getAvailableConnectors(callback){
  const {uuid, token} = getMeshbluConfig()
  request
    .get(`${OCTOBLU_URL}/api/node_types`)
    .auth(uuid, token)
    .end((error, response) => {
      if(!response.ok) return callback(new Error('Unable to fetch connectors'))
      if(_.isEmpty(response.body)) return callback()
      callback(null, _.filter(response.body, {category:'device'}))
    })
}

export function getConnector(type, callback){
  getAvailableConnectors((error, connectors) => {
    callback(error, _.find(connectors, {type}))
  })
}
