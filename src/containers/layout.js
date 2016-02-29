import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import '../styles/handglide/fonts.css'
import '../styles/base.css'

import AppBar from '../components/zooids/app-bar'
import { OCTOBLU_URL } from '../constants'

export default class Layout extends Component {
  render() {
    let appBar = <AppBar octobluUrl={ OCTOBLU_URL }/>

    return <div>
      { appBar }
      { this.props.children }
    </div>
  }
}

function mapStateToProps({ }) {
  return { }
}

export default connect(mapStateToProps)(Layout)
