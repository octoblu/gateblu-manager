import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../components/button'
import CollectionCard from '../components/collection-card'
import TopBar from '../components/zooids/top-bar'
import TopBarNav from '../components/zooids/top-bar-nav'
import { Page } from '../components/page'
import { Hero, HeroTitle, HeroSubTitle } from '../components/hero'

import { OCTOBLU_URL } from '../constants'

export default class Collections extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { dispatch } = this.props
  }

  render() {
    let { gateblus } = this.props
    let { items } = gateblus

    let gatebluCards = _.map(items, (gateblus) =>
      <CollectionCard
        gateblus={gateblus}
        key={gateblus.id}/>
    )

    let topBar = (
      <TopBar>
        <TopBarNav>
          <a className="TopBarNav-link" href={`${OCTOBLU_URL}/bluprints`}>My Bluprints</a>
          <a className="TopBarNav-link" href={`${OCTOBLU_URL}/discover`}>Discover Bluprints</a>
          <a className="TopBarNav-link TopBarNav-link--active" href="//gateblu.octoblu.com">Gateblu Manager</a>
        </TopBarNav>
      </TopBar>
    )

    return <Page className="Collections">
      {topBar}
      <div className="CollectionCard-container">{gatebluCards}</div>
    </Page>
  }
}

function mapStateToProps({gateblus}) {
  return {gateblus}
}

export default connect(mapStateToProps)(Collections)
