import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'

import {browserHistory} from 'react-router'
import Loading from '../components/loading'
import ErrorMsg from '../components/error'
import {Button} from 'zooid-ui'

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
    const {uuid} = this.props.params
    const {name} = this.state.gateblu
    this.setState({loading: true})
    const userUuid = getMeshbluConfig().uuid
    const properties = {
      name: name || 'My Gateblu',
      type: 'device:gateblu',
      devices: [],
      discoverWhitelist: [userUuid],
      configureWhitelist: [userUuid],
      sendWhitelist: [userUuid],
      receiveWhitelist: [userUuid],
      owner: userUuid,
      gateblu: {
        running: true
      }
    }
    this.devicesService.update(uuid, properties, (error) => {
      this.setState({error, loading: false})
      browserHistory.push(`/gateblu/${uuid}`)
    })
  }

  render() {
    const { loading, gateblu, error } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    return <div>
      <Button onClick={this.claimGateblu}>Claim Gateblu</Button>
    </div>
  }
}
