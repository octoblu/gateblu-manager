import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {getDevice} from '../services/devices-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid} = this.props.params
    getDevice(uuid, (error, gateblu) => {
      console.log('response', error, gateblu)
      this.setState({error, gateblu, loading: false})
    })
  }

  render() {
    const { loading, gateblu, error } = this.state

    if (loading) return <Loading message="Loading Gateblu..."/>
    if (error) return <ErrorMsg errorMessage={error} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const {name} = gateblu

    return <div>
      <h2>{name} : Gateblu</h2>
    </div>
  }
}
