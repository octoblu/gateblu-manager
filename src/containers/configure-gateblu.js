import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

import { Breadcrumb, Button } from 'zooid-ui'
import { List, ListItem } from 'zooid-ui'
import { Page, PageHeader, PageTitle } from 'zooid-ui'

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
    const {uuid} = this.props.params
    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      if(error) return this.setState({error, gateblu, loading: false})

      getAvailableConnectors((error, connectors)=>{
        this.setState({error, connectors})
      });
      if(_.isEmpty(gateblu.devices)) return this.setState({gateblu, loading: false})
      this.devicesService.getDevices({uuid: {'$in': gateblu.devices}}, (error, devices) => {
        this.setState({error, devices, gateblu, loading: false})
      })
    })
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
