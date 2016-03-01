import React, { Component } from 'react'
import url from 'url'
import Button from '../components/button'

import {CLIENT_ID, PROVIDER_URI} from '../constants/oauth'
import Loading from '../components/loading'
import ErrorMsg from '../components/error'

import {fetchOctobluUser} from '../services/auth-service'

export default class Authenticated extends Component {
  state = {
    octobluUser: null
  }

  componentDidMount() {
    if(process.env.NODE_ENV === 'production') {
      _.delay(() =>{
        window.location='https://gateblu.readme.io'
      }, 1000)
      return
    }
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
        response_type: 'code'
      }
    })

    window.location = uri
  }

  render() {
    const {octobluUser} = this.state
    const {children} = this.props
    if(process.env.NODE_ENV === 'production') {
      return <div>
        <h1>Redirecting to Gateblu Docs...</h1>
      </div>
    }
    if (!octobluUser) return <Loading message="Loading user..."/>
    return <div>{children}</div>
  }
}
