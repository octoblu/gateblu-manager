import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './index.css'

const CollectionCard = ({ collection }) => {
  return <Link to={`/collections/${collection.id}`} className="CollectionCard" key={collection.id}>
    <img src={collection.logo} alt={collection.label} className="CollectionCard-logo"/>
    <p className="CollectionCard-label">{collection.label}</p>
    <p className="CollectionCard-description">{collection.description}</p>
  </Link>
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired
}

export default CollectionCard
