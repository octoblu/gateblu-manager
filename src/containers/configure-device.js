import _ from 'lodash'

import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import DevicesService from '../services/devices-service'
import {getMeshbluConfig} from '../services/auth-service'
import {getConnector} from '../services/connectors-service'
import {browserHistory} from 'react-router'

import DeviceEditor from '../components/device-editor'
import {Spinner,
  ErrorState,
  Button,
  Page,
  PageHeader,
  PageTitle,
  Icon,
  Breadcrumb
} from 'zooid-ui'

import '../styles/configure-device.css'

export default class ConfigureDevice extends Component {
  state = {
    loading: true,
    device: null,
    gateblu: null,
    error: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.devicesService = new DevicesService()
    const {gatebluUuid} = this.props.params
    this.devicesService.getDevice(gatebluUuid, (error, gateblu) => {
      this.setState({error, gateblu})
      this.getDevice()
    })
    this.onChange = _.debounce(this.onChangeNow, 1000, {leading: true})
  }

  getDevice = () => {
    const {uuid} = this.props.params
    this.devicesService.getDevice(uuid, (error, device) => {
      this.setState({error, device, loading: false})
    })
  }

  onChangeNow = (properties) => {
    let {device} = this.state
    const {uuid} = device
    this.setState({device:_.extend(device, properties)})
    this.devicesService.update(uuid, properties, (error) => {})
  }

  stopDevice = () => {
    const {uuid} = this.state.device
    this.devicesService.update(uuid, {'gateblu.running': false}, (error) => {
      this.getDevice()
    })
  }

  startDevice = () => {
    const {uuid} = this.state.device
    this.devicesService.update(uuid, {'gateblu.running': true}, (error) => {
      this.getDevice()
    })
  }

  render() {
    const { loading, device, error, connector, gateblu } = this.state

    if (loading) return <Spinner size="large"/>
    if (error) return <ErrorState title={error.message} />
    if (_.isEmpty(device)) return <ErrorState title="Missing Device"/>

    const breadcumbFragments = [
      { component: <Link to="/">My Gateblus</Link> },
      { component: <Link to={`/gateblu/${gateblu.uuid}`}>{gateblu.name}</Link> },
      { label: device.name }
    ]

    let playButtonType = 'hollow-approve'
    let stopButtonType = 'hollow-danger'
    if(device.gateblu) {
      if(device.gateblu.running){
        playButtonType = 'approve'
      }else{
        stopButtonType = 'danger'
      }
    }

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <PageHeader>
        <PageTitle>Configure Device</PageTitle>
      </PageHeader>
      <div className="ConfigureDevice--actions">
        <Button className="ConfigureDevice--action" kind={stopButtonType} onClick={this.stopDevice}><Icon name="MdStop"/></Button>
        <Button className="ConfigureDevice--action" kind={playButtonType} onClick={this.startDevice}><Icon name="MdPlayArrow"/></Button>
      </div>
      <DeviceEditor
        onChange={this.onChange}
        device={device}
      ></DeviceEditor>
    </Page>
  }
}
