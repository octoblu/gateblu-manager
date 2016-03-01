import {getMeshbluConfig} from './auth-service'

function getMeshbluHttp() {
  let meshbluConfig = getMeshbluConfig()
  return new MeshbluHttp(meshbluConfig)
}

export function getGateblus(callback){
  let meshbluHttp = getMeshbluHttp()
  let meshbluConfig = getMeshbluConfig()
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

export function register(body, callback){
  let meshbluHttp = getMeshbluHttp()
  meshbluHttp.register(body, callback)
}

export function addDeviceToDevicesSet(uuid, deviceUuid, callback){
  let meshbluHttp = getMeshbluHttp()
  let query = {$addToSet: {devices: deviceUuid}}
  meshbluHttp.updateDangerously(uuid, query, callback)
}

export function generateAndStoreToken(uuid, callback){
  let meshbluHttp = getMeshbluHttp()
  meshbluHttp.generateAndStoreToken(uuid, {tag: 'gateblu-manager'}, callback)
}
