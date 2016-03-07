import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import {Link} from 'react-router'
import {Icon, Button, Card, DeviceIcon} from 'zooid-ui'
import classNames from 'classnames';

const Connectors = ({ connectors, children, className }) => {
  const componentClass = classNames(
    'Connectors',
    className
  );

  let items = _.map(connectors, (connector) => {
    const {name, uuid, type} = connector

    return <Card className="Connector">
      <aside><DeviceIcon type={type} className="Connector-icon"></DeviceIcon></aside>
      <main className="Connector-main">
        <div className="Connector-body">
          <h3 className="Connector-name">{name}</h3>
        </div>
        <footer className="Connector-footer">
          <Link to={`/gateblu/${uuid}`} className="Connector-button">Add to Gateblu</Link>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

Connectors.propTypes = {
  className: PropTypes.string,
  connectors: PropTypes.array.isRequired
}

export default Connectors
