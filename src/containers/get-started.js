import _ from 'lodash'
import {browserHistory} from 'react-router'
import React, { Component, PropTypes } from 'react'
import { Page, PageHeader, PageTitle, List } from 'zooid-ui'

import {Button, Card} from 'zooid-ui'

const MAC_OS_X_DOWNLOAD_LINK='https://s3-us-west-2.amazonaws.com/gateblu/node-gateblu-service/latest/GatebluService.dmg'

export default class GetStarted extends Component {
  componentDidMount() {

  }

  manageGateblus = () => {
    browserHistory.push('/')
  }

  render() {
    return <Page>
      <PageHeader>
        <PageTitle>Get Started</PageTitle>
      </PageHeader>
      <Card>
        <h1>Welcome to Gateblu 3.0</h1>
        <br/>
        <p>Gateblu 3.0 is simplier, faster and easier to manage.</p>
      </Card>
      <br/>
      <Card>
        <h3>Download & Install Gateblu</h3>
        <br/>
        <p>Install Gateblu on your computer or device. The service will run in the background.</p>
        <br/>
        <Button kind="primary" href={MAC_OS_X_DOWNLOAD_LINK}>Download (Mac OS X)</Button>
      </Card>
      <br/>
      <Card>
        <h3>Manage Gateblu</h3>
        <br/>
        <p>Manage all of your Gateblus here, at gateblu.octoblu.com</p>
        <br/>
        <Button kind="primary" onClick={this.manageGateblus}>Manage Your Gateblus</Button>
      </Card>
    </Page>
  }
}
