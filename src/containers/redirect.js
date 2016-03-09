import React, { Component } from 'react'

export default class Redirect extends Component {
  render() {
    window.location='https://gateblu.readme.io'
    return <div>
      <h1>Redirecting to docs...</h1>
    </div>
  }
}
