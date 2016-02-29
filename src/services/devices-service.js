import {getMeshbluConfig} from './auth-service'

export function getGateblus(callback){
  let meshbluConfig = getMeshbluConfig()
  let meshbluHttp = new MeshbluHttp(meshbluConfig)
  let query = {
    type: 'device:gateblu',
    owner: meshbluConfig.uuid
  }
  meshbluHttp.devices(query, callback)
}
