import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {getMeshbluConfig} from '../services/auth-service'
import DevicesService from '../services/devices-service'
import { getAvailableConnectors } from '../services/connectors-service'

import Loading from '../components/loading'
import ErrorMsg from '../components/error'

import { Breadcrumb, Button } from 'zooid-ui'
import { Page, PageHeader, PageTitle, Nav } from 'zooid-ui'

import ConfigureDevice from '../components/configure-device'
import InstalledDevices from '../components/Installed-devices'
import Connectors from '../components/connectors'

export default class ConfigureGateblu extends Component {
  state = {
    loading: true,
    gateblu: null,
    devices: null,
    connectors: null,
    error: null,
    tabSelected: 'Installed'
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.onChange = _.debounce(this.onChangeNow, 1000, {leading: true})
    this.devicesService = new DevicesService()
    this.getDevices()
  }

  getDevices = () => {
    const {uuid} = this.props.params
    this.devicesService.getDevice(uuid, (error, gateblu) => {
      if(error) return this.setState({error, gateblu, loading: false})

      getAvailableConnectors((error, connectors)=>{
        this.setState({error, connectors})
      });

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

  render() {
    const { loading, gateblu, error, connectors, devices, tabSelected } = this.state

    if (loading) return <Loading message="Loading..."/>
    if (error) return <ErrorMsg errorMessage={error.message} />
    if (_.isEmpty(gateblu)) return <h3>Missing Gateblu</h3>

    const breadcumbFragments = [
      { component: <Link to="/">Gateblus</Link> },
      { label: gateblu.name }
    ]

    let changeTab = (tabSelected) => {
      return () => {
        this.setState({tabSelected})
      }
    }

    let selectedTab
    if(tabSelected == 'Installed') {
      selectedTab = <InstalledDevices devices={devices}></InstalledDevices>
    }else if(tabSelected == 'Available'){
      selectedTab = <Connectors connectors={connectors}></Connectors>
    }

    let tabs = _.map(['Installed', 'Available'], (tab) => {
      let isSelected = ''
      if(tabSelected == tab) isSelected = 'Nav-item--active'
      const tabClasses = 'Nav-item ' + isSelected
      return <a className={tabClasses} onClick={changeTab(tab)}>{tab}</a>
    })

    return <Page>
      <Breadcrumb fragments={breadcumbFragments}></Breadcrumb>
      <ConfigureDevice
        onChange={this.onChange}
        device={gateblu}
      ></ConfigureDevice>
      <Nav>
        {tabs}
      </Nav>
      {selectedTab}
    </Page>
  }
}
