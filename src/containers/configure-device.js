import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'
import {browserHistory} from 'react-router'

import DeviceEditor from '../components/device-editor'
import {Spinner, ErrorState, Button} from 'zooid-ui'

export default class ConfigureDevice extends Component {
  state = {
    loading: true,
    device: null,
    error: null
  }

  componentDidMount() {
    const {uuid} = this.props.params
    this.setState({ loading: true })
    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, device) => {
      this.setState({error, device, loading: false})
    })
    this.onChange = _.debounce(this.onChangeNow, 1000, {leading: true})
  }

  onChangeNow = (properties) => {
    let {device} = this.state
    const {uuid} = device
    this.setState({device:_.extend(device, properties)})
    this.devicesService.update(uuid, properties, (error) => {})
  }

  render() {
    const { loading, device, error, connector } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(device)) return <ErrorState title="Missing Device"/>

    const {name, uuid} = device
    const meshbluConfig = getMeshbluConfig()

    return <div>
      <h2>{name} : Device</h2>
      <DeviceEditor
        onChange={this.onChange}
        device={device}
      ></DeviceEditor>
    </div>
  }
}
