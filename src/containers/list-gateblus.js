import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Page, PageHeader, PageTitle, List } from 'zooid-ui'

import DevicesService from '../services/devices-service'
import { getMeshbluConfig } from '../services/auth-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import GatebluList from '../components/gateblu-list'

export default class ListGateblus extends Component {
  state = {
    loading: true,
    gateblus: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.devicesService = new DevicesService()
    const {uuid} = getMeshbluConfig()
    this.devicesService.getDevices({type:'device:gateblu', discoverWhitelist: {$in: [uuid]}}, (error, gateblus) => {
      this.setState({error, gateblus, loading: false})
    })
  }

  render() {
    const { loading, gateblus, error } = this.state

    if (loading) return <Loading message="Loading Gateblus..."/>
    if (error) return <ErrorMsg errorMessage={error} />
    if (_.isEmpty(gateblus)) return <h3>No Gateblus</h3>

    return <Page>
      <PageHeader>
        <PageTitle>My Gateblus</PageTitle>
      </PageHeader>
      <GatebluList devices={gateblus}></GatebluList>
    </Page>
  }
}
