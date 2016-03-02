import _ from 'lodash'
import {getMeshbluConfig} from './auth-service'

function getMeshbluHttp() {
  let meshbluConfig = getMeshbluConfig()
  return new MeshbluHttp(meshbluConfig)
}

export default class DevicesService {
  constructor(meshbluConfig) {
    meshbluConfig = _.defaults(meshbluConfig, getMeshbluConfig())
    this.meshbluHttp = new MeshbluHttp(meshbluConfig)
  }
  getDevices(query, callback) {
    this.meshbluHttp.devices(query, callback)
  }
  getDevice(uuid, callback){
    this.meshbluHttp.device(uuid, callback)
  }
  register(properties, callback){
    this.meshbluHttp.register(properties, callback)
  }
  update(uuid, properties, callback){
    this.meshbluHttp.update(uuid, properties, callback)
  }
  addDeviceToDevicesSet(uuid, deviceUuid, callback){
    let query = {$addToSet: {devices: deviceUuid}}
    this.meshbluHttp.updateDangerously(uuid, query, callback)
  }
}
