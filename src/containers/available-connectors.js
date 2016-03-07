import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

import { Breadcrumb, Button } from 'zooid-ui'
import { Page, PageHeader, PageTitle } from 'zooid-ui'

import InstalledDevices from '../components/installed-devices'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    connectors: null,
    error: null,
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
        this.setState({error, gateblu, connectors})
      });
    })
  }

  render() {
    const { loading, gateblu, error, connectors } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const breadcumbFragments = [
      { component: <Link to="/">Gateblus</Link> },
      { component: <Link to={`/gateblu/${gateblu.uuid}`}>{gateblu.name}</Link> },
      { label: 'Available Connectors' }
    ]

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <Connectors connectors={connectors}></Connectors>
    </Page>
  }
}
