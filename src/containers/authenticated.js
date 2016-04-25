import React, { Component } from 'react'
import url from 'url'
import {Button} from 'zooid-ui'

import {CLIENT_ID, PROVIDER_URI} from '../constants/oauth'
import {Spinner} from 'zooid-ui'

import {fetchOctobluUser} from '../services/auth-service'

export default class Authenticated extends Component {
  state = {
    octobluUser: null
  }

  componentDidMount() {
    fetchOctobluUser((error, octobluUser) => {
      if(error || !octobluUser) {
        return this.redirectToLogin()
      }
      this.setState({octobluUser})
    })
  }

  buildAuthenticateRedirectUri() {
    const {protocol,hostname,port} = window.location
    const pathname = '/authenticated'
    const query = {
      redirect_uri: this.buildRedirectUri()
    }

    return url.format({protocol,hostname,port,pathname,query})
  }

  buildRedirectUri() {
    const {pathname,query} = url.parse(window.location.href)

    return url.format({pathname,query})
  }

  redirectToLogin() {
    const {protocol,host,port} = url.parse(PROVIDER_URI)
    const uri = url.format({
      protocol: protocol,
      host: host,
      port: port,
      pathname: '/authorize',
      query: {
        client_id: CLIENT_ID,
        redirect_uri: this.buildAuthenticateRedirectUri(),
        response_type: 'token'
      }
    })

    window.location = uri
  }

  render() {
    const {octobluUser} = this.state
    const {children} = this.props
    if (!octobluUser) return <Spinner size="large"/>
    return <div>{children}</div>
  }
}
