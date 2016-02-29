import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

export default class ListGateblus extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    // this.setState({ loading: true })
  }

  render() {
    const { loading } = this.state

    if (loading) return <div>Loading...</div>

    return <div>
      <h2>List Gateblus</h2>
    </div>
  }
}
