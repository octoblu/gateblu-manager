import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import {Spinner, ErrorState} from 'zooid-ui'
import { Breadcrumb, Button, Icon } from 'zooid-ui'
import { Page, PageHeader, PageTitle, Nav } from 'zooid-ui'

import DeviceEditor from '../components/device-editor'
import InstalledDevices from '../components/installed-devices'

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

  render() {
    const { loading, gateblu, error, devices } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(gateblu)) return <ErrorState title="Missing Gateblu"></ErrorState>

    const breadcumbFragments = [
      { component: <Link to="/">Gateblus</Link> },
      { label: gateblu.name }
    ]

    let playButtonType = 'hollow-approve'
    let stopButtonType = 'hollow-danger'
    if(gateblu.gateblu) {
      if(gateblu.gateblu.running){
        playButtonType = 'approve'
      }else{
        stopButtonType = 'danger'
      }
    }

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <div className="ConfigureGateblu--actions">
        <Button className="ConfigureGateblu--action" kind={stopButtonType} onClick={this.stopGateblu}><Icon name="MdStop"/></Button>
        <Button className="ConfigureGateblu--action" kind={playButtonType} onClick={this.startGateblu}><Icon name="MdPlayArrow"/></Button>
        <Button className="ConfigureGateblu--action" kind="primary" onClick={this.availableDevices}><Icon name="MdAdd"/> Add</Button>
      </div>
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
