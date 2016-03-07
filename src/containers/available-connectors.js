import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import {
  Breadcrumb,
  Button,
  Spinner,
  ErrorState,
  Page,
  PageHeader,
  PageTitle
} from 'zooid-ui'

import Connectors from '../components/connectors'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    connectors: null,
    error: null,
  }

  componentDidMount() {
    const {uuid} = this.props.params
    this.setState({ loading: true })

    this.devicesService = new DevicesService()
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      if(error) return this.setState({error, gateblu, loading: false})

      getAvailableConnectors((error, connectors)=>{
        this.setState({error, gateblu, connectors, loading: false})
      });
    })
  }

  render() {
    const { loading, gateblu, error, connectors } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblu)) return <ErrorState title="Missing Gateblu" />

    const breadcumbFragments = [
      { component: <Link to="/">My Gateblus</Link> },
      { component: <Link to={`/gateblu/${gateblu.uuid}`}>{gateblu.name}</Link> },
      { label: 'Available Connectors' }
    ]

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <PageHeader>
        <PageTitle>Available Connectors</PageTitle>
      </PageHeader>
      <Connectors connectors={connectors} gatebluUuid={gateblu.uuid}></Connectors>
    </Page>
  }
}
