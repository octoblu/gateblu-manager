  import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'
import {browserHistory} from 'react-router'

import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'
import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import Button from 'zooid-ui'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    device: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid} = this.props.params
    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, device) => {
      if(error) return this.setState({error, loading: false})
      this.setState({error, device, loading: false})
    })
  }

  render() {
    const { loading, device, error, connector } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(device)) return <h3>Missing Device</h3>

    const {name, uuid} = device
    const meshbluConfig = getMeshbluConfig()

    return <div>
      <h2>{name} : Device</h2>
      <MeshbluDeviceEditor
        meshbluConfig={meshbluConfig}
        uuid={uuid}
      />
    </div>
  }
}
