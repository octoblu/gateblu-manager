import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'
import {browserHistory} from 'react-router'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

export default class AddDevice extends Component {
  state = {
    loading: true,
    gateblu: null,
    connector: null,
    error: null,
    done: false,
    adding: false,
    stateMessage: "Installing Connector"
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid, type} = this.props.params
    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      this.setState({error, gateblu})
      getConnector(type, (error, connector) =>{
        this.setState({error, connector, loading: false})
        const {done, adding} = this.state
        if(!done && !adding) {
          this.addNode()
        }
      })
    })
  }

  addNode() {
    const {gateblu, connector} = this.state

    const gatebluUuid = gateblu.uuid
    const {type, name, logo} = connector
    const connectorName = connector.connector
    const userUuid = getMeshbluConfig().uuid
    const deviceProperties = {
      name: name,
      type: type,
      category: 'device',
      gateblu: {
        uuid: gateblu.uuid,
        connector: connectorName,
        initializing: true,
        running: true
      },
      sendWhitelist: [],
      receiveWhitelist: [],
      configureAsWhitelist: [],
      discoverAsWhitelist: [],
      configureWhitelist: [gatebluUuid, userUuid],
      discoverWhitelist: [gatebluUuid, userUuid],
      sendAsWhitelist: [gatebluUuid],
      receiveAsWhitelist: [gatebluUuid],
      owner: userUuid
    }
    this.setState({adding: true, stateMessage: 'Registering Device'})
    this.devicesService.register(deviceProperties, (error, device) => {
      this.setState({stateMessage: 'Adding Device to Gateblu'})
      this.devicesService.addDeviceToDevicesSet(gatebluUuid, device.uuid, (error) => {
        this.setState({adding: false, done: true, stateMessage: 'Completed'})
        browserHistory.push(`/device/${device.uuid}`)
      })
    })
  }

  render() {
    const { loading, done, adding, stateMessage, gateblu, error, connector } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>
    if (_.isEmpty(connector)) return <h3>Missing Connector</h3>

    const {name} = gateblu

    return <div>
      <h2>{name} : Gateblu</h2>
      <h3>Adding Connector</h3>
      <h1>State: {stateMessage}</h1>
    </div>
  }
}
