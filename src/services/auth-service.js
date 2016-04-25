import _ from 'lodash'

import cookie from 'react-cookie'
import {CLIENT_ID, PROVIDER_URI} from '../constants/oauth';

export function getMeshbluConfig(){
  let bearerToken  = cookie.load('meshbluBearerToken')
  const bearerTokenEnvelope = atob(bearerToken)
  const bearerTokenPieces = bearerTokenEnvelope.split(':')
  return {
    uuid: bearerTokenPieces[0],
    token: bearerTokenPieces[1],
    server: 'meshblu.octoblu.com',
    port: 443
  }
}

export function fetchOctobluUser(callback) {
  let bearerToken  = cookie.load('meshbluBearerToken')

  if(!bearerToken){
    return callback(null, null)
  }

  let meshbluConfig = getMeshbluConfig()
  let meshbluHttp = new MeshbluHttp(meshbluConfig)
  meshbluHttp.whoami(callback)
}

export function storeAuthentication(nextState, replace) {
  const bearerToken = decodeURIComponent(nextState.location.query.code)
  const redirectUri = nextState.location.query.redirect_uri
  cookie.save('meshbluBearerToken', bearerToken, {path: '/'})
  replace(redirectUri)
}
