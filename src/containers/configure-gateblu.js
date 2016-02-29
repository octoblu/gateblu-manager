import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {getDevice} from '../services/devices-service'
import {getAvailableConnectors} from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    gatebluError: null,
    connectorError: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid} = this.props.params
    getDevice(uuid, (gatebluError, gateblu) => {
      this.setState({gatebluError, gateblu, loading: false})
    })
    getAvailableConnectors((connectorError, connectors)=>{
      this.setState({connectorError, connectors})
    })
  }

  render() {
    const { loading, gateblu, gatebluError, connectorError, connectors } = this.state

    if (loading) return <Loading message="Loading Gateblu..."/>
    if (gatebluError) return <ErrorMsg errorMessage={gatebluError.message} />
    if (connectorError) return <ErrorMsg errorMessage={connectorError.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const {name} = gateblu

    let connectorItems = _.map(connectors, (connector) => {
      return <li>{connector.name} ({connector.type})</li>
    })

    return <div>
      <h2>{name} : Gateblu</h2>
      <h3>Available Connectors</h3>
      <ul>
        {connectorItems}
      </ul>
    </div>
  }
}
