import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Breadcrumb from '../components/breadcrumb'
import TopBar from '../components/zooids/top-bar'
import { Page } from '../components/page'


export default class Gateblu extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { gateblu, dispatch } = this.props
  }

  componentWillUnmount() {
    let { dispatch } = this.props
    // dispatch(fetchBluprints())
  }

  render() {
    const { gateblu } = this.props

    const breadcrumbFragments = [
      { label: 'Gateblus', linkTo: '/' },
      { name: gateblu.name }
    ]

    return <Page>
      <TopBar>
        <Breadcrumb fragments={breadcrumbFragments} />
      </TopBar>
      <div className="Gateblu-container"></div>
    </Page>
  }
}

function mapStateToProps({router, gateblus }) {
  const { gatebluUuid } = router.params
  const gateblu = _.find(gateblus.items, {id: gatebluUuid})

  return {gateblu}
}

export default connect(mapStateToProps)(Gateblu)
