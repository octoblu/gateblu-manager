import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Page, PageHeader, PageTitle } from 'zooid-ui'

import DevicesService from '../services/devices-service'
import { getMeshbluConfig } from '../services/auth-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import GatebluItem from '../components/gateblu-item'

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
    this.devicesService.getDevices({type:'device:gateblu', owner: uuid}, (error, gateblus) => {
      this.setState({error, gateblus, loading: false})
    })
  }

  render() {
    const { loading, gateblus, error } = this.state

    if (loading) return <Loading message="Loading Gateblus..."/>
    if (error) return <ErrorMsg errorMessage={error} />
    if (_.isEmpty(gateblus)) return <h3>No Gateblus</h3>

    const gatebluItems = _.map(gateblus, (device) => {
      return <GatebluItem device={device}></GatebluItem>
    })

    return <Page>
      <PageHeader>
        <PageTitle>Gateblus</PageTitle>
      </PageHeader>
      {gatebluItems}
    </Page>
  }
}
