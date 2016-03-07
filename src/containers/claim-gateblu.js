import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'

import {browserHistory} from 'react-router'
import {
  Page,
  Spinner,
  ErrorState,
  EmptyState
} from 'zooid-ui'

export default class ClaimGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid} = this.props.params
    const {token} = this.props.location.query
    this.devicesService = new DevicesService({uuid,token})
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      this.setState({error, gateblu, loading: false})
    })
  }

  claimGateblu = () => {
    this.setState({loading: true})
    const {uuid} = this.props.params
    const {name} = this.state.gateblu
    const userUuid = getMeshbluConfig().uuid
    const properties = this.devicesService.getGatebluProperties({userUuid, name})
    this.devicesService.update(uuid, properties, (error) => {
      this.setState({error, loading: false})
      browserHistory.push(`/gateblu/${uuid}`)
    })
  }

  render() {
    const { loading, gateblu, error } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblu)) return <ErrorState title="Missing Gateblu" />

    return <Page>
      <EmptyState title='Claim Gateblu' description="Add this Gateblu to your account" cta="Claim" action={this.claimGateblu} />
    </Page>
  }
}
