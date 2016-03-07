import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import {browserHistory} from 'react-router'

import DevicesService from '../services/devices-service'
import { getMeshbluConfig } from '../services/auth-service'

import {
  Spinner,
  ErrorState,
  EmptyState,
  Page,
  PageHeader,
  PageTitle
} from 'zooid-ui'

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

  getStarted = () => {
    browserHistory.push('/get-started')
  }

  render() {
    const { loading, gateblus, error } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblus)) return <EmptyState title="No Gateblus" cta="Get Started" action={this.getStarted}/>


    return <Page>
      <PageHeader>
        <PageTitle>My Gateblus</PageTitle>
      </PageHeader>
      <GatebluList devices={gateblus}></GatebluList>
    </Page>
  }
}
