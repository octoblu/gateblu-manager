import {getMeshbluConfig} from './auth-service'

function getMeshbluHttp() {
  let meshbluConfig = getMeshbluConfig()
  return new MeshbluHttp(meshbluConfig)
}

export function getGateblus(callback){
  let meshbluHttp = getMeshbluHttp()
  let query = {
    type: 'device:gateblu',
    owner: meshbluConfig.uuid
  }
  meshbluHttp.devices(query, callback)
}

export function getDevice(uuid, callback){
  let meshbluHttp = getMeshbluHttp()
  meshbluHttp.device(uuid, callback)
}
