import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

export default class ConfigureGateblu extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })
  }

  render() {
    const { loading } = this.state

    if (loading) return <div>Loading...</div>

    return <div>
      <h2>Gateblu</h2>
    </div>
  }
}
