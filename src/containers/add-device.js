import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'
import {browserHistory} from 'react-router'

import {
  Spinner,
  ErrorState,
  EmptyState,
  Page,
  PageHeader,
  PageTitle,
  Card,
  ProgressBar
} from 'zooid-ui'

export default class AddDevice extends Component {
  state = {
    loading: true,
    gateblu: null,
    connector: null,
    error: null,
    adding: false,
    progress: 0,
    stateMessage: "Installing Connector"
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.numberOfTries = 0
    const {uuid, type} = this.props.params
    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      this.setState({error, gateblu})
      getConnector(type, (error, connector) =>{
        this.setState({error, connector, loading: false})
      })
    })
  }

  getDeviceUntilOptions = (uuid, callback) => {
    this.numberOfTries++
    this.devicesService.getDevice(uuid, (error, device) => {
      if(error) return callback(error)
      if(device.optionsSchema) return callback()
      if(this.numberOfTries > 60) return callback(new Error('Timeout Exceeded'))
      this.setProgressState(1)
      _.delay(this.getDeviceUntilOptions, 1000, uuid, callback)
    })
  }

  addNode = () => {
    const {gateblu, connector} = this.state
    const gatebluUuid = gateblu.uuid
    const {type, name} = connector
    const connectorName = connector.connector
    const userUuid = getMeshbluConfig().uuid

    const deviceProperties = this.devicesService.getNewDeviceProperties({gatebluUuid, userUuid, type, name, connectorName})

    this.setProgressState(10, 'Creating device')
    this.devicesService.register(deviceProperties, (error, device) => {
      if(error) return this.setState({error})
      this.setProgressState(20, 'Adding device to Gateblu')
      this.devicesService.addDeviceToDevicesSet(gatebluUuid, device.uuid, (error) => {
        if(error) return this.setState({error})
        this.setProgressState(20, 'Waiting for device to boot')
        this.getDeviceUntilOptions(device.uuid, (error) => {
          if(error) return this.setState({error})
          browserHistory.push(`/device/${device.uuid}`)
        })
      })
    })
  }

  setProgressState = (progress, message) => {
    if(!message) message = this.state.stateMessage
    progress = this.state.progress + progress
    this.setState({stateMessage: message, progress: progress, adding: true})
  }

  render() {
    const { loading, adding, stateMessage, gateblu, error, connector, progress } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblu)) return <ErrorState title="Missing Gateblu" />
    if (_.isEmpty(connector)) return <ErrorState title="Missing Connector" />
    if (!adding) return <EmptyState title={`Install ${connector.name}`}  cta="Install Connector" action={this.addNode} />

    const {name} = gateblu

    return <Page>
      <PageHeader>
        <PageTitle>Installing Device</PageTitle>
      </PageHeader>
      <Card>
        <h3>{stateMessage}</h3>
        <br/>
        <ProgressBar completed={progress}/>
      </Card>
    </Page>
  }
}
