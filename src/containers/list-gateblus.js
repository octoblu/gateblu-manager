import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {getGateblus} from '../services/devices-service'

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
    getGateblus((error, gateblus) => {
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

    return <div>
      <h2>Gateblus</h2>
      {gatebluItems}
    </div>
  }
}
