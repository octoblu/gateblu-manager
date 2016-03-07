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
      let connectors = _.filter(response.body, {category:'device'})
      connectors = _.filter(connectors, (connector) => {
        if(connector.connector) return true
        return false
      })
      callback(null, connectors)
    })
}

export function getConnector(type, callback){
  getAvailableConnectors((error, connectors) => {
    callback(error, _.find(connectors, {type}))
  })
}
