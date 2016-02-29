import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {getDevice, register, addDeviceToDevicesSet} from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import Button from '../components/button'

export default class ConfigureGateblu extends Component {
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
    getDevice(uuid, (error, gateblu) => {
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
    const connectorName = _.last(type.split(':'))
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
    console.log("deviceProperties", deviceProperties)
    this.setState({adding: true, stateMessage: 'Registering Device'})
    register(deviceProperties, (error, device) => {
      this.setState({stateMessage: 'Adding Device to Gateblu'})
      addDeviceToDevicesSet(gatebluUuid, device.uuid, (error) => {
        this.setState({adding: false, done: true, stateMessage: 'Completed'})
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
