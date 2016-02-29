import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {getDevice} from '../services/devices-service'
import {getAvailableConnectors} from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import Button from '../components/button'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    connectors: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    const {uuid} = this.props.params
    getDevice(uuid, (gatebluError, gateblu) => {
      this.setState({gatebluError, gateblu})
      getAvailableConnectors((connectorError, connectors)=>{
        this.setState({connectorError, connectors, loading: false})
      })
    })
  }

  render() {
    const { loading, gateblu, error, connectors } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const {name} = gateblu

    let connectorItems = _.map(connectors, (connector) => {
      let path = `/gateblu/${gateblu.uuid}/add/${connector.type}`
      return <li>{connector.name} ({connector.type}) <Button href={path} kind="approve">Add Node</Button></li>
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
