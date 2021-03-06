import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import {
  Spinner,
  ErrorState,
  Breadcrumb,
  Button,
  Icon,
  Page,
  PageHeader,
  PageTitle
} from 'zooid-ui'

import DeviceEditor from '../components/device-editor'
import InstalledDevices from '../components/installed-devices'
import DeviceActions from '../components/device-actions'

import '../styles/configure-gateblu.css'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    devices: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.onChange = _.debounce(this.onChangeNow, 1000, {leading: true})
    this.devicesService = new DevicesService()
    this.getDevices()
  }

  getGateblu = (callback) => {
    const {uuid} = this.props.params
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      if(error) return this.setState({error, gateblu, loading: false})
      this.setState({gateblu})
      if(callback) callback(null, gateblu)
    })
  }

  getDevices = () => {
    this.getGateblu((error, gateblu) => {
      if(_.isEmpty(gateblu.devices)) return this.setState({gateblu, loading: false})
      let uuids = gateblu.devices
      if(_.isPlainObject(_.first(uuids))) {
        uuids = _.map(gateblu.devices, 'uuid')
      }
      this.devicesService.getDevices({uuid: {'$in': uuids}}, (error, devices) => {
        this.setState({error, devices, gateblu, loading: false})
      })
    })
  }

  onChangeNow = (properties) => {
    let {gateblu} = this.state
    const {uuid} = gateblu
    this.setState({gateblu:_.extend(gateblu, properties)})
    this.devicesService.update(uuid, properties, (error) => {})
  }

  availableDevices = () => {
    const {uuid} = this.state.gateblu
    browserHistory.push(`/gateblu/${uuid}/add`)
  }

  stopGateblu = () => {
    const {uuid} = this.state.gateblu
    this.devicesService.update(uuid, {'gateblu.running': false}, (error) => {
      this.getGateblu()
    })
  }

  startGateblu = () => {
    const {uuid} = this.state.gateblu
    this.devicesService.update(uuid, {'gateblu.running': true}, (error) => {
      this.getGateblu()
    })
  }

  deleteGateblu = () => {
    const {uuid} = this.state.gateblu
    this.devicesService.unregister(uuid, (error) => {
      if(error) return this.setState({error})
      browserHistory.push('/')
    })
  }

  render() {
    const { loading, gateblu, error, devices } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblu)) return <ErrorState title="Missing Gateblu"></ErrorState>

    const breadcumbFragments = [
      { component: <Link to="/">My Gateblus</Link> },
      { label: gateblu.name }
    ]

    let buttons = <Button className="DeviceActions--action" kind="primary" onClick={this.availableDevices}><Icon name="MdAdd"/></Button>

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <PageHeader>
        <PageTitle>Configure Gateblu</PageTitle>
      </PageHeader>
      <DeviceActions
        buttons={buttons}
        device={gateblu}
        onDelete={this.deleteGateblu}
        onStart={this.startGateblu}
        onStop={this.stopGateblu}
        />
      <DeviceEditor
        onChange={this.onChange}
        device={gateblu}
      ></DeviceEditor>
      <InstalledDevices
        devices={devices}
        gatebluUuid={gateblu.uuid}
        ></InstalledDevices>
    </Page>
  }
}
