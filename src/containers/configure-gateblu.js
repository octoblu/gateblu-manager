import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

import { Breadcrumb, Button } from 'zooid-ui'
import { List, ListItem } from 'zooid-ui'
import { Page, PageHeader, PageTitle } from 'zooid-ui'

import ConfigureDevice from '../components/configure-device'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    devices: null,
    connectors: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.onChange = _.debounce(this.onChangeNow, 1000, {leading: true})
    this.devicesService = new DevicesService()
    this.getDevices()
  }

  getDevices = () => {
    const {uuid} = this.props.params
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      if(error) return this.setState({error, gateblu, loading: false})

      getAvailableConnectors((error, connectors)=>{
        this.setState({error, connectors})
      });

      if(_.isEmpty(gateblu.devices)) return this.setState({gateblu, loading: false})
      let uuids = gateblu.devices
      if(_.isPlainObject(_.first(uuids))) {
        uuids = _.map(gateblu.devices, 'uuid')
      }
      this.devicesService.getDevices({uuid: {'$in': uuids}}, (error, devices) => {
        this.setState({error, devices, gateblu, loading: false})
      })
    })
  }

  onChangeNow = (properties) => {
    let {gateblu} = this.state
    const {uuid} = gateblu
    this.setState({gateblu:_.extend(gateblu, properties)})
    this.devicesService.update(uuid, properties, (error) => {})
  }

  render() {
    const { loading, gateblu, error, connectors, devices } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const breadcumbFragments = [
      { component: <Link to="/">Gateblus</Link> },
      { label: gateblu.name }
    ]

    let connectorItems = _.map(connectors, (connector) => {
      const path = `/gateblu/${gateblu.uuid}/add/${connector.type}`

      return <ListItem>
        {connector.name} ({connector.type})
        <Button href={path} kind="approve" size="small">Add Node</Button>
      </ListItem>
    })

    let deviceItems = _.map(devices, (device) => {
      const path = `/device/${device.uuid}`
      let runningText = '[not running]'
      let deviceGateblu = device.gateblu || {}
      if(deviceGateblu.running) runningText = '[running]'

      return <ListItem>
        {device.name} ({deviceGateblu.connector})
        <Button href={path} kind="approve" size="small">Configure Node</Button>
      </ListItem>
    })

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <ConfigureDevice
        onChange={this.onChange}
        device={gateblu}
      ></ConfigureDevice>
      <h3>Installed Connectors</h3>
      <div>
        <List>{deviceItems}</List>
      </div>
      <h3>Available Connectors</h3>
      <div>
        <List>{connectorItems}</List>
      </div>
    </Page>
  }
}
