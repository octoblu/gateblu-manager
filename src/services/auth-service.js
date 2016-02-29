import _ from 'lodash'

import cookie from 'react-cookie'
import {CLIENT_ID, PROVIDER_URI} from '../constants/oauth';

function getMeshbluConfigFromBearerToken(bearerToken){
  const bearerTokenEnvelope = atob(bearerToken)
  const bearerTokenPieces = bearerTokenEnvelope.split(':')
  return {
    uuid: bearerTokenPieces[1],
    token: bearerTokenPieces[2],
    server: 'meshblu.octoblu.com',
    port: 443
  }
}

export function fetchOctobluUser(callback) {
  let bearerToken  = cookie.load('meshbluBearerToken')

  if(!bearerToken){
    return callback(null, null)
  }

  let meshbluConfig = getMeshbluConfigFromBearerToken(bearerToken)
  let meshbluHttp = new MeshbluHttp(meshbluConfig)
  meshbluHttp.whoami(callback)
}

export function storeAuthentication(nextState, replace) {
  const bearerToken = decodeURIComponent(nextState.location.query.code)
  console.log('bearerToken', bearerToken, nextState.location.query.redirect_uri)
  const redirectUri = nextState.location.query.redirect_uri
  cookie.save('meshbluBearerToken', bearerToken, {path: '/'})
  replace(redirectUri)
}
